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
    
    $.ajax({
        url: "http://strainapi.evanbusse.com/" + apiKey + "/searchdata/effects",
        method: 'GET'
    }).then(function(response){
        console.log(response);
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
    var Positive ={};

    //for(var i = 0; i < positive.length; i++){
        //Positive.i.effect = positive[i].effect;
        //Positive.i.type = positive[i].type;
        //Positive.push(positive[i]);
        //console.log(positive[i]);
    //}

    //console.log(Positive);
    
    //console.log(effects);
    //console.log("-------------");
    //database.ref().push(effects);


    console.log(positive);
    console.log(positive[0]);
    console.log("--------------");
    //console.log(negative);
    //console.log("--------------");
    //console.log(medical);
    //console.log("--------------");
    //console.log(flavors);
    
});
