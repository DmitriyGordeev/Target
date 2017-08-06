<?php
session_start();
include_once "database_settings.php";

$query_result = $mysqli->query("select * from users where email='".$_SESSION["user_email"]."'");

$query_data = $query_result->fetch_array(MYSQLI_ASSOC);
echo json_encode($query_data);