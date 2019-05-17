//<script src="https://www.gstatic.com/firebasejs/6.0.2/firebase-app.js"></script>
//<script src="https://www.gstatic.com/firebasejs/6.0.2/firebase-database.js"></script>
//<script src="assets/javascript/strainAPI.js"></script>
$(document).ready(function(){
    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyBxnk9J_qG6F1oFANgqZ9DOB5QIQKpaDJE",
        authDomain: "project1-dcb00.firebaseapp.com",
        databaseURL: "https://project1-dcb00.firebaseio.com",
        projectId: "project1-dcb00",
        storageBucket: "project1-dcb00.appspot.com",
        messagingSenderId: "929934289487",
        appId: "1:929934289487:web:05e9caf4560b0be2"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
    var dbRef = "";
    var database = firebase.database();
    var favorites = [];

    //Getting the current user that is signed in
    firebase.auth().onAuthStateChanged(function(user){
        if(user){
            dbRef = user.email;
            dbRef = dbRef.replace(".", "");
            database.ref(dbRef);
        }else{
            console.log("No one signed in");
        }
    })
    var apiKey = "CHAdUYO"
    
    //Arrays that will be filled when the user enters in information
    var nameArr = [];
    var flavorNameArr = [];
    var idArr = [];

    //When the user searches with the data they provided
    $(".submit").on('click', function(){
        //Getting the values from the input boxes
        var strain = $(".typeStrains").val().trim();
        var effect = $(".typeEffects").val().trim();
        var flavor = $(".typeFlavor").val().trim();

        //Clearing the input boxes
        $(".typeStrains").val("");
        $(".typeEffects").val("");
        $(".typeFlavor").val("");

        //First ajax call to get all the strains that fit the effect the user is looking for
        $.ajax({
            url: "http://strainapi.evanbusse.com/" + apiKey + "/strains/search/effect/" + effect,
            method: 'GET'
        }).then(function(response){
            //Goes through all the matches and checks if it matches the strains and if it does grab the name of the strain and add it to the array of Names
            for(var i = 0; i < response.length; i++){
                if(response[i].race === strain.toLowerCase()){
                    nameArr.push(response[i].name);
                    idArr.push(response[i].id);
                }
            }
            //Second ajax call to get all the strains that fit the flavor that the user is looking for
            $.ajax({
                url: "http://strainapi.evanbusse.com/" + apiKey + "/strains/search/flavor/" + flavor,
                method:'GET'
            }).then(function(response){
                //Goes through all the matches and addes all the matches to the array of flavor names
                for(var i = 0; i < response.length; i++){
                    flavorNameArr.push(response[i].name);
                }
                //Calls function getMatches
                getMatches(flavor);
            });
        });     
    });

    //On click function for the clear button to remove all results from the page
    $(".clear").on('click', function(){
        $(".strains").empty();
    });
    
    //On click function for the favorites button to go into the database using the email 
    //that the user signed in with and grabs their favorites and displays them to the page
    $(".favorites").on('click', function(){
        $(".strains").empty();

        var test = firebase.database().ref(dbRef);
        test.on('child_added', function(data){
            $(".strains").append("<div class='card card strainAPI'><div class='card-body'>" + data.node_.children_.root_.value.value_ + "</div></div>");
        })
          
    })
    //Get matches function to compare the two arrays of names and find the ones that are in both
    function getMatches(){
        //Third ajax call to get the master list of strains
        $.ajax({
            url: "http://strainapi.evanbusse.com/" + apiKey + "/strains/search/all",
            method: 'GET'
        }).then(function(response){
            //Flavor will always be the smaller length of the two arrays so search through that one
            for(var i = 0; i < flavorNameArr.length; i++){
                //If the the index of i in the array flavorNameArr appears in the nameArr grab all the information needed about that strain
                if(nameArr.indexOf(flavorNameArr[i]) !== -1){
                    var positives = [];
                    var negative = [];
                    var medical = [];
                    for(var k = 0; k < response[flavorNameArr[i]].effects.positive.length; k++){
                        positives.push(" " + response[flavorNameArr[i]].effects.positive[k]);
                    }
                    for( var n = 0; n < response[flavorNameArr[i]].effects.negative.length; n++){
                        negative.push(" " + response[flavorNameArr[i]].effects.negative[n]);
                    }
                    for( var m = 0; m < response[flavorNameArr[i]].effects.medical.length; m++){
                        medical.push(" " + response[flavorNameArr[i]].effects.medical[m]);
                    }   

                    var buttonVal = flavorNameArr[i];
                    if(buttonVal.indexOf(" ") !== -1){
                        buttonVal = buttonVal.replace(" ", "");

                    }
                    //Adding all the infromation to the page for each match
                    $(".strains").append("<div class='card card strainAPI'><div class='card-body strainAPI" + i + "' val=" + buttonVal + "><h3>" +
                    flavorNameArr[i] + "</h3><p>" + response[flavorNameArr[i]].race + "</p><p>Positives: " + positives + "</p><p>Medical:" + medical +
                    "</p><p>Negative: " + negative + "</p><p>Available Flavors: " + response[flavorNameArr[i]].flavors[0] + 
                    ", " + response[flavorNameArr[i]].flavors[1] + ", " + response[flavorNameArr[i]].flavors[2] + 
                    "</p><button class='btn btn-success my-2 my-sm-0'>Favorite</button></div></div>");

                    //On click function to add the selected strain to the favorites list in the database for that user
                    $(".strainAPI" + i).on('click', function(){
                        favorites.push(this.innerHTML);
                        database.ref(dbRef).push(favorites);
                    })
                }
            }
        });  
    }

});
