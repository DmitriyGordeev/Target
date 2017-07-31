/* Goal Set page functionality */

jQuery(document).ready(function() {

    var picker = new Pikaday({
        field: jQuery("input[name='datepicker']")[0],
        format: "DD MMMM YYYY",
        firstDay: 1,
        minDate: new Date(),
        maxDate: new Date(2020, 12, 31),
        yearRange: [2000, 2020],
        onSelect: function () {
        }
    });

});