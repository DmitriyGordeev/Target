
function moveTo(x, y, interval, viewport) {
    var dx = viewport.node.clientWidth / 2 - x;
    var dy = viewport.node.clientHeight / 2 - y;
    viewport.panTo(dx, dy, interval);
}

jQuery(document).ready(function() {

    var jv = jQuery("#viewport");
    var svg = Snap("#viewport");
    svg.zpd();
    
    var lines = Snap.selectAll(".timeline");
    for(var i = 0; i < lines.length; i++)
    {
        lines[i].click(function() {
            var center_x = (this.asPX("x2") - this.asPX("x1")) / 2;
            moveTo(center_x + this.asPX("x1"), this.asPX("y1"), 300, svg);
            setTimeout(function() {
                svg.zoomTo(2.0, 200);
            }, 300);
        });
    }

});