/* Javascript here: */

// attach click event to dynamic add or remove task object:
$(document).on('click', '#tasklist li', function(){
    var item = jQuery(this);

    if(jQuery(this).data("selected")) {
        jQuery(this).css({background: "white"});
        jQuery(this).data("selected", false);
    }
    else {
        jQuery(this).css({background: "#eeeeee"});
        jQuery(this).data("selected", true);
    }

});

var keypoints = [];
var g_line_id = "";
var g_user_goal_object = null;

// needed for recalc positions while zooming:
var width_scale = 1;

/* initial page preferences: */
function init() {

    // hide #plan-container:
    jQuery("#plan-container").toggle();

    // hide #section-menu:
    jQuery("#section-menu").toggle();

}

/* draws date marks onto circles: */
function dateMark(viewport) {
    var circles = Snap.selectAll("#canvas circle");

    // timeout due to server delay:
    setTimeout(function() {
        for(var i = 0; i < circles.length; i++) {
            var c_id = circles[i].attr("id");
            c_id = c_id.replace("point_", "");
            viewport.text(circles[i].attr("cx"), "45%", g_user_goal_object[c_id].date)
                .attr({
                    "font-size" : "14",
                    "class" : "date-mark",
                    "id" : c_id + "-date-mark"
                });
        }
    }, 1000);

}

/* creates sticker on position (x,y): */
function sticker(x, y, title, description) {

    var stickerDiv = jQuery("<div id='cloud'>");
    stickerDiv.hide();
    stickerDiv.appendTo("body");
    stickerDiv.css({ top: y, left: x });

    var cloudTitle = jQuery("<p class='cloud-title'>" + title + "</p>");
    var cloudDesc = jQuery("<p class='cloud-description'>" + description + "</p>");

    cloudTitle.appendTo("#cloud");
    cloudDesc.appendTo("#cloud");

    stickerDiv.fadeIn(300);
}

/* circle cloud appearance: */
function circle_popup(viewport, circleObject, title, desc) {
    circleObject.hover(function() {
            this.animate({
                fill: "#39384d",
                r: "5px",
                strokeWidth: "10px",
                stroke: "#39384d"
            }, 200);

            // recalculating cloud coordinates:
            var mat = viewport.zpd("save");
            var newx = this.asPX("cx") * mat.a + mat.e;
            var newy = this.asPX("cy") * mat.a + mat.f;

            sticker(newx, newy + 40, title, desc);
        }, function() {
            this.animate({fill: "#39384d", strokeWidth: "0px"}, 200);
            jQuery("#cloud").fadeOut(200, function() {
                jQuery("#cloud").remove();
            });
        });
}

/* highlights circles when hovering: */
function highlight_circles(viewport, keyPoints) {
    
    var pointA_circle = Snap.select("#point_A");
    circle_popup(viewport, pointA_circle, "Точка А", keyPoints.A.description);

    var alphaCircle = Snap.select("#point_alpha");
    circle_popup(viewport, alphaCircle, "План-кинжал 1", keyPoints.alpha.description);

    var bettaCircle = Snap.select("#point_betta");
    circle_popup(viewport, bettaCircle, "План-кинжал 2", keyPoints.betta.description);

    var gammaCircle = Snap.select("#point_gamma");
    circle_popup(viewport, gammaCircle, "План-кинжал 3", keyPoints.gamma.description);

    var pointB_circle = Snap.select("#point_B");
    circle_popup(viewport, pointB_circle, "Цель - точка B", keyPoints.B.description);

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

            var p = (endingPos + x1) / jQuery("#main-svg-viewport").width();
            Snap("#timeline-rect").attr({ width: width_scale * p * 100 + "%"});
            Snap("#timeline-now-mark").attr({x: width_scale * p * 100 + 1 + "%"});

        }, 1000);

    });
}

// assign events to elements which write data to database:
function writeDatabaseEvents() {

    // overwrites plan description (database):
    jQuery("#btn-change-plan-description").click(function() {

            var plan_desc_data = jQuery("#plan-container > textarea").val();
            g_user_goal_object[g_line_id].description = plan_desc_data;

            jQuery.ajax({
                url: "refresh-database.php",
                type: "post",
                data: { user_goal_info: JSON.stringify(g_user_goal_object) }
            });
    });

    // add new task to tasklist:
    jQuery("#add-task-container > .small-button-confirm").click(function() {
        var task_data = jQuery("#add-task-container > input").val();
        if(!task_data) {
            alert("Название задачи не должно быть пустым");
            return;
        }

        jQuery("#section-menu > ul").append("<li>" + task_data + "</li>");
        jQuery("#add-task-container > input").val("");
        g_user_goal_object[g_line_id].tasklist.push(task_data);

        jQuery.ajax({
            url: "refresh-database.php",
            type: "post",
            data: { user_goal_info: JSON.stringify(g_user_goal_object) }
        });

    });

    // remove selected task from tasklist:
    jQuery("#button-remove-tasks").click(function() {
        var task_item_array = jQuery("#tasklist li");

        // TODO: refactor very ugly removing element from array:
        var new_taskarray = [];
        for(var i = 0; i < task_item_array.length; i++) {
            if(task_item_array.eq(i).data("selected")) {
                task_item_array.eq(i).addClass("to-remove");
            }
            else {
                new_taskarray.push(g_user_goal_object[g_line_id].tasklist[i]);
            }
        }

        jQuery(".to-remove").remove();
        g_user_goal_object[g_line_id].tasklist = new_taskarray;

        // send fresh data to server:
        jQuery.ajax({
            url: "refresh-database.php",
            type: "post",
            data: { user_goal_info: JSON.stringify(g_user_goal_object) }
        });
    });

    // #plan-datepicker date selection:
    var planDatePicker = new Pikaday({
        field: jQuery("input[name='plan-datepicker']")[0],
        format: "DD MMMM YYYY",
        firstDay: 1,
        minDate: new Date(),
        maxDate: new Date(2020, 12, 31),
        yearRange: [2000, 2020],
        onSelect: function () {
            var date_val = jQuery("input[name='plan-datepicker']").val();

            g_user_goal_object[g_line_id].date = date_val;
            jQuery("#" + g_line_id + "-date-mark").text(date_val);

            // send fresh data to server:
            jQuery.ajax({
                url: "refresh-database.php",
                type: "post",
                data: { user_goal_info: JSON.stringify(g_user_goal_object) }
            });
        }
    });

}


