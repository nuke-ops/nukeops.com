<?php
// https://github.com/panique/php-long-polling
class MyDB extends SQLite3 {
    function __construct($sqlite_file) {
        $this->open($sqlite_file);
    }
}
$sqlite_file = "../../dice/data/dice.db";
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

set_time_limit(0);

while (true) {

    $last_ajax_call = isset($_GET['timestamp']) ? (int)$_GET['timestamp'] : null;
    clearstatcache();
    $last_change_in_data_file = filemtime($sqlite_file);

    if ($last_ajax_call == null || $last_change_in_data_file > $last_ajax_call) {
        $data = json_decode(json_encode(read($sqlite_file)), true);
        $result = array(
            'data_from_file' => $data,
            'timestamp' => $last_change_in_data_file
        );
        
        $json = json_encode($result);
        echo $json;
        break;

    } else {
        sleep( 1 );
        continue;
    }
}
