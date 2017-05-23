<!DOCTYPE HTML>
<html>
    <head>
        <title>Results</title>
        <title>Grace A. Dow Memorial Library News and Obituary Search</title>
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
                    <a class="navbar-brand" href="/obits">MDN Search</a>
                </div>
                <div class="collapse navbar-collapse" id="main-menu">
                    <ul class="nav navbar-nav">
                        <li><a href="/obits">New Search<span class="sr-only">(current)</span></a></li>
                        <li><a href="http://www2.midland-mi.org/newspaper/MDNindex.htm" target="_blank">Raw Data</a></li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="upload/upload.php" target="_blank">Upload Data</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container">
            <p><a href="/obits">Back</a></p>
            <h2 class="text-center">Results</h2>
            <div class="row">
                <div class="col-sm-2">
                </div>
                <div class="col-sm-8">
                    <?php
                    $lastname = $_GET['lastname'];
                    $firstname = $_GET['firstname'];
                //   echo "Hello";
                    $mysqli = new mysqli('localhost', 'root', '', 'obits2');
                    if($mysqli->connect_errno) {
                        echo "Connect failed" . $mysqli->connect_error;
                        echo "<script type='text/javascript'>alert('there was a problem connecting');</script>";
                    } else {
                //     echo "Opened database";
                    }
                    $searchString = 'SELECT lastname, firstname, birthyear, birthdate, deathyear, deathdate, obityear, obitdate, page FROM Obituaries WHERE lastname = "' . $lastname . '"';
                    if($firstname) {
                        $searchString .= ' AND firstname LIKE "%' . $firstname . '%"';
                    }
                //   echo $searchString;
                    $results = $mysqli->query($searchString);
                // echo "Got results";
                    if($results !== FALSE) {
                    // echo "queried database";
                        if($results->num_rows > 0) {
                            echo '<p>' . $results->num_rows . ' Results</p>';
                            echo '<table class="table table-striped"><tr><th>No.</th><th>Last Name</th><th>First Name</th><th>Birth Data</th><th>Death Date</th><th>Obituary Date</th><th>Page</th></tr>';
                            $count = 0;
                            while($row = $results->fetch_assoc()) {
                                $count++;
                                echo "<tr><td>" . $count . "</td><td>" . $row["lastname"] . "</td><td>" . $row["firstname"] . "</td><td>" . $row["birthdate"] . " " . $row['birthyear'] . "</td><td>" . $row["deathdate"] . " " . $row["deathyear"] . "</td><td>" . $row['obitdate'] . " " . $row['obityear'] . "</td><td>" . $row['page'] . "</td></tr>";
                            }
                            echo "</table>";
                        } else {
                            echo "No results";
                        }
                    } else {
                        echo "Error getting results";
                    }
                //   echo "Hello World";
                //   echo $results;
                    
                    $mysqli->close();
                    ?>
                </div>
                <div class="col-sm-2">
                </div>
            </div>
        </div>
    </body>
</html>