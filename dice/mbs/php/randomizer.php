<?php
$target_dir = "../../../dice/data/";
$target_file = $target_dir . basename("list.txt");

$array = explode("\r\n",file_get_contents($target_file)); // transform file into an array 
file_put_contents($target_dir."mbs.txt", $_REQUEST["name"].": ".$array[array_rand($array)]); // choose random element from array and save it to file

?>
