<?php




/* testing simple database interaction: */
$mysqli = mysqli_connect("127.0.0.1", "root", "123", "goal_service");
$res = mysqli_query($mysqli, "select * from users");
$row = mysqli_fetch_assoc($res);
echo $row['id']." : ".$row['name']." : ".$row['email'];
