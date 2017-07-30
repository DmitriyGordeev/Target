/* Goal Set page functionality */

jQuery(document).ready(function() {

    var picker = new Pikaday({
        field: jQuery("input[name='datepicker']")[0],
        firstDay: 1,
        minDate: new Date(),
        maxDate: new Date(2020, 12, 31),
        yearRange: [2000, 2020],
        onSelect: function () {
            // var r = jQuery("#date_countdown");
            // jQuery(".digit-block").css("visibility", "visible");
        }
    });


});