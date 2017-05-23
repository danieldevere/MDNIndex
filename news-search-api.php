 <?php
    $searchString = "SELECT * FROM News WHERE ";
    if(isset($_GET['subjects'])) {
        $subjects = json_decode($_GET['subjects'], true);
        $numSubjects = count($subjects);
 //       echo $numSubjects;    
        if($numSubjects > 0) {
            $subjectString = "";    
            $subjectString .= "(";
            for($i = 0; $i < $numSubjects; $i++) {
                if($i > 0) {
                    $subjectString .= " OR ";
                }
                $subjectString .= "subject = :subject" . $i;
            }
            $subjectString .= ")";
        }       
    }
    if(isset($_GET['headline'])) {
        $headline = $_GET['headline'];
        if($headline != "") {
            $headlineString = "";
            if(isset($subjectString)) {
                $headlineString .= " AND article LIKE :article";
            } else {
                $headlineString .= "article LIKE :article";
            }
        }
    }
    
    if(isset($_GET['fromDate'])) {
        if($_GET['fromDate'] != "") {
            $fromDate = $_GET['fromDate'];
        }
    }
    if(isset($_GET['toDate'])) {
        if($_GET['toDate'] != "") {
            $toDate = $_GET['toDate'];    
        }
    }


    
    if(isset($fromDate) || isset($toDate)) {
        $dateString = "";
        if(isset($subjectString) || isset($headlineString)) {
            $dateString .= " AND ";
        }
        if(isset($fromDate) && isset($toDate)) {
            $fromDate .= "";
            $toDate .= "-12-31";
            $dateString .= "articledate BETWEEN :fromDate AND :toDate";
        } elseif(isset($fromDate)) {
            $fromDate .= "-01-01";
            $dateString .= "articledate > :fromDate";
        } else {
            $toDate .= "-12-31";
            $dateString .= "articledate < :toDate";
        }
    }

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "Obits2";

    try {
        $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        if(isset($subjectString)) {
            $searchString .= $subjectString;
        }
        if(isset($headlineString)) {
            $searchString .= $headlineString;
        }
        if(isset($dateString)) {
            $searchString .= $dateString;
        }
    //    echo $searchString;
        $stmt = $conn->prepare($searchString);
        if(isset($subjectString)) {
            for($j = 0; $j < count($subjects); $j++) {
                $stmt->bindParam(':subject' . $j, $subjects[$j]);
         //       echo $subjects[$j];
            }
        }
        if(isset($headlineString)) {
            $headline = "%" . $headline . "%";
            $stmt->bindParam(':article', $headline);
        //    echo $headline;
        }
        if(isset($dateString)) {
            if(isset($fromDate)) {
                $stmt->bindParam(':fromDate', $fromDate);
         //       echo $dateString;
            }
            if(isset($toDate)) {
                $stmt->bindParam(':toDate', $toDate);
           //     echo $dateString;
            }
        }
        
        $result = $stmt->execute();
        if(isset($result)) {
            $resultArray = [];
            while($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $row['articledate'] = date("m/d/Y", strtotime($row['articledate']));
                array_push($resultArray, $row);
            }
            echo json_encode($resultArray);
        } else {
            echo "No results";
        }

  
        
    } catch(PDOException $e) {
        echo $searchString;
        echo "Error: " . $e->getMessage();
    }
    $conn = null;
?>