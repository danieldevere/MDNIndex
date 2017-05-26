<?php
    $mysqli = mysqli_connect("localhost", "root", "", "obits2");


    if($mysqli->connect_errno) {
     //   echo "Connect failed" . $mysqli->connect_error;
     //   echo "<script type='text/javascript'>alert('there was a problem connecting');</script>";
    }
    if(isset($_POST['data'])) {
        $files = json_decode($_POST['data']);
    }
    for($j=0;$j<count($files);$j++) {
        $currentdir = getcwd();
        $target = $currentdir . '/uploads/' . $files[$j]->filename . '.csv';
        if(($handle = fopen($target, "r")) !== FALSE) {
        //    echo 'before prepare';
            if($files[$j]->type == 'Obituary') {
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
            } elseif($files[$j]->type == 'Article') {
                $stmt = $mysqli->prepare("DELETE FROM News WHERE subject=? AND article=? AND page=? AND articledate=?");
                $stmt->bind_param("ssss", $subject, $article, $page, $articledate);
                $subjectReached = false;
				while (($data = fgetcsv($handle, ',')) !== FALSE) {
					if($subjectReached && $data[0] != "") {
						for($c=0; $c < 4; $c++) {
							$data[$c] = str_replace('"', '', $data[$c]);
							$data[$c] = str_replace("'", "", $data[$c]);
							if($c < 1) {
								$data[$c] = str_replace('-', ' - ', $data[$c]);
							}
						}	
						$subject = $data[0];
						$article = $data[1];
						$page = $data[2];
						$articledate = date("Y-m-d", strtotime($data[3]));
					//	$year = $data[4];
						$stmt->execute();
					}
					if(strcasecmp($data[0], 'subject') == 0) {
						$subjectReached = true;
					}
				}
            } else {
                $stmt = $mysqli->prepare("DELETE FROM Weddings WHERE lastname=? AND firstname=? AND announcement=? AND weddingdate=? AND articledate=? AND page=?");
				$stmt->bind_param("ssssss", $lastname, $firstname, $announcement, $weddingdate, $articledate, $page);
				$lastNameReached = false;
				while (($data = fgetcsv($handle, ',')) !== FALSE) {
					if($lastNameReached && $data[0] != "") {
						for($c=0; $c < 6; $c++) {
							$data[$c] = str_replace('"', '', $data[$c]);
							$data[$c] = str_replace("'", "", $data[$c]);
						}	
						$lastname = $data[0];
						$firstname = $data[1];
						$announcement = $data[2];
						$weddingdate = date("Y-m-d", strtotime($data[3]));
                        $articledate = date("Y-m-d", strtotime($data[4]));
                        $page = $data[5];
					//	$year = $data[4];
						$stmt->execute();
					}
					if(strcasecmp($data[0], 'last name') == 0) {
						$lastNameReached = true;
					}
				}
            }
            fclose($handle);
            ini_set('auto_detect_line_endings', FALSE);
        } else {
         //   echo "There was an error opening the file.";
        }
        $filestmt = $mysqli->prepare("DELETE FROM Files WHERE filename = ?");
        $filestmt->bind_param("s", $name);
        $name = $files[$j]->filename;
        $filestmt->execute();
    }
    $mysqli->close();

?>