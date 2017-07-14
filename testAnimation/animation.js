
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
function lineZoom(x1, x2, y1, y2, duration) {




}


jQuery(document).ready(function() {
    var viewport = Snap("svg");
    var group = viewport.select("#canvas");

    var W = jQuery("#viewport").width();
    var H = jQuery("#viewport").height();

    var zoomed = false;

    jQuery("body").keydown(function() {

        var duration = 300;

        if(zoomed) {
            group.animate({ "transform":"t0,0 s1,1" }, duration);
            zoomed = false;
        }
        else {

            var line = Snap("#target");

            // get line positions:
            var x1 = line.asPX("x1");
            var x2 = line.asPX("x2");
            var y = line.asPX("y1");

            // calculating coords:
            var delta = 0.2;
            var zoomfactor = W / (x2 - x1) * (1 - delta);

            var tx = -x1 + (x2 - x1) * delta / 2;
            var ty = -y + H / zoomfactor / 2;

            var transform_query = "s" + zoomfactor + " t" + tx + "," + ty;

            group.animate({ "transform":transform_query }, duration);
            zoomed = true;
        }

    });

    viewport.zpd();
});