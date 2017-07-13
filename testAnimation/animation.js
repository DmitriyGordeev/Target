
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

jQuery(document).ready(function() {
    var svg = Snap("svg");

    var line = Snap("line");
    var x1 = line.asPX("x1");
    var x2 = line.asPX("x2");

    var dateA = new Date() - 120000;
    var dateB = dateA + 240000;

    setInterval(function() {
        var endingPos = timeline(dateA, dateB, x1, x2);
        svg.line(x1, line.asPX("y1"), x1 + endingPos, line.asPX("y1")).attr({stroke: "white", strokeWidth: 4});
    }, 1000);

    svg.zpd();
});