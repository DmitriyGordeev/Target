<?php
session_start();
include_once "database_settings.php";

if(isset($_POST["user_goal_info"])) {
    $query_string = "update users set user_goal_info='".$_POST["user_goal_info"]."' where email='".$_SESSION["user_email"]."'";
    $mysqli->query($query_string);
}


//file_put_contents("new_goal_info.txt", $_POST["user_goal_info"]);