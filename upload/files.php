<?php
    $mysqli = mysqli_connect('localhost', 'root', '', 'obits2');
    if($mysqli->connect_errno) {
        echo "Connect failed" . $mysqli->connect_error;
      //  echo "<script type='text/javascript'>alert('there was a problem connecting');</script>";
    }
    $searchString = 'SELECT * FROM Files ORDER BY uploaddate DESC';
    $results = $mysqli->query($searchString);
 //   echo json_encode($results);
    /*if($results !== FALSE) {
        while($row = $results->fetch_assoc()) {
            echo '<tr><td><input type="checkbox" id="removeFile" data-type="' . $row['type'] . '" data-file="' . $row['filename'] . '"></td><td>' . $row['uploaddate'] . '</td><td>' . $row['filename'] . '</td><td>' . $row['type'] . '</td></tr>';
        }
    }*/
    $articles = $results->fetch_all(MYSQLI_ASSOC);

    echo json_encode($articles);
    $mysqli->close();
?>