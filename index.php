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

        }
        public function scripts() {

        }

        /* body content: */
        public function topMenu() {

        }
        public function svgViewport() {

        }
        public function bottomGoalDescription() {

        }

    }

    $htmlPageObject = new HtmlPage("This is title", "This is centered text");
    echo $htmlPageObject->generate();

