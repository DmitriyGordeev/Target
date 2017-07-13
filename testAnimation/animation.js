
function moveTo(x, y, interval, viewport) {
    var dx = viewport.node.clientWidth / 2 - x;
    var dy = viewport.node.clientHeight / 2 - y;
    viewport.panTo(dx, dy, interval);
}


jQuery(document).ready(function() {

    var svg = Snap("svg");
    svg.zpd();

    var lines = Snap.selectAll("line");
    for(var i = 0; i < lines.length; i++) {
        lines[i].click(function() {

            var current_line = this;

            setTimeout(function() {
                svg.zoomTo(2, 300);
            }, 300);
            setTimeout(function() {
                svg.zoomTo(1, 300);
            }, 300);


            // setTimeout(function() {
            //     var mat = svg.zpd("save");
            //     var center_x = (current_line.asPX("x2") - current_line.asPX("x1")) / 2;
            //     jQuery("#debug").text("mat.a = " + mat.a);
            //     moveTo(mat.a * (center_x + current_line.asPX("x1")), mat.a * current_line.asPX("y1"), 300, svg);
            // }, 300);


        });
    }

});