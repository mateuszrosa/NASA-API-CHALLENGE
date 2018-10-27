$(function() {

    $(document).ajaxStop(function() {
        $("#loader-wrapper").hide();
    });

    var sectionWelcome = $("#welcome");
    var url = "https://api.nasa.gov/planetary/apod?";
    var hd = "hd=true";
    var apiKey = "api_key=GVsnIvDsUqzDjGHPX5eS1eHLsVI09H3qwq9gPw3p";

    function randomingDate() {
        var year = new Date();
        var year1 = year.getFullYear();
        var month = new Date();
        var month1 = month.getMonth();
        var day = new Date();
        var day1 = day.getDay();
        var randomYear = Math.floor(Math.random() * (+year1 - +1996) + 1996);
        var randomMonth = Math.floor((Math.random() * 12) + 1);
        var randomDay = Math.floor((Math.random() * 30) + 1);
        if (randomYear == year1) {
            var randomMonth = Math.floor((Math.random() * month1) + 1);
            if (randomMonth == month1) {
                var randomDay = Math.floor((Math.random() * day1) + 1);
            }
        } else {
            var randomMonth = Math.floor((Math.random() * 12) + 1);
        }
        return randomYear + "-" + randomMonth + "-" + randomDay;
    }
    var res = randomingDate();
    var date = "date=" + res;

    function welcome(nasa) {
        sectionWelcome.css("background-image", "url(" + nasa.url + ')');
        sectionWelcome.css("background-repeat", "no-repeat");
        sectionWelcome.css("background-size", "contain");
        sectionWelcome.css("background-position", "center");
    }

    url: "https://api.nasa.gov/planetary/apod?date=2018-10-01&hd=true&api_key=GVsnIvDsUqzDjGHPX5eS1eHLsVI09H3qwq9gPw3p"

    $.ajax({
        url: url + date + "&" + hd + "&" + apiKey
    }).done(function(response) {
        welcome(response);
    }).fail(function(error) {
        console.log(error);
    });

    var urlMars = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&camera=MAST&api_key=GVsnIvDsUqzDjGHPX5eS1eHLsVI09H3qwq9gPw3p";

    $.ajax({
        url: urlMars
    }).done(function(response) {
        insertPhotos(response);
    }).fail(function(response) {
        console.log(error);
    });

    function insertPhotos(nasa) {
        var galleryMarsItems = $(".marsItem");
        if (nasa && document.readyState === "complete") {
            galleryMarsItems.each(function() {
                $(this).css("background-image", "url(" + nasa.photos[Math.floor((Math.random() * 800) + 1)].img_src + ')');
            })
        }
    };

    $("span").on('click', function() {
        $(".gallery1").toggle("hidden");
    });

    var mobile = window.matchMedia("(min-width: 1024px)");

    if ($(window).width() >= 1024) {
        $(".first div").on("click", function() {
            var urlMars = $(this).css("background-image");
            $(".blank").toggle("hidden");
            $(".blank").css("background-image", urlMars);
            $(".blank").css("background-repeat", "no-repeat");
            $(".blank").css("background-size", "cover");
        })
    }

    if ($(window).width() >= 1024) {
        $(".second div").on("click", function() {
            var urlMars = $(this).css("background-image");
            $(".blank1").toggle("hidden");
            $(".blank1").css("background-image", urlMars);
            $(".blank1").css("background-repeat", "no-repeat");
            $(".blank1").css("background-size", "cover");
        })
    }


})