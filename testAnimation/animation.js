jQuery(document).ready(function() {

    var svg = Snap("#viewport");
    svg.zpd();
    
    svg.zoomTo(2.0, 5000);
    alert("after zoomTo()");
});