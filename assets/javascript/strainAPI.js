//<script src="https://www.gstatic.com/firebasejs/6.0.2/firebase-app.js"></script>
//<script src="https://www.gstatic.com/firebasejs/6.0.2/firebase-database.js"></script>
//<script src="assets/javascript/strainAPI.js"></script>
$(document).ready(function(){
    // Your web app's Firebase configuration
    var config = {
        apiKey: "AIzaSyBxnk9J_qG6F1oFANgqZ9DOB5QIQKpaDJE",
        authDomain: "project1-dcb00.firebaseapp.com",
        databaseURL: "https://project1-dcb00.firebaseio.com",
        projectId: "project1-dcb00",
        storageBucket: "project1-dcb00.appspot.com",
        messagingSenderId: "929934289487",
        appId: "1:929934289487:web:05e9caf4560b0be2"
    };
    // Initialize Firebase
    firebase.initializeApp(config);
    var database = firebase.database();

    var test = {
        test: "test"
    };
    
    database.ref().push(test);

    var apiKey = "CHAdUYO"
    
    var nameArr = [];
    var flavorNameArr = [];
    var idArr = [];


    $("#submit").on('click', function(){
        var strain = $(".typeStrains").val().trim();
        var effect = $(".typeEffects").val().trim();
        var flavor = $(".typeFlavor").val().trim();

        $.ajax({
            url: "http://strainapi.evanbusse.com/" + apiKey + "/strains/search/effect/" + effect,
            method: 'GET'
        }).then(function(response){
            for(var i = 0; i < response.length; i++){
                if(response[i].race === strain.toLowerCase()){
                    nameArr.push(response[i].name);
                    idArr.push(response[i].id);
                }
            }
            $.ajax({
                url: "http://strainapi.evanbusse.com/" + apiKey + "/strains/search/flavor/" + flavor,
                method:'GET'
            }).then(function(response){
                for(var i = 0; i < response.length; i++){
                    flavorNameArr.push(response[i].name);
                }
                getMatches(flavor);
            });
        });     
    });

    function getMatches(flavor){
        $.ajax({
            url: "http://strainapi.evanbusse.com/" + apiKey + "/strains/search/all",
            method: 'GET'
        }).then(function(response){
            for(var i = 0; i < flavorNameArr.length; i++){
                if(nameArr.indexOf(flavorNameArr[i]) !== -1){
                    //console.log(flavorNameArr[i]);
                    console.log(response[flavorNameArr[i]]);
                }
            }
        });  
    }
});
