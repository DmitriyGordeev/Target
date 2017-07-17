<?php

    // keypoint is alpha, beta, gamma:
    class KeyPoint {

        public function __construct($date, $description) {
            $this->date = $date;
            $this->description = $description;
        }

        public $date;
        public $description;
    }

    class UserGoalData {
        public $goal;
        public $proof;
        public $dateA;
        public $dateB;
        public $penalty;
        public $keyPoints;
    }

    class MainViewportPage {

        public function __construct($goal, $proof, $penalty, $keyPoints) {
            $this->goalData = $goal;
            $this->proofData = $proof;
            $this->penaltyData = $penalty;
            $this->keyPoints = $keyPoints;
        }

        /*
         *  methods:
        */
        public function generate() {
             return "<!DOCTYPE><html lang=\"en\">".$this->head().$this->body()."</html>";
        }

        /* main tags: */
        public function head() {
            $head_string = "<head>
                    <meta charset=\"UTF-8\">
                    <title> MainPage | Goal </title>";

            $head_string = $head_string.$this->styles().$this->scripts()."</head>";
            return $head_string;
        }
        public function body() {

            $body_string =
                "<body>
                <div id=\"main-container\">".
                $this->topMenu().
                $this->svgViewport().
                "<p id=\"return\" class=\"button\">Исходная</p>
                <br>
                <span id=\"debug\"></span>".
                $this->bottomGoalDescription().
                "</div>
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
                "<script src=\"https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js\"></script>
                <script src=\"jquery-ui-1.12.1/jquery-ui.js\"></script>
                <script src=\"Snap.svg-0.5.1/dist/snap.svg-min.js\"></script>
                <script src=\"snap.svg.zpd-master/snap.svg.zpd.js\"></script>
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
                        <line class=\"timeline\" x1=\"10%\" y1=\"50%\" x2=\"30%\" y2=\"50%\" stroke=\"#F53240\" stroke-width=\"4px\"></line>
                        <line class=\"timeline\" x1=\"30%\" y1=\"50%\" x2=\"50%\" y2=\"50%\" stroke=\"#02c8a7\" stroke-width=\"4px\"></line>
                        <line class=\"timeline\" x1=\"50%\" y1=\"50%\" x2=\"70%\" y2=\"50%\" stroke=\"#7CDBD5\" stroke-width=\"4px\"></line>
                        <line class=\"timeline\" x1=\"70%\" y1=\"50%\" x2=\"90%\" y2=\"50%\" stroke=\"#F9BE02\" stroke-width=\"4px\"></line>

                        <circle id=\"pointA\" class=\"dot\" cx=\"10%\" cy=\"50%\" r=\"10\" fill=\"#39384d\"></circle>
                        <circle id=\"pointB\" class=\"dot\" cx=\"90%\" cy=\"50%\" r=\"14\" fill=\"#39384d\"></circle>

                        <circle id=\"alpha\" class=\"dot\" cx=\"30%\" cy=\"50%\" r=\"10\" fill=\"#39384d\"></circle>
                        <circle id=\"betta\" class=\"dot\" cx=\"50%\" cy=\"50%\" r=\"10\" fill=\"#39384d\"></circle>
                        <circle id=\"gamma\" class=\"dot\" cx=\"70%\" cy=\"50%\" r=\"10\" fill=\"#39384d\"></circle>
                    </g>
                </svg>";
        }
        public function bottomGoalDescription() {
            return "<div id=\"bottom-row\">
                        <ul class=\"ul-horizontal\">

                            <li>
                                <div>
                                    <p class=\"element-heading\">Цель</p>
                                    <textarea class=\"element-description\" name=\"ta-goal\" rows=\"3\" placeholder=\"Например: заработать 100 000 руб\">".$this->goalData."</textarea>
                                </div>
                            </li>

                            <li>
                                <div>
                                    <p class=\"element-heading\">Доказательство</p>
                                    <textarea class=\"element-description\" name=\"ta-proof\" rows=\"3\" placeholder=\"Например: 10 фотографий поездки\">".$this->proofData."</textarea>
                                </div>
                            </li>

                            <li>
                                <div>
                                    <p class=\"element-heading\">Дата</p>
                                    <!--<textarea class=\"element-description\" name=\"ta-date\" rows=\"3\" placeholder=\"Например: до 10 июля\"></textarea>-->
                                    <input class=element-description type=\"text\" name=\"datepicker\" placeholder=\"Выберите дату\">
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
                                    <p class=\"element-heading\">Цена слова</p>
                                    <textarea class=\"element-description\" name=\"ta-penalty\" rows=\"3\" placeholder=\"Например: отдать Ивану Ивановичу 20 000 руб\">".$this->penaltyData."</textarea>
                                </div>
                            </li>
                        </ul>
                    </div>";
        }

        public $goalData;
        public $proofData;
        public $penaltyData;
        public $keyPoints;

    }

    $alpha_keyPoint = new KeyPoint("Some Date Alpha", "Alpha Description");
    $betta_keyPoint = new KeyPoint("Some Date Betta", "Betta Description");
    $gamma_keyPoint = new KeyPoint("Some Date Gamma", "Gamma Description");

    $keyPoints = array($alpha_keyPoint, $betta_keyPoint, $gamma_keyPoint);

    $viewportPage = new MainViewportPage("Goal Set", "Goal proof", "Penalty", $keyPoints);
    $html = $viewportPage->generate();

    echo $html;


