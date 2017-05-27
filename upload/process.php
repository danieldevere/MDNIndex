
			<?php


			$mysqli = mysqli_connect("localhost", "root", "", "obits2");


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

			$sql = "CREATE TABLE IF NOT EXISTS Obituaries (
				lastname VARCHAR(100) NOT NULL,
				firstname VARCHAR(100) NOT NULL,
				birthdate DATE,
				deathdate DATE,
				obitdate DATE NOT NULL,
				page VARCHAR(10) NOT NULL,
				id int NOT NULL AUTO_INCREMENT,
				CONSTRAINT uc_obituary UNIQUE (lastname, firstname, obitdate),
				PRIMARY KEY (id)
			)";

			if($mysqli->query($sql) === TRUE) {
			//	echo "Table Obituaries created successfully";
			} else {
				echo "<h1>Error creating table: " . $mysqli->error . "</h1>";
				echo "<script type='text/javascript'>alert('there was a problem connecting');</script>";
			}

			session_start();
			$_SESSION["process"] = 0;
			session_write_close();
			$currentdir = getcwd();
			$file = $_POST['filesent'];
			$filePath = $currentdir . '/uploads/' . $file;
			ini_set('auto_detect_line_endings', TRUE);
			$currentPercent = 0.0;
			if(($handle = fopen($filePath, "r")) !== FALSE) {
				$stmt = $mysqli->prepare("INSERT IGNORE INTO Obituaries (lastname, firstname, birthdate, deathdate, obitdate, page) VALUES (?, ?, ?, ?, ?, ?)");
					$stmt->bind_param("ssssss", $lastname, $firstname, $birthdate, $deathdate, $obitdate, $page);
				$lastnameReached = false;
				$fileLength = count(file($file));
				$percentPerRow = 100 / $fileLength;
				while (($data = fgetcsv($handle, ',')) !== FALSE) {
					$currentPercent += $percentPerRow;
					session_start();
					$_SESSION["process"] = $currentPercent;
					session_write_close();
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
					}
					if(strcasecmp($data[0], 'Last Name')) {
						$lastnameReached = true;
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
			$type = "Obituary";
			$filestmt->execute();
			$mysqli->close();
			session_destroy();
			?>
