<?php
$rolls_json = "../../dice/rolls.json";
$entries_to_keep = 10; // Easy to configure how many you want to keep.

if(!file_exists($rolls_json)) {
    echo "JSON file not found\n";
    return;
} else {
    echo "JSON file found\n";
}
    

$strJsonFileContents = file_get_contents($rolls_json);
$array = json_decode($strJsonFileContents, true);
// var_dump($array);


if(count($array) >= $entries_to_keep) {
    echo "array is bigger than 10\n";
    array_pop($array); // remove oldest entry
    //$array = array_values($array); // restore the indexing. Is this even needed? 
}
else {
    echo "array is smaller than 10\n";
}
array_unshift($array,$_REQUEST); // add new entry
file_put_contents($rolls_json, json_encode($array));


?>