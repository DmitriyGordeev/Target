<?php
include("database_settings.php");
include ("UserPreference.php");


/* testing simple database interaction: */
$mysqli = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
if($mysqli == false) {
    echo "Unable to connect to database: mysqli == false";
    exit();
}


$goalInfo = new GoalInfo();
$goalInfo->point_A = new TimePoint("DATE A", "POINT A");
$goalInfo->point_B = new TimePoint("DATE B", "POINT B");
$goalInfo->point_alpha = new TimePoint("DATE ALPHA", "POINT ALPHA");
$goalInfo->point_betta = new TimePoint("DATE BETTA", "POINT BETTA");
$goalInfo->point_gamma = new TimePoint("DATE GAMMA", "POINT GAMMA");

file_put_contents("goal_info_example.json", json_encode($goalInfo));