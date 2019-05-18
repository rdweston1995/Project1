//hides all sections until user clicks a button
$(window).on("load", function () {
    $("#effects-section").hide();
    $("#diff-section").hide();
    $("#product-section").hide();
});

//prevents all sections from being displayed at one time
$("#effects-button").on("click", function () {
    $("#effects-section").show();
    $("#diff-section").hide();
    $("#product-section").hide();
});

$("#difference-button").on("click", function () {
    $("#diff-section").show();
    $("#effects-section").hide();
    $("#product-section").hide();
});

$("#product-button").on("click", function () {
    $("#product-section").show();
    $("#effects-section").hide();
    $("#diff-section").hide();
});

//function to pull data from API
var searchProduct = function () {

    var cors = "https://cors-anywhere.herokuapp.com/";
    var queryURL = "https://neobi.azure-api.net/api/products/search?rev=v1.3&count=50";
    $.ajax({
        url: cors + queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.length; i++) {
            var headline = $("<h2>" + response[i].name + "</h2>");
            var producer = $("<h4>Producer: " + response[i].brand + "</h4>");
            var image = $('<img src="' + response[i].image + '" width="200" height="200">');
            var thc = $("<h5>THC content: " + response[i].thc + "</h5>");
            var cbd = $("<h5>CBD content: " + response[i].cbd + "</h5>");
            var weight = $("<h5>Weight: " + response[i].eqWeight + "</h5>");
            var price = $("<h5>Price: " + response[i].price + "</h5>");
            var inStockStatus = $("<h5>Stock Status: " + response[i].instockstatus + "</h5>");
            var webpage = $('<a href="' + response[i].url + '">Visit vendor webpage</a><br><br><br>');

            var thcValue = response[i].thc;
            var thcResult = thcValue.split("~", 2);
            //gives number value for thc for comparison
            var thcParse = parseInt(thcResult[1]);
            console.log(thcParse);

            var cbdValue = response[i].cbd;
            var cbdResult = cbdValue.split("~", 2);
            //gives number value for cbd for comparison
            var cbdParse = parseInt(cbdResult[1]);
            console.log(cbdParse);

            $("#load-product").append(headline, producer, image, thc, cbd, weight, price, inStockStatus, webpage);
        }
    });
};

$(".high-pa").on("click", function () {
    searchProduct();
    if (cbdParse === 0) {
        $("#load-product").append(headline, producer, image, thc, cbd, weight, price, inStockStatus, webpage);
        $(".high-pa-relax").hide();
        $(".high-relax-killcc").hide();
        $(".relax-killcc").hide();
        $(".relax-mood").hide();
        $(".neuro").hide();
        $(".auto-immune").hide();
    }
});

$(".high-pa-relax").on("click", function () {
    searchProduct();
    if (cbdParse === 0) {
        $("#load-product").append(headline, producer, image, thc, cbd, weight, price, inStockStatus, webpage);
        $(".high-pa").hide();
        $(".high-relax-killcc").hide();
        $(".relax-killcc").hide();
        $(".relax-mood").hide();
        $(".neuro").hide();
        $(".auto-immune").hide();
    }
});


$("high-relax-killcc").on("click", function () {
    searchProduct();
    if (cbdParse === 0) {
        $("#load-product").append(headline, producer, image, thc, cbd, weight, price, inStockStatus, webpage);
        $(".high-pa").hide();
        $(".high-pa-relax").hide();
        $(".relax-killcc").hide();
        $(".relax-mood").hide();
        $(".neuro").hide();
        $(".auto-immune").hide();
    }
});

$(".relax-killcc").on("click", function () {
    searchProduct();
    if (cbdParse === 0) {
        $("#load-product").append(headline, producer, image, thc, cbd, weight, price, inStockStatus, webpage);
        $(".high-pa").hide();
        $(".high-pa-relax").hide();
        $(".high-relax-killcc").hide();
        $(".relax-mood").hide();
        $(".neuro").hide();
        $(".auto-immune").hide();
    }
});

$(".relax-mood").on("click", function () {
    searchProduct();
    if (thcParse === 0) {
        $("#load-product").append(headline, producer, image, thc, cbd, weight, price, inStockStatus, webpage);
        $(".high-pa").hide();
        $(".high-pa-relax").hide();
        $(".high-relax-killcc").hide();
        $(".relax-killcc").hide();
        $(".neuro").hide();
        $(".auto-immune").hide();
    }
});

$(".neuro").on("click", function () {
    searchProduct();
    if (thcParse === 0) {
        $("#load-product").append(headline, producer, image, thc, cbd, weight, price, inStockStatus, webpage);
        $(".high-pa").hide();
        $(".high-pa-relax").hide();
        $(".high-relax-killcc").hide();
        $(".relax-killcc").hide();
        $(".relax-mood").hide();
        $(".auto-immune").hide();
    }
});

$(".auto-immune").on("click", function () {
    searchProduct();
    if (thcParse === 0) {
        $("#load-product").append(headline, producer, image, thc, cbd, weight, price, inStockStatus, webpage);
        $(".high-pa").hide();
        $(".high-pa-relax").hide();
        $(".high-relax-killcc").hide();
        $(".relax-killcc").hide();
        $(".relax-mood").hide();
        $(".neuro").hide();
    }
});

//how to replace the contents of div - tried empty(), clear(), hide()

// on button click, search function will run and use conditionals to populate only the strains that meet the conditional requirements

// high/psychoactive cbd/thc 0:1
// high/psychoactive/relax cbd/thc 1:2
// high/relax/kill cancer cells cbd/thc 1:1
// relax/kill cancer cells cbd/thc 2:1
// relax/good mood cbd/thc 1:0
// neurological issue  cbd/thc 20:1
// auto-immune condition cbd/thc 3:1


// if (cbdResult = 0.5(thcResult)) {
//     //populate under button High/Psychoactive/relax
// }
// if (cbdResult = thcResult) {
//     //populate under button high/relax/kill cancer cells cbd/thc
// }
// if (thcResult = 0.5(cbdResult)) {
//     //populate under relax/kill cancer cells
// }
// if (thcResult = 0) {
//     //populate under relax/good mood
// }
// if (cbdResult = thcResult ^ 20) {
//     //populate under neurological issue
// }
// if (cbd = thc ^ 3) {
//     //populate under auto-immune condition
// }