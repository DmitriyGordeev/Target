<?php
session_start();
include_once ("encoding.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Goal Set - Project Target </title>
    <link rel="stylesheet" href="style.css" type="text/css">
    <link rel="stylesheet" href="Pikaday-master/css/pikaday.css" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Comfortaa|Exo+2|Forum|Play" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="jquery-ui-1.12.1/jquery-ui.js"></script>
    <script src="Snap.svg-0.5.1/dist/snap.svg-min.js"></script>
    <script src="snap.svg.zpd-master/snap.svg.zpd.js"></script>
    <script src="Pikaday-master/pikaday.js"></script>
    <script src="goalset.js"></script>
    <!--<script src="script.js"></script>-->

</head>

<style type="text/css">

    #outer-container {
        position: relative;
        margin: 0 auto;
        width: 100%;
        top: 25%;
        height: 400px;
    }

    #outer-container > p {
        text-align: center;
        font-size: 23px;
        font-weight: 800;
    }

    #bottom-row {
        height: 175px;
        margin-top: 40px;
    }

    #goal-begin {
        display: block;
        background: #F53240;
        text-decoration: none;
        text-align: center;
        border: none;
        outline: none;
        /*-webkit-border-radius: 3px;*/
        /*-moz-border-radius: 3px;*/
        /*border-radius: 3px;*/
        font-size: 18px;
        color: white;
        width: 180px;
        margin: 90px auto;
        transition-duration: 0.4s;
        padding: 11px 11px;
    }

    #goal-begin:hover {
        background: red;
        transition-duration: 0.4s;
    }

    .element-heading {
        text-decoration: none;
    }

    .element-heading > span {
        border-bottom: 2px solid #39384d;
        font-weight: 800;
        padding: 0 3px;
    }

</style>

<body>

    <div id="outer-container">
        <p>Поставьте цель</p>
        <form method="post" action="test_insert.php">
            <div id="bottom-row">
                    <ul class="ul-horizontal">
                        <li>
                            <div>
                                <p class="element-heading"><span>Цель</span></p>
                                <textarea class="element-description" name="ta-goal" rows="5" placeholder="Например: заработать 100 000 руб"></textarea>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p class="element-heading"><span>Доказательство</span></p>
                                <textarea class="element-description" name="ta-proof" rows="5" placeholder="Например: 10 фотографий поездки"></textarea>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p class="element-heading"><span>Дата</span></p>
                                <!--<textarea class="element-description" name="ta-date" rows="3" placeholder="Например: до 10 июля"></textarea>-->
                                <input class=element-description type="text" name="datepicker" placeholder="Выберите дату">
                                <!--<p class="element-description" id="date_countdown">-->
                                <!--<span class="digit-block" id="days"><span class="inner-digit">12</span><br>дней</span>-->
                                <!--<span class="digit-block"><span class="inner-digit">-</span></span>-->
                                <!--<span class="digit-block" id="hours"><span class="inner-digit">12</span><br>часов</span>-->
                                <!--<span class="digit-block"><span class="inner-digit">-</span></span>-->
                                <!--<span class="digit-block" id="minutes"><span class="inner-digit">12</span><br>минут</span>-->
                                <!--<span class="digit-block"><span class="inner-digit">-</span></span>-->
                                <!--<span class="digit-block" id="seconds"><span class="inner-digit">12</span><br>секунд</span>-->
                                <!--</p>-->
                            </div>
                        </li>
                        <li>
                            <div>
                                <p class="element-heading"><span>Цена слова</span></p>
                                <textarea class="element-description" name="ta-penalty" rows="5" placeholder="Например: отдать Ивану Ивановичу 20 000 руб"></textarea>
                            </div>
                        </li>
                    </ul>
            </div>
            <input id="goal-begin" type="submit" value="Начать достижение">
        </form>
    </div>

</body>
</html>