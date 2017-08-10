<?php
session_start();
include_once ("encoding.php");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Поставьте свою цель!</title>
    <link rel="stylesheet" href="style.css" type="text/css">
    <link rel="stylesheet" href="Pikaday-master/css/pikaday.css" type="text/css">
    <link href="https://fonts.googleapis.com/css?family=Comfortaa|Exo+2|Forum|Play" rel="stylesheet">
    <script src="jquery-3.2.1.min.js"></script>
    <script src="jquery-ui-1.12.1/jquery-ui.js"></script>
    <script src="Snap.svg-0.5.1/dist/snap.svg-min.js"></script>
    <script src="snap.svg.zpd-master/snap.svg.zpd.js"></script>
    <script src="moment-with-locales.js"></script>
    <script src="Pikaday-master/pikaday.js"></script>
    <script src="goalset.js"></script>

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
        font-size: 18px;
        color: white;
        width: 180px;
        margin: 90px auto;
        transition-duration: 0.4s;
        padding: 11px 11px;
        box-sizing: content-box;
    }

    #goal-begin:hover {
        background: red;
        transition-duration: 0.4s;
    }

    .element-heading {
        text-decoration: none;
    }

</style>

<body>

    <div id="outer-container">
        <p>Поставьте цель</p>
        <form method="post" action="insert_user.php">
            <div id="bottom-row">
                    <ul class="ul-horizontal">
                        <li>
                            <div>
                                <p class="element-heading"><span>Цель</span></p>
                                <textarea class="element-description" name="ta-goal" rows="4" placeholder="Например: заработать 100 000 руб"></textarea>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p class="element-heading"><span>Доказательство</span></p>
                                <textarea class="element-description" name="ta-proof" rows="4" placeholder="Например: 10 фотографий поездки"></textarea>
                            </div>
                        </li>
                        <li>
                            <div>
                                <p class="element-heading"><span>Дата</span></p>
                                <input class=element-description type="text" name="datepicker" placeholder="Выберите дату">
                            </div>
                        </li>
                        <li>
                            <div>
                                <p class="element-heading"><span>Цена слова</span></p>
                                <textarea class="element-description" name="ta-penalty" rows="4" placeholder="Например: отдать 20 000 руб неприятному человеку"></textarea>
                            </div>
                        </li>
                    </ul>
            </div>
            <input id="goal-begin" type="submit" value="Начать достижение">
        </form>
    </div>

</body>
</html>