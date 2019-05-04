/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

eval("$(function() {\n\n    // variables\n    var sectionWelcome = $(\"#welcome\");\n    var url = \"https://api.nasa.gov/planetary/apod?\";\n    var apiKey = \"api_key=GVsnIvDsUqzDjGHPX5eS1eHLsVI09H3qwq9gPw3p\";\n    var dateOfPhoto = $(\"#date\");\n    var title = $(\"#title\");\n    var urlMars = \"https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&\";\n    var res = randomingDate();\n    var mobile = window.matchMedia(\"(min-width: 1024px)\");\n\n    // preloading\n    $(document).ajaxStop(function() {\n        $(\"#loader-wrapper\").hide();\n    });\n\n    // randoming date function\n    function randomingDate() {\n        var year = new Date();\n        var year1 = year.getFullYear();\n        var month = new Date();\n        var month1 = month.getMonth();\n        var day = new Date();\n        var day1 = day.getDay();\n        var randomYear = Math.floor(Math.random() * (+year1 - +1996) + 1996);\n        var randomMonth = Math.floor((Math.random() * 12) + 1);\n        var randomDay = Math.floor((Math.random() * 30) + 1);\n        if (randomYear == year1) {\n            var randomMonth = Math.floor((Math.random() * month1) + 1);\n            if (randomMonth == month1) {\n                var randomDay = Math.floor((Math.random() * day1) + 1);\n            }\n        } else {\n            var randomMonth = Math.floor((Math.random() * 12) + 1);\n        }\n        return randomYear + \"-\" + randomMonth + \"-\" + randomDay;\n    }\n\n    // downloading photo of a day from NASA API\n    $.ajax({\n        url: url + \"date=\" + res + \"&hd=true&\" + apiKey\n    }).done(function(response) {\n        welcome(response);\n    }).fail(function(error) {\n        console.log(error);\n    });\n\n    // adding randomed choosed photo photo of the day\n    function welcome(nasa) {\n        sectionWelcome.css(\"background-image\", \"url(\" + nasa.url + ')');\n        sectionWelcome.css(\"background-repeat\", \"no-repeat\");\n        sectionWelcome.css(\"background-size\", \"contain\");\n        sectionWelcome.css(\"background-position\", \"center\");\n        dateOfPhoto.text(\"Date: \" + nasa.date);\n        title.text(\"Title: \" + nasa.title);\n    }\n\n    // downloading photos of Mars from NASA API\n    $.ajax({\n        url: urlMars + apiKey\n    }).done(function(response) {\n        insertPhotos(response);\n    }).fail(function(response) {\n        console.log(error);\n    });\n\n    // inserting downloaded photos to gallery\n    function insertPhotos(nasa) {\n        var galleryMarsItems = $(\".marsItem\");\n        if (nasa && document.readyState === \"complete\") {\n            galleryMarsItems.each(function() {\n                $(this).css(\"background-image\", \"url(\" + nasa.photos[Math.floor((Math.random() * 800) + 1)].img_src + ')');\n            })\n        }\n    };\n\n    // event showing/hiddening more photos of gallery\n    $(\"span\").on('click', function() {\n        $(\".gallery1\").toggleClass(\"hidden\");\n    });\n\n    // media queries for less than 1024 for both galleries\n    if ($(window).width() >= 1024) {\n        $(\".first div\").on(\"click\", function() {\n            var urlMars = $(this).css(\"background-image\");\n            $(\".blank\").toggle(\"hidden\");\n            $(\".blank\").css(\"background-image\", urlMars);\n            $(\".blank\").css(\"background-repeat\", \"no-repeat\");\n            $(\".blank\").css(\"background-size\", \"cover\");\n        })\n    }\n\n    if ($(window).width() >= 1024) {\n        $(\".second div\").on(\"click\", function() {\n            var urlMars = $(this).css(\"background-image\");\n            $(\".blank1\").toggle(\"hidden\");\n            $(\".blank1\").css(\"background-image\", urlMars);\n            $(\".blank1\").css(\"background-repeat\", \"no-repeat\");\n            $(\".blank1\").css(\"background-size\", \"cover\");\n        })\n    }\n\n\n})//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9qcy9hcHAuanM/Yzk5ZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7O0FBR0EsQ0FBQyIsImZpbGUiOiIwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJChmdW5jdGlvbigpIHtcblxuICAgIC8vIHZhcmlhYmxlc1xuICAgIHZhciBzZWN0aW9uV2VsY29tZSA9ICQoXCIjd2VsY29tZVwiKTtcbiAgICB2YXIgdXJsID0gXCJodHRwczovL2FwaS5uYXNhLmdvdi9wbGFuZXRhcnkvYXBvZD9cIjtcbiAgICB2YXIgYXBpS2V5ID0gXCJhcGlfa2V5PUdWc25JdkRzVXF6RGpHSFBYNWVTMWVITHNWSTA5SDNxd3E5Z1B3M3BcIjtcbiAgICB2YXIgZGF0ZU9mUGhvdG8gPSAkKFwiI2RhdGVcIik7XG4gICAgdmFyIHRpdGxlID0gJChcIiN0aXRsZVwiKTtcbiAgICB2YXIgdXJsTWFycyA9IFwiaHR0cHM6Ly9hcGkubmFzYS5nb3YvbWFycy1waG90b3MvYXBpL3YxL3JvdmVycy9jdXJpb3NpdHkvcGhvdG9zP3NvbD0xMDAwJlwiO1xuICAgIHZhciByZXMgPSByYW5kb21pbmdEYXRlKCk7XG4gICAgdmFyIG1vYmlsZSA9IHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogMTAyNHB4KVwiKTtcblxuICAgIC8vIHByZWxvYWRpbmdcbiAgICAkKGRvY3VtZW50KS5hamF4U3RvcChmdW5jdGlvbigpIHtcbiAgICAgICAgJChcIiNsb2FkZXItd3JhcHBlclwiKS5oaWRlKCk7XG4gICAgfSk7XG5cbiAgICAvLyByYW5kb21pbmcgZGF0ZSBmdW5jdGlvblxuICAgIGZ1bmN0aW9uIHJhbmRvbWluZ0RhdGUoKSB7XG4gICAgICAgIHZhciB5ZWFyID0gbmV3IERhdGUoKTtcbiAgICAgICAgdmFyIHllYXIxID0geWVhci5nZXRGdWxsWWVhcigpO1xuICAgICAgICB2YXIgbW9udGggPSBuZXcgRGF0ZSgpO1xuICAgICAgICB2YXIgbW9udGgxID0gbW9udGguZ2V0TW9udGgoKTtcbiAgICAgICAgdmFyIGRheSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHZhciBkYXkxID0gZGF5LmdldERheSgpO1xuICAgICAgICB2YXIgcmFuZG9tWWVhciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgreWVhcjEgLSArMTk5NikgKyAxOTk2KTtcbiAgICAgICAgdmFyIHJhbmRvbU1vbnRoID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDEyKSArIDEpO1xuICAgICAgICB2YXIgcmFuZG9tRGF5ID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIDMwKSArIDEpO1xuICAgICAgICBpZiAocmFuZG9tWWVhciA9PSB5ZWFyMSkge1xuICAgICAgICAgICAgdmFyIHJhbmRvbU1vbnRoID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIG1vbnRoMSkgKyAxKTtcbiAgICAgICAgICAgIGlmIChyYW5kb21Nb250aCA9PSBtb250aDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmFuZG9tRGF5ID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIGRheTEpICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmFuZG9tTW9udGggPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogMTIpICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJhbmRvbVllYXIgKyBcIi1cIiArIHJhbmRvbU1vbnRoICsgXCItXCIgKyByYW5kb21EYXk7XG4gICAgfVxuXG4gICAgLy8gZG93bmxvYWRpbmcgcGhvdG8gb2YgYSBkYXkgZnJvbSBOQVNBIEFQSVxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogdXJsICsgXCJkYXRlPVwiICsgcmVzICsgXCImaGQ9dHJ1ZSZcIiArIGFwaUtleVxuICAgIH0pLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgd2VsY29tZShyZXNwb25zZSk7XG4gICAgfSkuZmFpbChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgfSk7XG5cbiAgICAvLyBhZGRpbmcgcmFuZG9tZWQgY2hvb3NlZCBwaG90byBwaG90byBvZiB0aGUgZGF5XG4gICAgZnVuY3Rpb24gd2VsY29tZShuYXNhKSB7XG4gICAgICAgIHNlY3Rpb25XZWxjb21lLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIiwgXCJ1cmwoXCIgKyBuYXNhLnVybCArICcpJyk7XG4gICAgICAgIHNlY3Rpb25XZWxjb21lLmNzcyhcImJhY2tncm91bmQtcmVwZWF0XCIsIFwibm8tcmVwZWF0XCIpO1xuICAgICAgICBzZWN0aW9uV2VsY29tZS5jc3MoXCJiYWNrZ3JvdW5kLXNpemVcIiwgXCJjb250YWluXCIpO1xuICAgICAgICBzZWN0aW9uV2VsY29tZS5jc3MoXCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCIsIFwiY2VudGVyXCIpO1xuICAgICAgICBkYXRlT2ZQaG90by50ZXh0KFwiRGF0ZTogXCIgKyBuYXNhLmRhdGUpO1xuICAgICAgICB0aXRsZS50ZXh0KFwiVGl0bGU6IFwiICsgbmFzYS50aXRsZSk7XG4gICAgfVxuXG4gICAgLy8gZG93bmxvYWRpbmcgcGhvdG9zIG9mIE1hcnMgZnJvbSBOQVNBIEFQSVxuICAgICQuYWpheCh7XG4gICAgICAgIHVybDogdXJsTWFycyArIGFwaUtleVxuICAgIH0pLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaW5zZXJ0UGhvdG9zKHJlc3BvbnNlKTtcbiAgICB9KS5mYWlsKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgICB9KTtcblxuICAgIC8vIGluc2VydGluZyBkb3dubG9hZGVkIHBob3RvcyB0byBnYWxsZXJ5XG4gICAgZnVuY3Rpb24gaW5zZXJ0UGhvdG9zKG5hc2EpIHtcbiAgICAgICAgdmFyIGdhbGxlcnlNYXJzSXRlbXMgPSAkKFwiLm1hcnNJdGVtXCIpO1xuICAgICAgICBpZiAobmFzYSAmJiBkb2N1bWVudC5yZWFkeVN0YXRlID09PSBcImNvbXBsZXRlXCIpIHtcbiAgICAgICAgICAgIGdhbGxlcnlNYXJzSXRlbXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkKHRoaXMpLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIiwgXCJ1cmwoXCIgKyBuYXNhLnBob3Rvc1tNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogODAwKSArIDEpXS5pbWdfc3JjICsgJyknKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLy8gZXZlbnQgc2hvd2luZy9oaWRkZW5pbmcgbW9yZSBwaG90b3Mgb2YgZ2FsbGVyeVxuICAgICQoXCJzcGFuXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAkKFwiLmdhbGxlcnkxXCIpLnRvZ2dsZUNsYXNzKFwiaGlkZGVuXCIpO1xuICAgIH0pO1xuXG4gICAgLy8gbWVkaWEgcXVlcmllcyBmb3IgbGVzcyB0aGFuIDEwMjQgZm9yIGJvdGggZ2FsbGVyaWVzXG4gICAgaWYgKCQod2luZG93KS53aWR0aCgpID49IDEwMjQpIHtcbiAgICAgICAgJChcIi5maXJzdCBkaXZcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB1cmxNYXJzID0gJCh0aGlzKS5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIpO1xuICAgICAgICAgICAgJChcIi5ibGFua1wiKS50b2dnbGUoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAkKFwiLmJsYW5rXCIpLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIiwgdXJsTWFycyk7XG4gICAgICAgICAgICAkKFwiLmJsYW5rXCIpLmNzcyhcImJhY2tncm91bmQtcmVwZWF0XCIsIFwibm8tcmVwZWF0XCIpO1xuICAgICAgICAgICAgJChcIi5ibGFua1wiKS5jc3MoXCJiYWNrZ3JvdW5kLXNpemVcIiwgXCJjb3ZlclwiKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBpZiAoJCh3aW5kb3cpLndpZHRoKCkgPj0gMTAyNCkge1xuICAgICAgICAkKFwiLnNlY29uZCBkaXZcIikub24oXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB1cmxNYXJzID0gJCh0aGlzKS5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIpO1xuICAgICAgICAgICAgJChcIi5ibGFuazFcIikudG9nZ2xlKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgJChcIi5ibGFuazFcIikuY3NzKFwiYmFja2dyb3VuZC1pbWFnZVwiLCB1cmxNYXJzKTtcbiAgICAgICAgICAgICQoXCIuYmxhbmsxXCIpLmNzcyhcImJhY2tncm91bmQtcmVwZWF0XCIsIFwibm8tcmVwZWF0XCIpO1xuICAgICAgICAgICAgJChcIi5ibGFuazFcIikuY3NzKFwiYmFja2dyb3VuZC1zaXplXCIsIFwiY292ZXJcIik7XG4gICAgICAgIH0pXG4gICAgfVxuXG5cbn0pXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9qcy9hcHAuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///0\n");

/***/ })
/******/ ]);