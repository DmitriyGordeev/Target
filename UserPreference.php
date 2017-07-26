<?php

class State {
    public function __construct($date, $description) {
        $this->date = $date;
        $this->description = $description;
    }

    public $date;
    public $description;
}

class GoalInfo {
    public $state_A;
    public $state_B;
    public $state_alpha;
    public $state_betta;
    public $state_gamma;
}

class UserPreferences {
    public function __construct($id, $name, $email, $goal_info) {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->goal_info = $goal_info;
    }

    public $id;
    public $name;
    public $email;
    public $goal_info;
}