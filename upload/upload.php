<!DOCTYPE HTML>
<html>
    <head>
        <title>Upload Spreadsheet</title>
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
                        <li class="active"><a href="#">Upload Data<span class="sr-only">(current)</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="col-sm-6">
                <form action="submit.php" method="POST" enctype="multipart/form-data">
                    <div class="form-group">
                        <input type="hidden" name="MAX_FILE_SIZE" value="10240000">
                        <label for="upload">Upload your file</label>                    
                        <input type="file" name="xlsfile" id="upload" />
                    </div>
                    <button type="submit" class="btn btn-default">Upload</button>
                </form>
            </div>
            <?php
            $mysqli = mysqli_connect('localhost', 'root', '', 'obits2');
            if($mysqli->connect_errno) {
				echo "Connect failed" . $mysqli->connect_error;
				echo "<script type='text/javascript'>alert('there was a problem connecting');</script>";
			}
            $searchString = 'SELECT * FROM Files ORDER BY uploaddate DESC';
            $results = $mysqli->query($searchString);
            ?>
            <div class="col-sm-6">
                <h2>List of Files Uploaded</h2>
                <form id="removeFiles" action="remove.php" method="POST">
                    <table class="table">
                        <tr><th></th><th>Upload Date</th><th>File Name</th><th>Type</th></tr>
                        <?php
                        if($results !== FALSE) {
                            while($row = $results->fetch_assoc()) {
                                echo '<tr><td><input type="checkbox" id="removeFile" data-file="' . $row['filename'] . '"></td><td>' . $row['uploaddate'] . '</td><td>' . $row['filename'] . '</td><td>' . $row['type'] . '</td></tr>';
                            }
                        }
                        $mysqli->close();
                        ?>
                    </table>
                    <input type="hidden" name="files" id="files">
                    <input type="submit" value="Remove" id="removeButton">
                </form>
            </div>
        </div>
        <script>
            $(document).ready(function() {
                var fileList = [];
                $("body").on('click', '#removeFile', function() {
                    debugger;
                    fileList.push($(this).data('file'));
                });
                $("#removeButton").click(function() {
                    debugger;
                //    event.preventDefault();
                    document.getElementById("files").value = fileList;
                    $("#removeFiles").submit();
                });
            });

        </script>
    </body>
</html>