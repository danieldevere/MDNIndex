<?php
	set_time_limit(150);
	file_put_contents('progress.json', json_encode(array('percentComplete'=>0)));
	$servername = 'localhost';
	$username = 'root';
	$password = '';
	$dbname = 'obits2';
	try{
		$conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$stmtFileTable = $conn->prepare("CREATE TABLE IF NOT EXISTS Files (
			filename VARCHAR(100) NOT NULL,
			id INT NOT NULL AUTO_INCREMENT,
			type VARCHAR(50) NOT NULL,
			uploaddate DATETIME DEFAULT CURRENT_TIMESTAMP,
			CONSTRAINT uc_file UNIQUE (filename, type),
			PRIMARY KEY (id)
		)");
		$stmtFileTable->execute();
		$stmtObitTable = $conn->prepare("CREATE TABLE IF NOT EXISTS Obituaries (
			lastname VARCHAR(100) NOT NULL,
			firstname VARCHAR(100) NOT NULL,
			birthdate DATE,
			deathdate DATE,
			obitdate DATE NOT NULL,
			page VARCHAR(10) NOT NULL,
			id int NOT NULL AUTO_INCREMENT,
			CONSTRAINT uc_obituary UNIQUE (lastname, firstname, obitdate),
			PRIMARY KEY (id)
		)");
		$stmtObitTable->execute();
		$stmtInsert = $conn->prepare("INSERT IGNORE INTO Obituaries 
			(lastname, firstname, birthdate, deathdate, obitdate, page)
			VALUES (:lastname, :firstname, :birthdate, :deathdate, :obitdate, :page)"
		);
		$stmtInsert->bindParam(':lastname', $lastname);
		$stmtInsert->bindParam(':firstname', $firstname);
		$stmtInsert->bindParam(':birthdate', $birthdate);
		$stmtInsert->bindParam(':deathdate', $deathdate);
		$stmtInsert->bindParam(':obitdate', $obitdate);
		$stmtInsert->bindParam(':page', $page);
		$currentdir = getcwd();
		if(!empty($_POST['filesent'])) {
			$file = $_POST['filesent'];
		} else {
			throw new Exception("The file wasn't sent");
		}
		$filePath = $currentdir . '/uploads/' . $file;
		ini_set('auto_detect_line_endings', TRUE);
		$currentPercent = 0.0;
		if(($handle = fopen($filePath, "r")) !== FALSE) {
			$lastnameReached = false;
			$fileLength = count(file($filePath));
			$percentPerRow = 100 / $fileLength;
			$count = 0;
			while(($data = fgetcsv($handle, ',')) !== FALSE) {
				$currentPercent = $currentPercent + $percentPerRow;
				$roundedPercent = ceil($currentPercent);
				if($roundedPercent % 2 == 0) {
					file_put_contents('progress.json', json_encode(array('percentComplete'=>$roundedPercent)));
				}
				if($lastnameReached && $data[0] != "") {
					$data[0] = str_replace('"', '', $data[0]);
					$data[0] = str_replace("'", "", $data[0]);
					$lastname = $data[0];
					$firstname = $data[1];
					$birthdate = date("Y-m-d", strtotime($data[2]));
					$deathdate = date("Y-m-d", strtotime($data[3]));
					$obitdate = date("Y-m-d", strtotime($data[4]));
					$page = $data[5];
					$stmtInsert->execute();
				}
				if(strcasecmp($data[0], 'Last Name')) {
					$lastnameReached = true;
				}
				$count++;
			}
		} else {
			throw new Exception("There was an error opening the file");
		}
		if($count + 5 < $fileLength) {
			throw new Exception("Didn't process whole file count: $count");
		}
		fclose($handle);
		ini_set('auto_detect_line_endings', FALSE);
		$filename = basename($file, '.csv');
		$stmtFileInsert = $conn->prepare("INSERT INTO Files (filename, type) VALUES (:filename, :type)");
		$stmtFileInsert->bindParam(':filename', $filename);
		$stmtFileInsert->bindParam(':type', $type);
		$filename = basename($file, '.csv');
		$type = "Obituary";
		$stmtFileInsert->execute();
	}
	catch(PDOException $e) {
		echo $e->getMessage();
	}
	catch(Exception $e) {
		echo $e->getMessage();
	}

	$conn = null;
	exit(0);
?>
