<?php

$fileName = "list.txt";
$filePath = "../../dice/";
$file = file($filePath.$fileName);
$array = array("");

// change file into array
foreach($file as $line) {
    array_push($array,$line);
};

// hm
foreach($array as $line){
    echo($line);
}



?>