<?php

// TODO: must be replaced with global params from database_settings.php:
$db_host = "localhost";
$db_user = "root";
$db_pass = "";
$db_name = "db_test";
// --------------------------------------------------------------------


/* testing simple database interaction: */
$mysqli = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
if($mysqli == false) {
    echo "Unable to connect to database: mysqli == false";
    exit();
}


// exit if post unsuccessful:
if(!isset($_POST)) {
    echo "error: unable to receive email";
    exit();
}


$result = $mysqli->query("select * from users where email='".$_POST["user_email"]."'");
$row = $result->fetch_array(MYSQLI_ASSOC);
if($row == false) {
    $insert_query = "insert into users (name, email) values ('', '".$_POST["user_email"]."')";
    $mysqli->query($insert_query);
    header("Location: http://target.com/goalset.html");
    exit();
}


echo $row["name"];


