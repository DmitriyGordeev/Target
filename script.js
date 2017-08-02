/* Javascript here: */

var keypoints = [];
var g_line_id = "";
var g_user_goal_object = null;

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

/* circle cloud appearance: */
function circle_popup(viewport, circleObject, title, desc) {
    circleObject.hover(function() {
            this.animate({
                fill: "#fef9ff", strokeWidth: "5px", stroke: "#39384d"
            }, 200);

            // recalculating cloud coordinates:
            var mat = viewport.zpd("save");
            var newx = this.asPX("cx") * mat.a + mat.e;
            var newy = this.asPX("cy") * mat.a + mat.f;

            sticker(newx, newy + 55, title, desc);
        }, function() {
            this.animate({fill: "#39384d", strokeWidth: "0px"}, 200);
            jQuery("#cloud").hide(200, function() {
                jQuery("#cloud").remove();
            });
        });
}

/* highlights circles when hovering: */
function highlight_circles(viewport, keyPoints) {

    var pointA_circle = Snap.select("#pointA");
    circle_popup(viewport, pointA_circle, keyPoints.point_A.date, keyPoints.point_A.description);

    var alphaCircle = Snap.select("#alpha");
    circle_popup(viewport, alphaCircle, "Alpha Title", keyPoints.point_alpha.description);

    var bettaCircle = Snap.select("#betta");
    circle_popup(viewport, bettaCircle, "Betta Title", keyPoints.point_betta.description);

    var gammaCircle = Snap.select("#gamma");
    circle_popup(viewport, gammaCircle, "Gamma Title", keyPoints.point_gamma.description);

    var pointB_circle = Snap.select("#pointB");
    circle_popup(viewport, pointB_circle, "Точка B", keyPoints.point_B.description);

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

// obtain keypoints objects from server as json:
function get_keypoints(viewport) {
    jQuery.post("test_database.php", function(result) {
        keypoints = JSON.parse(result);
        highlight_circles(viewport, keypoints);
    });
}

// get dates from server:
function retreive_dates(viewport, x1, x2, y) {
    jQuery.post("retreive_dates.php", function(result) {
        var datesPair = JSON.parse(result);
        var dateObject = moment(datesPair.date, 'DD MMMM YYYY').toDate();
        var beginDateObject = moment(datesPair.begin_date, 'DD MMMM YYYY').toDate();

        var datePicker = new Pikaday({
            field: jQuery("input[name='datepicker']")[0],
            format: "DD MMMM YYYY",
            defaultDate: dateObject,
            setDefaultDate: dateObject
        });
        jQuery(".digit-block").css("visibility", "visible");

        // refresh timeline drawing each second:
        setInterval(function () {
            var countdown = date_diff(new Date(), dateObject);

            jQuery("#days .inner-digit").text(countdown.d);
            jQuery("#hours .inner-digit").text(countdown.h);
            jQuery("#minutes .inner-digit").text(countdown.m);
            jQuery("#seconds .inner-digit").text(countdown.s);

            var endingPos = timeline(beginDateObject, dateObject, x1, x2);
            viewport.line(x1, y, x1 + endingPos, y).attr({stroke: "black", strokeWidth: 4});

        }, 1000);

    });
}

/* some experiments and tests: */
function expTest() {
    
    // jQuery.ajax({
    //     url: "test_js_accept.php",
    //     type: "post",
    //     data: { userID : "stupid user id here ... : (" }
    // });
    
}

// assign events to elements which write data to database:
function writeDatabaseEvents() {

    // overwrites plan description (database):
    jQuery("#btn-change-plan-description").click(function() {

        var plan_desc_data = jQuery("#plan-container > textarea").val();
        g_user_goal_object[g_line_id].description = plan_desc_data;

        jQuery.ajax({
            url: "test_js_accept.php",
            type: "post",
            data: { user_goal_info: JSON.stringify(g_user_goal_object) }
        });
    });


}

jQuery(document).ready(function() {
    
    expTest();

    writeDatabaseEvents();

    // load and parse user_goal_info from database:
    jQuery.post("retreive_goal_info.php", function(result) {
        g_user_goal_object = JSON.parse(result);
    });

    var zoomed = false;
    var W = jQuery("#main-svg-viewport").width();
    var H = jQuery("#main-svg-viewport").height();

    var svgElement = Snap("#main-svg-viewport");
    var viewport = svgElement.select("#canvas");

    // get keypoints objects from server:
    get_keypoints(viewport);

    // define pointA cx and pointB cx:
    var x1 = Snap("#pointA").asPX("cx");
    var x2 = Snap("#pointB").asPX("cx");
    var y = Snap("#pointA").asPX("cy");

    retreive_dates(viewport, x1, x2, y);

    // line hover:
    var lines = viewport.selectAll(".timeline");
    for (var i = 0; i < lines.length; i++) {
        lines[i].hover(function () {
            this.animate({strokeWidth: "8px"}, 100);
        }, function () {
            this.animate({strokeWidth: "4px"}, 200);
        });
    }

    // line click:
    for(var j = 0; j < lines.length; j++) {
        lines[j].click(function() {
            var current_line = this;
            g_line_id = current_line.attr("id");

            // get line positions:
            var x1 = current_line.asPX("x1");
            var x2 = current_line.asPX("x2");

            var duration = 300;

            var transform_query = "";
            var dx = 0;

            // zooming stuff:
            // delta needed for left & right circles margin of zoomed viewport
            var delta = 0.3;
            var w = (x2 - x1) * (1 + delta);
            var zoomfactor = W / w;

            if(zoomed) {
                viewport.animate({ "transform":"t0,0 s1,1" }, 200);
                zoomed = false;

                // swipe #plan-container to #bottom-row:
                jQuery("#bottom-row > .ul-horizontal").animate({width: "100%", opacity: 1}, duration);
                jQuery("#plan-container").animate({width: 0, opacity: 0}, duration);

                // hide task menu (#section-menu) to right:
                jQuery("#section-menu").animate({width: 0, opacity: 0}, duration);
                jQuery("#section-main").animate({width: "100%"}, duration);

                // remove all <li> from tasklist:
                jQuery("#section-menu > ul").empty();
                g_line_id = "";
            }
            else {

                // swipe #bottom-row to #plan-container:
                jQuery("#bottom-row > .ul-horizontal").animate({width: 0, opacity: 0}, duration);
                jQuery("#plan-container").animate({width: "100%", opacity: 1}, duration);

                // swipe task menu (#section-menu) from right:
                jQuery("#section-main").animate({width: "75%"}, duration);
                jQuery("#section-menu").animate({width: "25%", opacity: 1}, duration);

                // svg animation:
                setTimeout(function() {

                    // 0.75 - hardcoded value because #main-svg-viewport
                    // decreased to 75% of its normal width
                    // TODO: refactor hardcode

                    dx = 0.75 * (W - x2 - x1) / 2;
                    transform_query = "s" + zoomfactor + " t" + dx + "," + 0;
                    viewport.animate({ "transform": transform_query }, duration);
                }, duration);

                // TODO: refactor transform_query usage (should not be empty):
                transform_query = "";
                zoomed = true;


                // assign data to plan-container (Plan Description)
                jQuery("#plan-container > textarea").val(g_user_goal_object[g_line_id].description);
                var tasklist = g_user_goal_object[g_line_id].tasklist;
                var tasklistElement = jQuery("#section-menu > ul");
                for(var i = 0; i < tasklist.length; i++) {
                    tasklistElement.append("<li>" + tasklist[i] + "</li>");
                }

            }

            viewport.animate({ "transform": transform_query }, duration);

        });
    }

    // on return click:
    jQuery("#return").click(function() {
        viewport.animate({ "transform":"t0,0 s1,1" }, 200);
        zoomed = false;
    });

    svgElement.zpd({pan: false, zoom: false});
});