           
<?php
// server directory function
//$dir = dirname(__FILE__); echo "<p>Full path to this dir: " . $dir . "</p>"; echo "<p>Full path to a .htpasswd file in this dir: " . $dir . "/.htpasswd" . "</p>";
$mysqli = new mysqli('localhost', 'root', '', 'obits2');
    if($mysqli->connect_errno) {
        echo "Connect failed" . $mysqli->connect_error;
        echo "<script type='text/javascript'>alert('there was a problem connecting');</script>";
    } else {
//     echo "Opened database";
    }
    $searchstring = 'SELECT DISTINCT subject FROM News';
    $results = $mysqli->query($searchstring);
    $subjects = [];
    while($row = $results->fetch_assoc()) {
        array_push($subjects, $row);
    }
    echo json_encode($subjects);

    
?>