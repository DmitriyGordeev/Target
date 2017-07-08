var a = Snap(".can");
var c = a.circle(50, 50, 10);
var r = a.rect(100, 100, 20, 20);

// var g = a.group(c, r);
// g.attr({ fill: "green", background: "yellow" }).drag();

a.drag();