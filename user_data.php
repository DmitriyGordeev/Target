<?php
    include_once("KeyPoint.php");

    $alpha_keyPoint = new KeyPoint("Some Date Alpha", "Alpha Description");
    $betta_keyPoint = new KeyPoint("Some Date Betta", "Betta Description");
    $gamma_keyPoint = new KeyPoint("Some Date Gamma", "Gamma Description");


    // keypoints:
    $keyPoints = array($alpha_keyPoint, $betta_keyPoint, $gamma_keyPoint);
    echo json_encode($keyPoints);