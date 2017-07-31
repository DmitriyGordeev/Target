<?php
include("database_settings.php");
session_start();

$mysqli->query("update users SET goal='".$_POST["ta-goal"]."' where email='".$_SESSION["user_email"]."'");
$mysqli->query("update users SET proof='".$_POST["ta-proof"]."' where email='".$_SESSION["user_email"]."'");
$mysqli->query("update users SET date='".$_POST["datepicker"]."' where email='".$_SESSION["user_email"]."'");
$mysqli->query("update users SET penalty='".$_POST["ta-penalty"]."' where email='".$_SESSION["user_email"]."'");
$mysqli->query("update users SET is_set=1 where email='".$_SESSION["user_email"]."'");

$currentDateTime = date("d-m-Y H:m:s:ms");
$mysqli->query("update users SET begin_date='".$currentDateTime."' where email='".$_SESSION["user_email"]."'");

header("Location: main.php");