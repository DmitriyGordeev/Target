jQuery(document).ready(function() {

    var jv = jQuery("#viewport");

    var svg = Snap("#viewport");
    svg.zpd();

    var cx1 = Snap("circle").asPX("cx");
    var cy1 = Snap("circle").asPX("cy");

    var dx = jv.width() / 2 - cx1;
    var dy = jv.height() / 2 - cy1;

    svg.panTo("10", "1", 300);
});