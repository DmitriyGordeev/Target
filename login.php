<?php

/* testing simple database interaction: */
$mysqli = mysqli_connect("localhost", "root", "", "db_test");
if($mysqli == false) {
    echo "Unable to connect to database: mysqli == false";
    exit();
}

$result = $mysqli->query("select * from users");
$row = $result->fetch_array(MYSQLI_ASSOC);
echo $row["id"]." = ".$row["name"];