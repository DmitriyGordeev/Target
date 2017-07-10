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
function highlight_circles() {
    var circles = Snap.selectAll(".dot");

    for(var i = 0; i < circles.length; i++) {
        circles[i].hover(function() {
            this.animate({
                fill: "#fef9ff", strokeWidth: "5px", stroke: "#39384d"
            }, 200);
            sticker(this.asPX("cx"), this.asPX("cy") + 55, "План кинжал \u03B1", "20 звонков потенциальным клиентам");
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

jQuery(document).ready(function() {

    var viewport = Snap("#main-svg-viewport");
    viewport.zpd();

    highlight_circles();

    var picker = new Pikaday({
        field: jQuery("input[name='datepicker']")[0],
        firstDay: 1,
        minDate: new Date(),
        maxDate: new Date(2020, 12, 31),
        yearRange: [2000, 2020],
        onSelect: function () {
            var r = jQuery("#date_countdown");
            setInterval(function () {
                var countdown = date_diff(new Date(), picker.getDate());
                r.text(countdown.d + " : " + countdown.h + " : " + countdown.m + " : " + countdown.s);
            }, 1000);
        }
    });

    /* testing line hover: */
    var lines = Snap.selectAll(".timeline");
    for (var i = 0; i < lines.length; i++) {
        lines[i].hover(function () {
            this.animate({strokeWidth: "8px"}, 200);
        }, function () {
            this.animate({strokeWidth: "4px"}, 200);
        });
    }

    /* testing click: */
    for(var j = 0; j < lines.length; j++)
    {
        lines[j].click(function() {
            var line_cam_center_x = this.asPX("x2") - this.asPX("x1");
            viewport.panTo(line_cam_center_x / 2, 0, 200);
        });
    }



});