<?php
    $mysqli = mysqli_connect("localhost", "root", "", "obits2");


    if($mysqli->connect_errno) {
        echo "Connect failed" . $mysqli->connect_error;
        echo "<script type='text/javascript'>alert('there was a problem connecting');</script>";
    }
    if(isset($_POST['files'])) {
        $files = json_decode($_POST['files']);
    }
    for($j=0;$j<count($files);$j++) {
        $currentdir = getcwd();  
        $target = $currentdir . '/uploads/' . $files[$j]->name . '.csv';
        if(($handle = fopen($target, "r")) !== FALSE) {
        //    echo 'before prepare';
            if($files[$j]->type == 'Obituaries') {
                $stmt = $mysqli->prepare("DELETE FROM Obituaries WHERE lastname=? AND firstname=? AND birthdate=? AND deathdate=? AND obitdate=? AND page=?");
                $stmt->bind_param("ssssss", $lastname, $firstname, $birthdate, $deathdate, $obitdate, $page);
                $lastnameReached = false;
                while (($data = fgetcsv($handle, ',')) !== FALSE) {
                //   echo $data[0];
                    if($lastnameReached && $data[0] != "") {
                        for($c = 0; $c < 6; $c++) {
                            $data[$c] = str_replace('"', '', $data[$c]);
                            $data[$c] = str_replace("'", "", $data[$c]);
                            if($c < 2) {
                                $data[$c] = ucwords(strtolower($data[$c]));
                            }
                        }
                        $lastname = $data[0];
                        $firstname = $data[1];
                        $birthdate = date("Y-m-d", strtotime($data[2]));
                //		$deathyear = $data[4];
                        $deathdate = date("Y-m-d", strtotime($data[3]));
                    //	$obityear = $data[6];
                        $obitdate = date("Y-m-d", strtotime($data[4]));
                        $page = $data[5];
                        $stmt->execute();
                //      echo $lastname . ' ';
                    }
                    if(strcasecmp($data[0], 'Last Name')) {
                        $lastnameReached = true;
                    }
                }
            } elseif()

        } else {
            echo "There was an error opening the file.";
        }
        fclose($handle);
        ini_set('auto_detect_line_endings', FALSE);
        $filestmt = $mysqli->prepare("DELETE FROM Files WHERE filename = ?");
        $filestmt->bind_param("s", $name);
        $name = $fileArray[$i];
        $filestmt->execute();
       
    }
   // echo $fileName;
    $fileArray = explode(',', $fileName);
 //   echo $fileArray[0];
    for($i = 0; $i < count($fileArray); $i++) {
    
    }
    $mysqli->close();

?>