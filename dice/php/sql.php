<?php 

function create($conn){
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }

    $sql = "CREATE TABLE rolls (
        id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        dice INT(10) NOT NULL,
        sides INT(10) NOT NULL,
        throws VARCHAR(100) NOT NULL,
        modifier VARCHAR(30),
        sum INT(10) NOT NULL,
        date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )";

    if ($conn->query($sql) === TRUE) {
      echo "Database created successfully";
    } else {
      echo "Error creating database: " . $conn->error;
    }
}

function write($conn){
    $stmt = $conn->prepare("INSERT INTO rolls(name,dice,sides,throws,modifier,sum) VALUES (?, ?, ?, ?, ?, ?)");
    $name = $_REQUEST["name"];
    $dice = $_REQUEST["dice"];
    $sides = $_REQUEST["sides"];
    $throws = implode(",", $_REQUEST["throws"]);
    if($mod){$mod = $_REQUEST["mod"];}
    else{$mod = " ";}
    $sum = $_REQUEST["sum"];

    $stmt->bind_param("siisis", $name, $dice, $sides, $throws, $modifier, $sum);

    $stmt->execute();
}

function read($conn){
    $sql = "SELECT * FROM rolls ORDER BY id DESC LIMIT 10";
    $result = $conn->query($sql);
    $results = array();
    while ($row = $result->fetch_assoc()) {
        array_push($results,$row);
    }
    return $results;
}
function getTimestamp($conn){
    $sql = "SELECT date FROM rolls ORDER BY id DESC LIMIT 1";
    $result = $conn->query($sql);
    $result = implode(",",$result->fetch_all()[0]);
    return $result;
}
$conn = new mysqli("localhost", "dice", "funnypassword", "nukeops.com");
?>
