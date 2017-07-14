
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

jQuery(document).ready(function() {
    var svg = Snap("svg");

    var circle = Snap("circle");
    circle.hover(function() {
        this.attr({fill: "red"});

        var mat = svg.zpd("save");
        var newx = this.asPX("cx") * mat.a + mat.e;
        var newy = this.asPX("cy") * mat.a + mat.f;

        sticker(newx, newy, "Title", "Description");

    }, function() {
        this.attr({fill: "blue"});
        jQuery("#cloud").hide(200, function() {
            jQuery("#cloud").remove();
        });
    });


    jQuery("body").keydown(function(event) {
        var mat = svg.zpd("save");
        jQuery("#debug").text(mat.e + " : " + mat.f + " | mat.a:" + mat.a + " | mat.d: " + mat.d);
    });


    svg.zpd();
});