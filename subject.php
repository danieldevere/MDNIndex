<?php 
$subject = $_GET['subject'];
//echo $subject;
$mysqli = new mysqli('localhost', 'root', '', 'obits2');
if($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}
$stmt = "SELECT DISTINCT subject FROM News WHERE subject LIKE '" . $subject . "%'";
$result = $mysqli->query($stmt);
if($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        echo '<div class="checkbox"><label><input id="subjectCheckbox" type="checkbox" name="subject" value="' . $row['subject'] . '">' . $row['subject'] . '</label></div>';
    }
}
$mysqli->close();
?>