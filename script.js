/* Javascript here: */

/* creates sticker on position (x,y): */
function sticker(x, y, title, description) {

    var stickerDiv = jQuery("<div id='cloud'>");
    stickerDiv.hide();
    stickerDiv.appendTo("body");
    stickerDiv.css({
        top: y,
        left: x
    });

    var cloudTitle = jQuery("<p class='cloud-title'>" + title + "</p>");
    var cloudDesc = jQuery("<p class='cloud-description'>" + description + "</p>");

    cloudTitle.appendTo("#cloud");
    cloudDesc.appendTo("#cloud");

    stickerDiv.show(300);
}

/* highlights circles when hovering: */
function highlight_circles(viewport) {
    var circles = Snap.selectAll(".dot");

    for(var i = 0; i < circles.length; i++) {
        circles[i].hover(function() {
            this.animate({
                fill: "#fef9ff", strokeWidth: "5px", stroke: "#39384d"
            }, 200);

            // recalculating cloud coordinates:
            var mat = viewport.zpd("save");
            var newx = this.asPX("cx") * mat.a + mat.e;
            var newy = this.asPX("cy") * mat.a + mat.f;

            sticker(newx, newy + 55, "План кинжал \u03B1", "20 звонков потенциальным клиентам");
        }, function() {
            this.animate({fill: "#39384d", strokeWidth: "0px"}, 200);
            jQuery("#cloud").hide(200, function() {
                jQuery("#cloud").remove();
            });
        });
    }
}

function date_diff(dateA, dateB) {
    var ms = dateB - dateA;
    var rest = ms % 86400000;
    var days = (ms - rest) / 86400000;

    var hours = (rest - (rest % 3600000)) / 3600000;
    rest = rest % 3600000;

    var minutes = (rest - (rest % 60000)) / 60000;
    rest = rest % 60000;

    var seconds = (rest - (rest % 1000)) / 1000;

    return { d: days, h: hours, m: minutes, s: seconds };
}

function moveTo(x, y, interval, viewport) {
    var dx = viewport.node.clientWidth / 2 - x;
    var dy = viewport.node.clientHeight / 2 - y;
    viewport.panTo(dx, dy, interval);
}

// returns ending point of timeline:
function timeline(dateA, dateB, x1, x2) {
    var dt = new Date() - dateA;
    return dt * (x2 - x1) / (dateB - dateA);
}

// transform viewport to values:
function lineZoom(x1, x2, y, delta, W, H) {

    var w = (x2 - x1) * (1 + delta);
    var zoomfactor = W / w;
    var h = H / zoomfactor;

    var cx = x1 + (x2 - x1) / 2;
    var cy = y;

    var dx = x1;
    var dy = cy - h / 2;

    return "s" + zoomfactor + " t" + x1 + "," + y;
}

jQuery(document).ready(function() {

    var zoomed = false;

    var W = jQuery("#main-svg-viewport").width();
    var H = jQuery("#main-svg-viewport").height();

    var svgElement = Snap("#main-svg-viewport");
    var viewport = svgElement.select("#canvas");

    highlight_circles(viewport);

    // define pointA cx and pointB cx:
    var x1 = Snap("#pointA").asPX("cx");
    var x2 = Snap("#pointB").asPX("cx");
    var y = Snap("#pointA").asPX("cy");

    var picker = new Pikaday({
        field: jQuery("input[name='datepicker']")[0],
        firstDay: 1,
        minDate: new Date(),
        maxDate: new Date(2020, 12, 31),
        yearRange: [2000, 2020],
        onSelect: function () {
            var r = jQuery("#date_countdown");
            jQuery(".digit-block").css("visibility", "visible");

            // dateA for timeline testing:
            var dateA = new Date();
            var dateB = picker.getDate().getTime();

            setInterval(function () {
                var countdown = date_diff(new Date(), picker.getDate());

                jQuery("#days .inner-digit").text(countdown.d);
                jQuery("#hours .inner-digit").text(countdown.h);
                jQuery("#minutes .inner-digit").text(countdown.m);
                jQuery("#seconds .inner-digit").text(countdown.s);

                // testing timeline:
                var endingPos = timeline(dateA, dateB, x1, x2);
                viewport.line(x1, y, x1 + endingPos, y).attr({stroke: "black", strokeWidth: 4});

            }, 1000);
        }
    });

    if(!picker.isSelected) {
        jQuery(".digit-block").css("visibility", "hidden");
    }

    // testing line hover:
    var lines = viewport.selectAll(".timeline");
    for (var i = 0; i < lines.length; i++) {
        lines[i].hover(function () {
            this.animate({strokeWidth: "8px"}, 100);
        }, function () {
            this.animate({strokeWidth: "4px"}, 200);
        });
    }


    // testing click:
    for(var j = 0; j < lines.length; j++)
    {
        lines[j].click(function() {
            var current_line = this;

            // get line positions:
            var x1 = current_line.asPX("x1");
            var x2 = current_line.asPX("x2");

            var duration = 200;

            var transform_query = "";
            var dx = 0;

            // zooming stuff:
            var delta = 0.3;
            var w = (x2 - x1) * (1 + delta);
            var zoomfactor = W / w;

            var tau = (w - x1 - x2) / 2;

            if(zoomed) {
                var mat = viewport.zpd("save");
                transform_query = "s" + zoomfactor + " t" + dx + "," + 0;
            }
            else {
                // delta needed for left & right circles margin of zoomed viewport
                dx = (W - x2 - x1) / 2;
                transform_query = "s" + zoomfactor + " t" + dx + "," + 0;
                zoomed = true;
            }

            viewport.animate({ "transform": transform_query }, duration);
        });
    }


    // on return click:
    jQuery("#return").click(function() {
        viewport.animate({ "transform":"t0,0 s1,1" }, 200);
        zoomed = false;
    });


    svgElement.zpd();
});