<?php
session_start();
include_once ("database_settings.php");

$query_result = $mysqli->query("select date, begin_date from users where email='".$_SESSION["user_email"]."'");
$query_data = $query_result->fetch_array(MYSQLI_ASSOC);

class DatesObject {
    public $date;
    public $begin_date;
}

$dates_object = new DatesObject();
$dates_object->date = $query_data["date"];
$dates_object->begin_date = $query_data["begin_date"];

echo json_encode($dates_object);
