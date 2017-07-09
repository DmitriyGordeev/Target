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
            sticker(this.asPX("cx"), this.asPX("cy") + 25, "План кинжал \u03B1", "20 звонков потенциальным клиентам");
        }, function() {
            this.animate({fill: "#39384d", strokeWidth: "0px"}, 200);
            jQuery("#cloud").hide(200, function() {
                jQuery("#cloud").remove();
            });
        });
    }
}


jQuery(document).ready(function() {
    highlight_circles();
});


