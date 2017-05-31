           
<?php
/*
This file just returns the list of subjects that exist in the database.
*/
$mysqli = new mysqli('localhost', 'root', '', 'obits2');
    if($mysqli->connect_errno) {
        echo "Connect failed" . $mysqli->connect_error;
    }
    $searchstring = 'SELECT DISTINCT subject FROM News';
    $results = $mysqli->query($searchstring);
    $subjects = [];
    while($row = $results->fetch_assoc()) {
        array_push($subjects, $row);
    }
    echo json_encode($subjects);    
?>