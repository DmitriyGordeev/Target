<?php
    class HtmlPage {

        public function __construct() {}
        
        /*
         *  methods:
        */
        public function generate() {
            return "<!DOCTYPE><html>".$this->head().$this->body()."</html>";
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

            $body_string = "<body>".
                $this->topMenu().
                $this->svgViewport().
                $this->bottomGoalDescription().
                "</body>";

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
            return "";
        }
        public function svgViewport() {
            return "";
        }
        public function bottomGoalDescription() {
            return "";
        }

    }

    $htmlPageObject = new HtmlPage("This is title", "This is centered text");
    echo $htmlPageObject->generate();

