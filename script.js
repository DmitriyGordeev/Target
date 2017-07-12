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

function moveTo(x, y, interval, viewport) {
    var dx = viewport.node.clientWidth / 2 - x;
    var dy = viewport.node.clientHeight / 2 - y;
    viewport.panTo(dx, dy, interval);
}

jQuery(document).ready(function() {

    var viewport = Snap("#main-svg-viewport");
    viewport.zpd({ pan: false, zoom: false, touch: false });
    var originMat = viewport.zpd("save");

    highlight_circles();

    var picker = new Pikaday({
        field: jQuery("input[name='datepicker']")[0],
        firstDay: 1,
        minDate: new Date(),
        maxDate: new Date(2020, 12, 31),
        yearRange: [2000, 2020],
        onSelect: function () {
            var r = jQuery("#date_countdown");
            jQuery(".digit-block").css("visibility", "visible");

            setInterval(function () {
                var countdown = date_diff(new Date(), picker.getDate());

                jQuery("#days .inner-digit").text(countdown.d);
                jQuery("#hours .inner-digit").text(countdown.h);
                jQuery("#minutes .inner-digit").text(countdown.m);
                jQuery("#seconds .inner-digit").text(countdown.s);

            }, 1000);
        }
    });

    if(!picker.isSelected) {
        jQuery(".digit-block").css("visibility", "hidden");
    }



    /* testing line hover: */
    var lines = Snap.selectAll(".timeline");
    for (var i = 0; i < lines.length; i++) {
        lines[i].hover(function () {
            this.animate({strokeWidth: "8px"}, 100);
        }, function () {
            this.animate({strokeWidth: "4px"}, 200);
        });
    }


    /* testing click: */
    for(var j = 0; j < lines.length; j++)
    {
        lines[j].click(function() {

            var current_line = this;

            /* first: zooming */
            viewport.zoomTo(3, 300);

            setTimeout(function() {
                var mat = viewport.zpd("save");

                var center_x = (current_line.asPX("x2") - current_line.asPX("x1")) / 2;
                moveTo(mat.a * (center_x + current_line.asPX("x1")), mat.a * current_line.asPX("y1"), 300, viewport);
            }, 300);

            setInterval(function() {
                viewport.zoomTo(1, 300);
                setInterval(function() {
                    viewport.panTo(0, 0, 300);
                }, 2000);
            }, 2000);

        });
    }

});