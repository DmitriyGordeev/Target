<?php
session_start();
include("database_settings.php");
include("user_preference.php");


$result = $mysqli->query("select user_goal_info from users where email='".$_SESSION["user_email"]."'");
$row = $result->fetch_array(MYSQLI_ASSOC);

echo $row["user_goal_info"];