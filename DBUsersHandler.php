<?php
include("database_settings.php");
include("UserPreference.php");

class DBUsersHandler {

    public function __construct($mysqli, $table_name) {
        $this->mysqli = $mysqli;
        $this->table_name = $table_name;
    }

    public function insert($user_pref) {
        $user_pref_json = json_encode($user_pref);
        $query = "INSERT INTO users VALUES (NULL, 'Mocked Name', 'Mocked email', '".$user_pref_json."')";
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
