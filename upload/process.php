<!DOCTYPE HTML>
<html>
	<head>
		<title>Finished Processing</title>
		<!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

        <!-- Optional theme -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
	</head>
	<body>
		<nav class="navbar navbar-default">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main-menu" aria-expanded="false">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="/obits">MDN Obituary Search</a>
                </div>
                <div class="collapse navbar-collapse" id="main-menu">
                    <ul class="nav navbar-nav">
                        <li><a href="/obits">New Search</span></a></li>
                        <li><a href="http://www2.midland-mi.org/newspaper/MDNindex.htm" target="_blank">Raw Data</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="upload.php">Upload Data</a></li>
                    </ul>
                </div>
            </div>
        </nav>
		<div class="container">
			<h2 class="text-center">Click Upload Data to add more files</h2>
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

			$currentdir = getcwd();
			$file = $_POST['filesent'];
			ini_set('auto_detect_line_endings', TRUE);
			if(($handle = fopen($file, "r")) !== FALSE) {
				$stmt = $mysqli->prepare("INSERT IGNORE INTO Obituaries (lastname, firstname, birthdate, deathdate, obitdate, page) VALUES (?, ?, ?, ?, ?, ?)");
					$stmt->bind_param("ssssss", $lastname, $firstname, $birthdate, $deathdate, $obitdate, $page);
				$lastnameReached = false;
				while (($data = fgetcsv($handle, ',')) !== FALSE) {
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
			?>
			
		</div>
	<body>
</html>
