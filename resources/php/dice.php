<?php
class MyDB extends SQLite3 {
    function __construct($sqlite_file) {
        $this->open($sqlite_file);
    }
}
$sqlite_file = "../../dice/data/dice.db";

function create($sqlite_file){
    $db = new MyDB($sqlite_file);
    $db->exec('CREATE TABLE IF NOT EXISTS rolls ('
        .'id INTEGER PRIMARY KEY AUTOINCREMENT,'
        .'name text NOT NULL,'
        .'dice int NOT NULL,'
        .'sides int NOT NULL,'
        .'throws text NOT NULL,'
        .'sum int NOT NULL,'
        .'mod text,'
        .'date datetime default current_timestamp'
    .')');
    $db->close();
}

function write($sqlite_file){
    $db = new MyDB($sqlite_file);

    $stmt = $db->prepare("INSERT INTO rolls(name,dice,sides,throws,mod,sum) VALUES (?, ?, ?, ?, ?, ?)");

    $name = $_REQUEST["name"];
    $dice = $_REQUEST["dice"];
    $sides = $_REQUEST["sides"];
    $throws = implode(",", $_REQUEST["throws"]);
    $mod = $_REQUEST["mod"];
    $sum = $_REQUEST["sum"];

    $stmt->bindValue(1, $name, SQLITE3_TEXT);
    $stmt->bindValue(2, $dice, SQLITE3_INTEGER);
    $stmt->bindValue(3, $sides, SQLITE3_INTEGER);
    $stmt->bindValue(4, $throws, SQLITE3_TEXT);
    $stmt->bindValue(5, $mod, SQLITE3_INTEGER);
    $stmt->bindValue(6, $sum, SQLITE3_INTEGER);
    $stmt->execute();
    $db->close();
}

function read($sqlite_file){
    $db = new MyDB($sqlite_file);

    $result = $db->query('SELECT * FROM rolls ORDER BY id DESC LIMIT 10');
    $results = array();
    while ($row = $result->fetchArray()) {
        array_push($results,$row);
    }
    $db->close();
    return $results;
}
create($sqlite_file);
write($sqlite_file);
echo json_encode(read($sqlite_file));

?>
