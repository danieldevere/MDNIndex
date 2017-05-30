
			<?php

			session_start();
			$_SESSION["process"] = 0;
			session_write_close();

			$mysqli = mysqli_connect("localhost", "root", "", "Obits2");


			if($mysqli->connect_errno) {
				echo "Connect failed" . $mysqli->connect_error;
				echo "<script type='text/javascript'>alert('there was a problem connecting');</script>";
			}

			$something = "CREATE TABLE IF NOT EXISTS Files (
				filename VARCHAR(100) NOT NULL,
				id INT NOT NULL AUTO_INCREMENT,
				type VARCHAR(50) NOT NULL,
				uploaddate DATETIME DEFAULT CURRENT_TIMESTAMP,
				CONSTRAINT uc_file UNIQUE (filename, type),
				PRIMARY KEY (id)
			)";
			if($mysqli->query($something) === TRUE) {
			//	echo "Table created successfully";
			} else {
				echo "Didn't create the file table.";
			}

			$sql = "CREATE TABLE IF NOT EXISTS Weddings (
				lastname VARCHAR(100) NOT NULL,
				firstname VARCHAR(100) NOT NULL,
				announcement VARCHAR(100),
				weddingdate DATE NOT NULL,
                articledate DATE NOT NULL,
                page VARCHAR(10),
				id int NOT NULL AUTO_INCREMENT,
				CONSTRAINT uc_wedding UNIQUE (lastname, firstname, articledate),
				PRIMARY KEY (id)
			)";

			if($mysqli->query($sql) === TRUE) {

			} else {
				echo "<h1>Error creating table: " . $mysqli->error . "</h1>";
				echo "<script type='text/javascript'>alert('there was a problem connecting');</script>";
			}

			$currentdir = getcwd();
			$file = $_POST['filesent'];
			$filePath = $currentdir . '/uploads/' . $file;
			
			ini_set('auto_detect_line_endings', TRUE);
			$currentPercent = 0.0;
			if(($handle = fopen($filePath, "r")) !== FALSE) {
				$stmt = $mysqli->prepare("INSERT IGNORE INTO Weddings (lastname, firstname, announcement, weddingdate, articledate, page) VALUES (?, ?, ?, ?, ?, ?)");
				$stmt->bind_param("ssssss", $lastname, $firstname, $announcement, $weddingdate, $articledate, $page);
				$lastNameReached = false;
				$fileLength = count(file($filePath));
				$percentPerRow = 100 / $fileLength;
				while (($data = fgetcsv($handle, ',')) !== FALSE) {
					$currentPercent += $percentPerRow;
					session_start();
					$_SESSION["process"] = $currentPercent;
					session_write_close();
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
			} else {
				echo "There was an error opening the file.";
			}
			fclose($handle);
			ini_set('auto_detect_line_endings', FALSE);
			$filename = basename($file, '.csv');
			$filestmt = $mysqli->prepare("INSERT INTO Files (filename, type) VALUES (?, ?)");
			$filestmt->bind_param("ss", $name, $type);
			$name = $filename;
			$type = "Weddings-Anniversaries";
			$filestmt->execute();
			$mysqli->close();
			session_destroy();
			?>
