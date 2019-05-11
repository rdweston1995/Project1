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
    
    var positive = [];
    var negative = [];
    var medical = [];
    var flavors = [];

    var strainArr = [];
    var flavorArr = [];
    var effectArr = [];
    var nameArr = [];
    var idArr = [];
    var matchesIdArr = [];
    var matchesNameArr = [];
    
    $.ajax({
        url: "http://strainapi.evanbusse.com/" + apiKey + "/searchdata/effects",
        method: 'GET'
    }).then(function(response){
        //console.log(response);
        for(var i = 0; i < response.length; i++){
            if(response[i].type === "positive"){
                positive.push(response[i]);
                
            }else if(response[i].type === "negative"){
                negative.push(response[i]);
            }else if(response[i].type === "medical"){
                medical.push(response[i]);
            }
        }
    });

    $.ajax({
        url: "http://strainapi.evanbusse.com/" + apiKey + "/searchdata/flavors",
        method: 'GET'
    }).then(function(response){
        //console.log(reponse);
        for(var i = 0; i < response.length; i++){
            flavors.push(response[i]);
        }
    });

    var effects = {
        'positive': positive,
        'negative': negative,
        'medical': medical,
        'flavors': flavors,
    }

    //Want to save to the database the master list of the different strains so that its only calle once.
    //When a user selects what effects they are looking for I want to search the database for strains that fit the requirement
    //When the search button is pressed itll search the database looking for the effects

    //Testing
    /*
    $("#submit").on('click', function(){
        var strain = $(".typeStrains").val().trim();
        var effect = $(".typeEffects").val().trim();
        var flavor = $(".typeFlavor").val().trim();

        $.ajax({
            url: "http://strainapi.evanbusse.com/" + apiKey + "/strains/search/flavor/" + flavor,
            method: 'GET'
        }).then(function(response){
            for(var i = 0; i < response.length; i++){
                flavorArr.push(response[i].id);
            }
            console.log("----- FLAVOR -----");
            console.log(flavorArr);

        });

        $.ajax({
            url: "http://strainapi.evanbusse.com/" + apiKey + "/strains/search/effect/" + effect,
            method: 'GET'
        }).then(function(response){
            for(var i = 0; i < response.length; i++){
                effectArr.push(response[i].id);
            }
            console.log("----- EFFECT -----");
            console.log(effectArr);
            
        });

        $.ajax({
            url: "http://strainapi.evanbusse.com/" + apiKey + "/strains/search/race/" + strain,
            method: 'GET'
        }).then(function(response){
            for(var i = 0; i < response.length; i++){
                strainArr.push(response[i].id);
            }
            console.log("----- STRAIN -----");
            console.log(strainArr);
        });

        if(flavorArr.length <= effectArr.length && flavorArr.length <= strainArr.length && flavorArr.length !== 0){
            console.log("FLAVOR LENGTH: " + flavorArr.length);
            for(var i = 0; i < flavorArr.length; i++){
                //if(flavorArr[i] === effectArr[i] && flavorArr[i] === strainArr[i]){
                //    matchesArr.push(flavorArr[i]);
                //}
                console.log(effectsArr.indexOf(flavorArr[i]));
            }
            console.log("------ MATCHES ------");
            console.log(matchesIdArr);
        }else if(effectArr.length <= flavorArr.length && effectArr.length <= strainArr.length){
            console.log("EFFECT LENGTH: " + effectArr.length);
            for(var i = 0; i < effectArr.length; i++){
                if(effectArr[i] === flavorArr[i] && effectArr[i] === strainArr[i]){
                    matchesIdArr.push(effectArr[i]);
                    
                }
            }
            console.log("------ MATCHES ------");
            console.log(matchesIdArr);
        }else{
            console.log("STRAINS LENGHT: " + strainArr.length);
            for(var i = 0; i < strainArr.length; i++){
                if(strainArr[i] === flavorArr[i] && strainArr[i] === effectArr[i]){
                    matchesIdArr.push(strainArr[i]);
                }
            }
            console.log("------ MATCHES ------");
            console.log(matchesIdArr);
        }
    });
*/

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
            console.log("-----NAME-----");
            console.log(nameArr);
            console.log("-----ID-------");
            console.log(idArr);
        }); 
    });


    //console.log(effects);
    
});
