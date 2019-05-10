console.log("Area of Growth")

var effectSelection = [],


function effectsFunc() {

    var strainType = $(this).attr("data-name");
    var effects = "/strains/search/effect/EFFECT"
    var queryURL = "strainapi.evanbusse.com/" + "ZIO4sYw" + effects;
     

    // strainapi.evanbusse.com/API_KEY/strains/search/effect/EFFECT
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {


    });

}

function response() {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);
}