<?php
// https://github.com/panique/php-long-polling
include 'sql.php';
set_time_limit(0);

while (true) {
    $last_ajax_call = isset($_GET['timestamp']) ? (int)$_GET['timestamp'] : null;
    clearstatcache();
    $last_change_in_data_file = str_replace(":","",explode(" ",getTimestamp($conn))[1]);
    if ($last_ajax_call == null || $last_change_in_data_file > $last_ajax_call) {
        $data = json_decode(json_encode(read($conn)), true);
        $result = array(
            'data_from_file' => $data,
            'timestamp' => $last_change_in_data_file
        );
        
        $json = json_encode($result);
        echo $json;
        break;

    } else {
        sleep(1.2);
        continue;
    }
}
