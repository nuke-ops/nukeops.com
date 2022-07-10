<?php
include 'sql.php';

//create($conn);
write($conn);
echo json_encode(read($conn));

$conn->close();
?>
