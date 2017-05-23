<?php
    if(isset($_GET['searchtype'])) {
        $searchType = $_GET['searchtype'];
    }
    if(isset($_GET['lastname'])) {
        $lastname = $_GET['lastname'];
    }
    if(isset($_GET['firstname'])) {
        $firstname = $_GET['firstname'];
    }
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "obits2";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        if($searchType == 'obituaries') {
            $searchString = "SELECT * FROM Obituaries WHERE";
        } elseif($searchType == 'weddings') {
            $searchString = "SELECT * FROM Weddings WHERE";
        }
        if(isset($lastname) && $lastname != "") {
            $searchString .= " lastname = :lastname";
            if(isset($firstname) && $firstname != "") {
                $searchString .= " AND (firstname LIKE :firstname0 OR firstname LIKE :firstname1)";
            }
        } else {
            echo "Last Name field must not be empty";
        }
        
        $stmt = $conn->prepare($searchString);
        if(isset($lastname) && $lastname != "") {
            $stmt->bindParam(':lastname', $lastname);
        }
        if(isset($firstname) && $firstname != "") {
            $firstname0 = $firstname . '%';
            $firstname1 = '% ' . $firstname . '%';
            $stmt->bindParam(':firstname0', $firstname0);
            $stmt->bindParam(':firstname1', $firstname1);
        }
        $result = $stmt->execute();
        if(isset($result)) {
            $resultArray = [];
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                if($searchType == 'obituaries') {
                    if($row['birthdate'] != "") {
                        $row['birthdate'] = date("m/d/Y", strtotime($row['birthdate']));
                    }
                    if($row['deathdate'] != "") {
                        $row['deathdate'] = date("m/d/Y", strtotime($row['deathdate']));
                    }
                    $row['obitdate'] = date("m/d/Y", strtotime($row['obitdate']));
                } else {
                    if($row['articledate'] != "") {
                        $row['articledate'] = date("m/d/Y", strtotime($row['articledate']));
                    }
                    if($row['weddingdate'] != "") {
                        $row['weddingdate'] = date("m/d/Y", strtotime($row['weddingdate']));
                    }
                }
                
                array_push($resultArray, $row);
            }
            echo json_encode($resultArray);
        }
    } catch(PDOException $e) {
        echo $searchString;
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
?>