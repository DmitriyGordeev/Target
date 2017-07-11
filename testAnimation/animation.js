
function moveTo(x, y, interval, viewport) {
    var dx = viewport.node.clientWidth / 2 - x;
    var dy = viewport.node.clientHeight / 2 - y;
    viewport.panTo(dx, dy, interval);
}

jQuery(document).ready(function() {

    var jv = jQuery("#viewport");
    var svg = Snap("#viewport");
    svg.zpd();

    var circles = Snap.selectAll("circle");

    moveTo(circles[1].asPX("cx"), circles[1].asPX("cy"), 100, svg);

    setTimeout(function() {
        svg.zoomTo(0.2, 200);
    }, 2000);

    setTimeout(function() {
        moveTo(circles[2].asPX("cx"), circles[2].asPX("cy"), 100, svg);
    }, 4000);


});