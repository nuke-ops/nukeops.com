<?php
set_time_limit(0);

function GetRemoteLastModified( $uri ) {
    $unixtime = 0;
    $fp = fopen( $uri, "r" );

    if( !$fp ) {return;}
    $MetaData = stream_get_meta_data( $fp );
       
    foreach( $MetaData['wrapper_data'] as $response ) {
        if( substr( strtolower($response), 0, 10 ) == 'location: ' ) {
            $newUri = substr( $response, 10 );
            fclose( $fp );
            return GetRemoteLastModified( $newUri );
        }
        elseif( substr( strtolower($response), 0, 15 ) == 'last-modified: ' ) {
            $unixtime = strtotime( substr($response, 15) );
            break;
        }
    }
    fclose( $fp );
    return $unixtime;
}

$data_source_file = 'https://api.warframestat.us/pc/cetusCycle';

while (true) {
    $last_ajax_call = isset($_GET['timestamp']) ? (int)$_GET['timestamp'] : null;
    clearstatcache();
    $last_change_in_data_file =  GetRemoteLastModified($data_source_file);
    if ($last_ajax_call == null || $last_change_in_data_file > $last_ajax_call) {
        $data = file_get_contents($data_source_file);
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
