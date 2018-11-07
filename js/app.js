$(function() {

    // variables
    var sectionWelcome = $("#welcome");
    var url = "https://api.nasa.gov/planetary/apod?";
    var apiKey = "api_key=GVsnIvDsUqzDjGHPX5eS1eHLsVI09H3qwq9gPw3p";
    var dateOfPhoto = $("#date");
    var title = $("#title");
    var urlMars = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&";
    var res = randomingDate();
    var mobile = window.matchMedia("(min-width: 1024px)");

    // preloading
    $(document).ajaxStop(function() {
        $("#loader-wrapper").hide();
    });

    // randoming date function
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

    // downloading photo of a day from NASA API
    $.ajax({
        url: url + "date=" + res + "&hd=true&" + apiKey
    }).done(function(response) {
        welcome(response);
    }).fail(function(error) {
        console.log(error);
    });

    // adding randomed choosed photo photo of the day
    function welcome(nasa) {
        sectionWelcome.css("background-image", "url(" + nasa.url + ')');
        sectionWelcome.css("background-repeat", "no-repeat");
        sectionWelcome.css("background-size", "contain");
        sectionWelcome.css("background-position", "center");
        dateOfPhoto.text("Date: " + nasa.date);
        title.text("Title: " + nasa.title);
    }

    // downloading photos of Mars from NASA API
    $.ajax({
        url: urlMars + apiKey
    }).done(function(response) {
        insertPhotos(response);
    }).fail(function(response) {
        console.log(error);
    });

    // inserting downloaded photos to gallery
    function insertPhotos(nasa) {
        var galleryMarsItems = $(".marsItem");
        if (nasa && document.readyState === "complete") {
            galleryMarsItems.each(function() {
                $(this).css("background-image", "url(" + nasa.photos[Math.floor((Math.random() * 800) + 1)].img_src + ')');
            })
        }
    };

    // event showing/hiddening more photos of gallery
    $("span").on('click', function() {
        $(".gallery1").toggle("hidden");
    });

    // media queries for less than 1024 for both galleries
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