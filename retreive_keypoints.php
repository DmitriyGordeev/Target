<?php
    include_once("KeyPoint.php");

    $point_A = new KeyPoint("Some A Data", "Точка А");
    $alpha_keyPoint = new KeyPoint("Some Date Alpha", "Alpha Description from PHP");
    $betta_keyPoint = new KeyPoint("Some Date Betta", "Betta Description");
    $gamma_keyPoint = new KeyPoint("Some Date Gamma", "Gamma Description");
    $point_B = new KeyPoint("Some B Data", "Ваша цель");


    // keypoints:
    $keyPoints = array($point_A, $alpha_keyPoint, $betta_keyPoint, $gamma_keyPoint, $point_B);
    echo json_encode($keyPoints);