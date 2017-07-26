<?php
include("database_settings.php");
include ("UserPreference.php");

/* testing simple database interaction: */
$mysqli = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
if($mysqli == false) {
    echo "Unable to connect to database: mysqli == false";
    exit();
}

$res = mysqli_query($mysqli, "INSERT INTO users VALUES (NULL, 'AnotherName', 'Another email', '{}')");
