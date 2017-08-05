<?php

/* database presets: */
$db_host = "127.0.0.1";
$db_user = "root";
$db_pass = "";
$db_name = "db_test";

$mysqli = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
if($mysqli == false) {
    echo "Unable to connect to database: mysqli == false";
    exit();
}

$mysqli->set_charset('utf8');
$mysqli->query("SET NAMES UTF8");
$mysqli->query("CHARSET 'utf8'");
