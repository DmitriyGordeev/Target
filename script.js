/* Javascript here: */


/* creates sticker on position (x,y): */
function sticker(x, y, title, description) {

    var stickerDiv = jQuery("<div id='cloud'>");
    stickerDiv.hide();
    stickerDiv.appendTo("body");
    stickerDiv.css({
        // maxWidth: "250px",
        // padding: "5px",
        // position: "absolute",
        top: y,
        left: x
        // fontWeight: "500",
        // background: "#e9f2f0",
        // border: "1px solid #c2c2c2",
        // borderRadius: "3px"
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
            sticker(this.asPX("cx"), this.asPX("cy") + 20, "Title", "Desc");
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

    jQuery(".element-description").click(function() {
        alert("Click Event!");
    });

});


