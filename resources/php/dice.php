<?php
$rolls_json = "../../dice/data/rolls.json";
$entries_to_keep = 10; // Easy to configure how many you want to keep.

$strJsonFileContents = file_get_contents($rolls_json);
$array = json_decode($strJsonFileContents, true);

if(count($array) >= $entries_to_keep) {array_pop($array);} // if more than 1- entires, remove oldest one 

array_unshift($array,$_REQUEST); // add new entry
file_put_contents($rolls_json, json_encode($array)); 

?>
