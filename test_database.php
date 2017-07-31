<?php
include("database_settings.php");
include("user_preference.php");


/* testing simple database interaction: */
$mysqli = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
if($mysqli == false) {
    echo "Unable to connect to database: mysqli == false";
    exit();
}

$result = $mysqli->query("select * from users");
$row = $result->fetch_array(MYSQLI_ASSOC);

echo $row["goal_info"];