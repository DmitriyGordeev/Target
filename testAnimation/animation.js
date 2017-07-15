
function moveTo(x, y, interval, viewport) {
    var dx = viewport.node.clientWidth / 2 - x;
    var dy = viewport.node.clientHeight / 2 - y;
    viewport.panTo(dx, dy, interval);
}

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


// returns ending point of timeline:
function timeline(dateA, dateB, x1, x2) {
    var dt = new Date() - dateA;
    return dt * (x2 - x1) / (dateB - dateA);
}

// transform viewport to values:
function lineZoom(x1, x2, y, duration, delta, W, H) {

    var w = (x2 - x1) * (1 + delta);
    var zoomfactor = W / w;
    var h = H / zoomfactor;

    var cx = x1 + (x2 - x1) / 2;
    var cy = y;

    var dx = cx - w / 2;
    var dy = cy - h / 2;

    return "s" + zoomfactor + " t-" + dx + ",-" + dy;
}


jQuery(document).ready(function() {
    var viewport = Snap("svg");
    var group = viewport.select("#canvas");

    var W = jQuery("#viewport").width();
    var H = jQuery("#viewport").height();

    var zoomed = false;

    group.line(400, -1000, 400, 1000).attr({stroke: "black", strokeWidth: 3});
    group.line(-1000, 300, 1000, 300).attr({stroke: "black", strokeWidth: 3});

    jQuery("body").keydown(function() {

        var duration = 200;

        if(zoomed) {
            group.animate({ "transform":"t0,0 s1,1" }, duration);
            setTimeout(function() {
                var mat = group.zpd("save");
                jQuery("#debug").text(mat.e + "   |   " + mat.f);
            }, 500);
            zoomed = false;
        }
        else {

            var line = Snap("#target");

            var transform_query = "s2 t300,0";

            group.animate({ "transform": transform_query }, duration);
            setTimeout(function() {
                var mat = group.zpd("save");
                jQuery("#debug").text(mat.e + "   |   " + mat.f);
            }, 500);
            zoomed = true;
        }

    });

    viewport.zpd();
});