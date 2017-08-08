<?php
session_start();
include_once("KeyPoint.php");
include_once("database_settings.php");
include_once ("encoding.php");


// retreive data from database with $_SESSION[user_email]:
$query_result = $mysqli->query("select * from users where email='".$_SESSION["user_email"]."'");
$query_data = $query_result->fetch_array(MYSQLI_ASSOC);


class MainViewportPage {
    public function __construct($goal, $proof, $date, $penalty, $user_goal_info) {
        $this->goalData = $goal;
        $this->proofData = $proof;
        $this->date = $date;
        $this->penaltyData = $penalty;
        $this->user_goal_info_object = json_decode($user_goal_info);

    }

    /* methods: */
    public function generate() {
         return "<!DOCTYPE html>
        \n<html lang=\"ru\">\n"
             .$this->head().
             $this->body().
             "</html>\n";
    }

    /* main tags: */
    public function head() {
        $head_string = "<head>
                <meta http-equiv=\"Content-type\" content=\"text/html; charset=utf-8\" />
                <title> MainPage | Goal </title>";

        $head_string = $head_string.$this->styles().$this->scripts()."</head>";
        return $head_string;
    }
    public function body() {

        $body_string =
            "<body>
            <div id=\"main-container\">".
            //$this->topMenu().
            "<section id=\"section-main\">".
                $this->svgViewport().
                $this->bottomGoalDescription().
            "</section>".
            "<section id=\"section-menu\">".
                $this->sectionMenu().
            "</section>
            </div>
            </body>";

        return $body_string;
    }

    /* head links: */
    public function styles() {
        $styles_string =
            "<link rel=\"stylesheet\" href=\"style.css\" type=\"text/css\">
            <link rel=\"stylesheet\" href=\"Pikaday-master/css/pikaday.css\" type=\"text/css\">
            <link href=\"https://fonts.googleapis.com/css?family=Comfortaa|Exo+2|Forum|Play\" rel=\"stylesheet\">";

        return $styles_string;
    }
    public function scripts() {
        $scripts_string =
            "<script src=\"jquery-3.2.1.min.js\"></script>
            <script src=\"jquery-ui-1.12.1/jquery-ui.js\"></script>
            <script src=\"Snap.svg-0.5.1/dist/snap.svg-min.js\"></script>
            <script src=\"snap.svg.zpd-master/snap.svg.zpd.js\"></script>
            <script src=\"moment-with-locales.js\"></script>
            <script src=\"Pikaday-master/pikaday.js\"></script>
            <script src=\"script.js\"></script>";

        return $scripts_string;
    }

