<?php
session_start();
setlocale (LC_CTYPE, "ru_RU.UTF-8");
include "database_settings.php";

// exit if post unsuccessful:
if(!isset($_POST)) {
    echo "error: unable to receive email";
    exit();
}

$_SESSION["user_email"] = $_POST["user_email"];

$result = $mysqli->query("select * from users where email='".$_POST["user_email"]."'");
$row = $result->fetch_array(MYSQLI_ASSOC);

// new user:
if($row == false) {
    $insert_query = "insert into users (name, email) values ('', '".$_POST["user_email"]."')";
    $mysqli->query($insert_query);
    header("Location: goalset.php");
    exit();
}

// already signed user:
else {
    header("Location: main.php");
    exit();
}



