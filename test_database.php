<?php

/* database presets: */
$db_host = "127.0.0.1";
$db_user = "root";
$db_pass = "123";
$db_name = "goal_service";


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


/* testing simple database interaction: */
$mysqli = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
if($mysqli == false) {
    echo "Unable to connect to database: mysqli == false";
    exit();
}

$res = mysqli_query($mysqli, "select * from users");
$row = mysqli_fetch_assoc($res);

$gi = new GoalInfo();
$gi->state_A = new State("someDateA", "State A description");
$gi->state_B = new State("someDateB", "State B description");
$gi->state_alpha = new State("someDateAlpha", "State Alpha description");
$gi->state_betta = new State("someDateBetta", "State Betta description");
$gi->state_gamma = new State("someDateGamma", "State Gamma description");

$str = json_decode($row['goal_info'])->state_A->description;
echo $str;