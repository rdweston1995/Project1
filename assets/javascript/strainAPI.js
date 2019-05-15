//<script src="https://www.gstatic.com/firebasejs/6.0.2/firebase-app.js"></script>
//<script src="https://www.gstatic.com/firebasejs/6.0.2/firebase-database.js"></script>
//<script src="assets/javascript/strainAPI.js"></script>
$(document).ready(function(){
    var apiKey = "CHAdUYO"
    
    var nameArr = [];
    var flavorNameArr = [];
    var idArr = [];


    $(".submit").on('click', function(){
        var strain = $(".typeStrains").val().trim();
        var effect = $(".typeEffects").val().trim();
        var flavor = $(".typeFlavor").val().trim();

        $(".typeStrains").val("");
        $(".typeEffects").val("");
        $(".typeFlavor").val("");

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

    $(".clear").on('click', function(){
        $(".strains").empty();
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

                    $(".strains").append("<div class='card card strainAPI><div class'card-body'><h3>" +
                    flavorNameArr[i] + "</h3><p>" + response[flavorNameArr[i]].race + "</p><p>Positives: " + positives + "</p><p>Medical:" + medical +
                    "</p><p>Negative: " + negative + "</p><p>Available Flavors: " + response[flavorNameArr[i]].flavors[0] + 
                    ", " + response[flavorNameArr[i]].flavors[1] + ", " + response[flavorNameArr[i]].flavors[2] + 
                    "</p><button class='btn btn-success my-2 my-sm-0 favorite'>Favorite</button></div></div>");
                }
            }

            $(".favorite").on('click', function(respose){
                console.log("test");
            })
        });  
    }
});
