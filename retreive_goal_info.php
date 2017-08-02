<?php
/*
 * Retreives user_goal_info data from specified row
 * in database. Neeeded for assigning particular values
 * to "plan-knife" description, date and task list
 */

session_start();
include_once "database_settings.php";

$query_result = $mysqli->query("select user_goal_info from users where email='".$_SESSION["user_email"]."'");

$query_data = $query_result->fetch_array(MYSQLI_ASSOC);
echo $query_data["user_goal_info"];