///////////////////////////////////////////////////////////////////////////////////
jQuery(document).ready(function() {

    init();

    // load and parse user_goal_info from database:
    jQuery.post("retreive_goal_info.php", function(result) {
        g_user_goal_object = JSON.parse(result);
    });

    Snap("#timeline-now-mark").attr({"font-size" : "14"});

    writeDatabaseEvents();

    // make tasklist sortbale with jQuery-ui
    // and refresh database record of tasks order:
    jQuery("#section-menu > ul").sortable({
        stop: function(event, ui) {

            var li_array = jQuery(this).children("li");
            var tasklist_string_array = [];
            for(var i = 0; i < li_array.length; i++) {
                tasklist_string_array.push(li_array.eq(i).text());
            }

            g_user_goal_object[g_line_id].tasklist = tasklist_string_array;

            jQuery.ajax({
                url: "refresh-database.php",
                type: "post",
                data: { user_goal_info: JSON.stringify(g_user_goal_object) }
            });
        }
    });

    var zoomed = false;
    var W = jQuery("#main-svg-viewport").width();
    var H = jQuery("#main-svg-viewport").height();

    var svgElement = Snap("#main-svg-viewport");
    var viewport = svgElement.select("#canvas");

    dateMark(viewport);

    setTimeout(function() {
        highlight_circles(viewport, g_user_goal_object);
    }, 1500);


    // get keypoints objects from server:
    // get_keypoints(viewport);

    // define pointA cx and pointB cx:
    var x1 = Snap("#point_A").asPX("cx");
    var x2 = Snap("#point_B").asPX("cx");
    var y = Snap("#point_A").asPX("cy");

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
            g_line_id = g_line_id.replace("line_", "");

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
                jQuery("#bottom-row > .ul-horizontal").toggle();
                jQuery("#bottom-row > .ul-horizontal").animate({width: "100%", opacity: 1}, duration);
                jQuery("#plan-container").animate({width: 0, opacity: 0}, duration, function() {
                    jQuery(this).toggle();
                });

                // hide task menu (#section-menu) to right:
                jQuery("#section-menu").animate({width: 0, opacity: 0}, duration, function() {
                    jQuery(this).toggle();
                });
                jQuery("#section-main").animate({width: "100%"}, duration);

                // TODO: refactor hardcoded value:
                width_scale = 1;

                // remove all <li> from tasklist:
                jQuery("#section-menu > ul").empty();
                g_line_id = "";

                // increase date marks font-size to initial value:
                Snap.selectAll(".date-mark").animate({
                    "font-size": "14px",
                    "y": "45%"
                }, duration);

                Snap.select("#timeline-now-mark").animate({
                    "font-size": "14px",
                    "y": "30px"
                }, duration);
            }
            else {

                // swipe #bottom-row to #plan-container:
                jQuery("#bottom-row > .ul-horizontal").animate({width: 0, opacity: 0}, duration, function() {
                    jQuery(this).toggle();
                });
                jQuery("#plan-container").toggle();
                jQuery("#plan-container").css({ background: current_line.attr("stroke")});
                jQuery("#plan-container").animate({width: "100%", opacity: 1 }, duration);

                // swipe task menu (#section-menu) from right:
                jQuery("#section-main").animate({width: "75%"}, duration);
                jQuery("#section-menu").toggle();
                jQuery("#section-menu").animate({width: "25%", opacity: 1}, duration);

                // TODO: refactor hardcoded value:
                width_scale = 0.75;

                // svg animation:
                setTimeout(function() {

                    // 0.75 - hardcoded value because #main-svg-viewport
                    // decreased to 75% of its normal width
                    // TODO: refactor hardcode

                    dx = 0.75 * (W - x2 - x1) / 2 - 40;
                    transform_query = "s" + zoomfactor + " t" + dx + "," + 0;
                    viewport.animate({ "transform": transform_query }, duration);

                    // animate texts on svg:
                    Snap.selectAll(".date-mark").animate({
                        "font-size": "5px",
                        "y": "47%"
                    }, duration);

                    Snap.select("#timeline-now-mark").animate({
                        "font-size": "5px",
                        "y": "40%"
                    }, duration);

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
            jQuery("input[name='plan-datepicker']").val(g_user_goal_object[g_line_id].date);
        });
    }

    // on return click:
    jQuery("#return").click(function() {
        viewport.animate({ "transform":"t0,0 s1,1" }, 200);
        zoomed = false;
    });

    svgElement.zpd({pan: false, zoom: false});
});