    /* body content: */
    public function topMenu() {
        return "<header>
                    <ul id=\"top-menu\">
                        <li><a href=\"testAnimation/animation.html\">AnimationTest</a></li>
                        <li>Two</li>
                        <li>Three</li>
                    </ul>
                </header>";
    }
    public function svgViewport() {
        return
            "<svg id=\"main-svg-viewport\">
                <g id=\"canvas\">
                    <rect id='timeline-rect' x='0' y='0' width='0px' height='100%' fill='#8cadac'></rect>
                    <text id='timeline-now-mark' x='0' y='30' font-size='10px' fill='#F53240'>Время идет!</text>
                
                    <line id=\"line_alpha\" class=\"timeline\" x1=\"10%\" y1=\"50%\" x2=\"30%\" y2=\"50%\" stroke=\"#F53240\" stroke-width=\"4px\"></line>
                    <line id=\"line_betta\" class=\"timeline\" x1=\"30%\" y1=\"50%\" x2=\"50%\" y2=\"50%\" stroke=\"#02c8a7\" stroke-width=\"4px\"></line>
                    <line id=\"line_gamma\" class=\"timeline\" x1=\"50%\" y1=\"50%\" x2=\"70%\" y2=\"50%\" stroke=\"#7CDBD5\" stroke-width=\"4px\"></line>
                    <line id=\"line_B\" class=\"timeline\" x1=\"70%\" y1=\"50%\" x2=\"90%\" y2=\"50%\" stroke=\"#F9BE02\" stroke-width=\"4px\"></line>

                    <circle id=\"point_A\" class=\"dot\" cx=\"10%\" cy=\"50%\" r=\"5\" fill=\"#39384d\"></circle>
                    <circle id=\"point_B\" class=\"dot\" cx=\"90%\" cy=\"50%\" r=\"7\" fill=\"#39384d\"></circle>

                    <circle id=\"point_alpha\" class=\"dot\" cx=\"30%\" cy=\"50%\" r=\"5\" fill=\"#39384d\"></circle>
                    <circle id=\"point_betta\" class=\"dot\" cx=\"50%\" cy=\"50%\" r=\"5\" fill=\"#39384d\"></circle>
                    <circle id=\"point_gamma\" class=\"dot\" cx=\"70%\" cy=\"50%\" r=\"5\" fill=\"#39384d\"></circle>
                </g>
            </svg>";
    }
    public function bottomGoalDescription() {
        return
            "<div id=\"bottom-row\">
                <ul class=\"ul-horizontal\">

                        <li>
                            <div>
                                <p class=\"element-heading\"><span>Цель</span></p>
                                <textarea class=\"element-description\" name=\"ta-goal\" rows=\"4\" placeholder=\"Например: заработать 100 000 руб\">".$this->goalData."</textarea>
                            </div>
                        </li>

                        <li>
                            <div>
                                <p class=\"element-heading\"><span>Доказательство</span></p>
                                <textarea class=\"element-description\" name=\"ta-proof\" rows=\"4\" placeholder=\"Например: 10 фотографий поездки\">".$this->proofData."</textarea>
                            </div>
                        </li>

                        <li>
                            <div>
                                <p class=\"element-heading\"><span>Дата</span></p>
                                <!--<textarea class=\"element-description\" name=\"ta-date\" rows=\"3\" placeholder=\"Например: до 10 июля\"></textarea>-->
                                <input class=element-description type=\"text\" name=\"datepicker\" placeholder=\"Выберите дату\" value='".$this->date."'>
                                <p class=\"element-description\" id=\"date_countdown\">
                                    <span class=\"digit-block\" id=\"days\"><span class=\"inner-digit\">12</span><br>дней</span>
                                    <span class=\"digit-block\"><span class=\"inner-digit\">-</span></span>
                                    <span class=\"digit-block\" id=\"hours\"><span class=\"inner-digit\">12</span><br>часов</span>
                                    <span class=\"digit-block\"><span class=\"inner-digit\">-</span></span>
                                    <span class=\"digit-block\" id=\"minutes\"><span class=\"inner-digit\">12</span><br>минут</span>
                                    <span class=\"digit-block\"><span class=\"inner-digit\">-</span></span>
                                    <span class=\"digit-block\" id=\"seconds\"><span class=\"inner-digit\">12</span><br>секунд</span>
                                </p> 
                            </div>
                        </li>

                        <li>
                            <div>
                                <p class=\"element-heading\"><span>Цена слова</span></p>
                                <textarea class=\"element-description\" name=\"ta-penalty\" rows=\"4\" placeholder=\"Например: отдать Ивану Ивановичу 20 000 руб\">".$this->penaltyData."</textarea>
                            </div>
                        </li>
                </ul>
                <div id=\"plan-container\">
                    <h2 style=\"font-weight: 800;\"></h2>
                    <textarea rows=\"3\" placeholder='Опишите здесь промежуточную ключевую задачу'></textarea>
                    <br>
                    <span>Дата выполнения:</span><input name=\"plan-datepicker\" placeholder=\"Выберите дату\">
                    <button id=\"btn-change-plan-description\">Применить</button>
                </div>
            </div>";
    }
    public function sectionMenu() {
        return
            "<ul id='tasklist'></ul>
            <div id=\"add-task-container\">
                <input placeholder=\"Введите название задачи\">
                <div class=\"small-button-confirm\"></div>
            </div>
            <div id=\"button-remove-tasks\"></div>";
    }

    public $goalData;
    public $proofData;
    public $date;
    public $penaltyData;
    public $user_goal_info_object;
}

$viewportPage = new MainViewportPage($query_data["goal"],
                                    $query_data["proof"],
                                    $query_data["date"],
                                    $query_data["penalty"],
                                    $query_data["user_goal_info"]);
$html = $viewportPage->generate();

echo $html;
//file_put_contents("test-main-static-page.html", $html);