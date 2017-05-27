<!DOCTYPE HTML>
<html>
    <head>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

        <!-- Optional theme -->
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <!-- Latest compiled and minified JavaScript -->
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
        <script src="submit.js"></script>
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
                        <li class="active"><a href="upload.html">Upload Data<span class="sr-only">(current)</a></li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container">
            

            <?php
            if($_FILES['xlsfile']['name'])
            {
                if(!$_FILES['xlsfile']['error'])
                {
                    $valid_file = true;
                    $new_file_name = strtolower($_FILES['xlsfile']['tmp_name']);
                    if($_FILES['xlsfile']['size'] > (10240000))
                    {
                        $valid_file = false;
                        $message = 'The file is too large';
                    }
                    if($valid_file)
                    {
                        $currentdir = getcwd();
                        $target = $currentdir . '/uploads/' . basename($_FILES['xlsfile']['name']);
                        echo $target;
                        move_uploaded_file($_FILES['xlsfile']['tmp_name'], $target);
                        $message = 'Upload successful';
                    }
                }
                else
                {
                    $message = 'Your upload triggered the following error: '.$_FILES['xlsfile']['error'];
                }
            }
            else 
            {
                $message = 'Something went wrong.  We didnt get the file';
            }
            ?>
            <p><?php echo $message; ?></p>
            <form action="process.php" method="POST">
                <div class="form-group">
                    <label for="process">Begin Processing (This will take a while don't click again)</label>
                    <input type="hidden" name="filesent" value="<?php echo $target; ?>">
                </div>
                <div class="radio" id="obitLabel">
                    <label>
                        <input type="radio" name="typeSelector" id="obit" value="obit" checked>
                        Upload Obituary File
                    </label>
                </div>
                <div class="radio" id="newsLabel">
                    <label>
                        <input type="radio" name="typeSelector" id="news" value="news">
                        Upload News File
                    </label>
                </div>
                <div class="radio" id="weddingsLabel">
                    <label>
                        <input type="radio" name="typeSelector" id="weddings" value="weddings">
                        Upload Weddings-Anniversaries File
                    </label>
                </div>
                <button id="processButton" type="button" class="btn btn-default" name="submit">Process</button>
            </form>
        </div>
        <div id="workingModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="workingModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="workingModalLabel">Working...</h4>
                    </div>
                    <div class="modal-body">
                        <div class="progress">
                            <div id="progressor" class="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%;">
                                <span id="percentage" class="sr-only">60% Complete</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <div id="finishedModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="finishedModalLabel">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="finishedModalLabel">Upload Complete</h4>
                    </div>
                    <div class="modal-body">
                    </div>
                    <div class="modal-footer">
                        <button 
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
    </body>
</html>