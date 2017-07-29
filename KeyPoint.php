<?php

class KeyPoint {

    public function __construct($date, $description) {
        $this->date = $date;
        $this->description = $description;
    }

    public $date;
    public $description;
}