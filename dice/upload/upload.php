<?php
$target_dir = "../../dice/";
$target_file = $target_dir . basename("list.txt");
$uploadOk = 1;
$fileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check file size
if ($_FILES["myFile"]["size"] > 500000) {
  echo "Sorry, your file is too large.<br/>";
  $uploadOk = 0;
}

// Allow certain file formats
if($fileType != "txt") {
  echo "Sorry, only txt files are allowed.<br/>";
  $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.<br/>";
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["myFile"]["tmp_name"], $target_file)) {
    echo "The file ". htmlspecialchars( basename( $_FILES["myFile"]["name"])). " has been uploaded.<br/>";
  } else {
    echo "Sorry, there was an error uploading your file.<br/>";
  }
}

?>
