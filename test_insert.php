<?php
include("database_settings.php");
session_start();

//$db_host = "localhost";
//$db_user = "root";
//$db_pass = "";
//$db_name = "db_test";
//// --------------------------------------------------------------------
//
///* testing simple database interaction: */
//$mysqli = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
//if($mysqli == false) {
//    echo "Unable to connect to database: mysqli == false";
//    exit();
//}

$mysqli->query("update users SET goal='".$_POST["ta-goal"]."' where email='".$_SESSION["user_email"]."'");
$mysqli->query("update users SET proof='".$_POST["ta-proof"]."' where email='".$_SESSION["user_email"]."'");
$mysqli->query("update users SET date='".$_POST["datepicker"]."' where email='".$_SESSION["user_email"]."'");
$mysqli->query("update users SET penalty='".$_POST["ta-penalty"]."' where email='".$_SESSION["user_email"]."'");
$mysqli->query("update users SET is_set=1 where email='".$_SESSION["user_email"]."'");

header("Location: main.php");