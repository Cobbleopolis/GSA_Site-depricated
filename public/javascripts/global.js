var isNavShown = false;
var nav = null;
var contentArticle = null;
var overlay = null;
var navButton = null;
var navLabel = $( "<span id=\"navLabel\">&nbsp;&nbsp;&nbsp;Navigation</span>" );
navLabel.fadeOut();

var navSlideTime = 350;

$(document).ready( function() {
    contentArticle = $("#contentArticle");
    overlay = $("#overlay");
    nav = $("#nav");
    navButton = $("#navButton");

    navButton.css("height", window.getComputedStyle(document.getElementById("navButton"), null).getPropertyValue("height"));
    navButton.append(navLabel);

    overlay.css('height', window.getComputedStyle(document.getElementById("content"), null).getPropertyValue("height"));

    navButton.click(function () {
        toggleNav();
    });

    navButton.hover(
        function () {
            navLabel.stop().animate({opacity: "toggle", width: "toggle"});
        }, function () {
            navLabel.stop().animate({opacity: "toggle", width: "toggle"});
        }
    );

    overlay.click(function () {
        if (isNavShown)
            toggleNav();
    });



});

function openNav() {
    //console.log("OPEN");
    if (!isNavShown) {
        contentArticle.stop().animate({"left": nav.outerWidth()}, navSlideTime);
        navButton.stop().animate({"left": nav.outerWidth()}, navSlideTime);
        overlay.stop().css("display", "inline").animate({"left": nav.outerWidth(), "opacity": "0.4"}, navSlideTime);
        isNavShown = true;
    }
}

function closeNav() {
    //console.log("CLOSE");
    if (isNavShown) {
        contentArticle.stop().animate({"left": "0"}, navSlideTime);
        navButton.stop().animate({"left": "0"}, navSlideTime);
        overlay.stop().animate({"left": "0", "opacity": "0"}, {
            duration: navSlideTime,
            done: function() {
                overlay.css("display", "none");
            }
        });
        isNavShown = false;
    }
}

function toggleNav() {
    if (isNavShown)
        closeNav();
    else
        openNav();
    contentArticle.toggleClass("darken");
}
