/* Goal Set page functionality */

function onSubmit() {
    var goal = jQuery("textarea[name='ta-goal']").val();
    var proof = jQuery("textarea[name='ta-proof']").val();
    var date = jQuery("input[name='datepicker']").val();
    var penalty = jQuery("textarea[name='ta-penalty']").val();

    if(goal == "" || proof == "" || date == "" || penalty == "") {
        alert("Заполните все поля");
        return false;
    }

    return true;
}

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