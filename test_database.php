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
    public function __construct($id, $name, $email) {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
    }

    public $id;
    public $name;
    public $email;

}


/* testing simple database interaction: */
$mysqli = mysqli_connect($db_host, $db_user, $db_pass, $db_name);
if($mysqli == false) {
    echo "Unable to connect to database: mysqli == false";
    exit();
}

$res = mysqli_query($mysqli, "select * from users");
$row = mysqli_fetch_assoc($res);

$up = new UserPreferences($row['id'], $row['name'], $row['email']);
echo json_encode($up);
