<?php
session_start();
setlocale (LC_CTYPE, "ru_RU.UTF-8");

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

$_SESSION["user_email"] = $_POST["user_email"];

$result = $mysqli->query("select * from users where email='".$_POST["user_email"]."'");
$row = $result->fetch_array(MYSQLI_ASSOC);

// if new user: (no such email record)
if($row == false) {
    $insert_query = "insert into users (name, email) values ('', '".$_POST["user_email"]."')";
    $mysqli->query($insert_query);
    header("Location: http://target.com/goalset.php");
    exit();
}

// already signed up user:
else {
    header("Location: main.php");
    exit();
}



