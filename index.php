<?php
    class HtmlPage {

        public function __construct($title, $centered_text) {
            $this->title = $title;
            $this->centered_text = $centered_text;
        }
        
        /*
         *  methods:
        */
        public function generate() {
            return "<!DOCTYPE><html>".$this->head().$this->body()."</html>";
        }

        /* main tags: */
        public function head() {
            return "<head>
                    <meta charset=\"UTF-8\">
                    <title>".$this->title."</title>";
        }
        public function body() {
            return "<body><p style='text-align: center; font-size: 30px'>".$this->centered_text."</p></body>";
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

        /*
         *  properties:
         */
        public $title;
        public $centered_text;
    }

    $htmlPageObject = new HtmlPage("This is title", "This is centered text");
    echo $htmlPageObject->generate();

