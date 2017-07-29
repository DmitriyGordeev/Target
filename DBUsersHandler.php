<?php
include("database_settings.php");
include("UserPreference.php");


class DBUsersHandler {

    public function __construct($mysqli, $table_name) {
        $this->mysqli = $mysqli;
        $this->table_name = $table_name;
    }

    public function insert($user_pref) {
        $goal_pref_json = json_encode($user_pref->goal_info);
        $query = "INSERT INTO users VALUES (NULL, '".$user_pref->name."', '".$user_pref->email."', '".$goal_pref_json."')";
        mysqli_query($this->mysqli, $query);
    }
    public function get($id) {}
    public function get_all() {}
    public function replace($id, $object) {}
    public function erase($id) {}

    private $mysqli;
    private $table_name;
}

/* testing queries: */
$userPref = new UserPreferences();