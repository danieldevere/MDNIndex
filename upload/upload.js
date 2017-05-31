$(document).ready(function() {
    // Classes
    function File(filename, type, uploaddate, id) {
        this.filename = filename;
        this.type = type;
        this.uploaddate = uploaddate;
        this.id = id;
        this.toDelete = false;
        this.row = function() {
            var string = '<tr><td><input data-id="' + this.id + '" type="checkbox" id="removeFile" data-type="' + this.type + '" data-file="' + this.filename + '"></td><td>' + this.uploaddate + '</td><td>' + this.filename + '</td><td>' + this.type + '</td></tr>';
            return string;
        };
    }

    // Globals
    var fileList = [];
    var file;
    // Load file list
    loadFileList();

    // functions
    function loadFileList() {
        $.ajax({
            url: "files.php",
            success: function(data) {
                var files = JSON.parse(data);
                var htmlString = '<tr><th></th><th>Upload Date</th><th>File Name</th><th>Type</th></tr>';
                for(x in files) {
                    var thisFile = new File(files[x].filename, files[x].type, files[x].uploaddate, files[x].id);
                    fileList.push(thisFile);
                    htmlString += thisFile.row();
                }
                document.getElementById("filesTable").innerHTML = htmlString;
            }
        });
    }

    // Events
    $("#uploadFormSubmit").click(function() {
        file = document.getElementById('upload').files;
        var formData = new FormData();
        // Loop through each of the selected files.
  //      if(file[0].type.match('*.csv')) {
            formData.append('xlsfile', file[0]);
      //      window.alert(file[0].name);
   //     } else {
     //       window.alert("Wrong file type");
    //    }
        /*for (var i = 0; i < files.length; i++) {
            var file = files[i];

            // Check the file type.
            if (!file.type.match('*.csv')) {
                window.alert("Wrong file type");
                return;
            }

            // Add the file to the request.
            formData.append('xlsfile', file, file.name);
        }*/
/*        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'submitAPI.php', false);
        xhr.onload = function (data) {
            if(xhr.status === 200) {
                // File(s) uploaded.
                $("#processModal").modal({
                    backdrop: 'static',
                    keyboard: false
                });
                $("#processModal").modal('show');
            } else {
                window.alert('Error');
            }
        };
        xhr.send(formData);*/
        $.ajax({
            url: 'submitAPI.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function(data) {
                $("#processModal").modal({
                    backdrop: 'static',
                    keyboard: false
                });
                $("#processModal").modal('show');
            },
            error: function(data) {
                window.alert(JSON.stringify(data));
            }
        });
    });
    $("#articleButton").click(function() {
        window.pollingPeriod = 100;
        window.progressInterval;
        var fileData = {
            filesent: file.name
        }
      //  debugger;
        $.ajax({
            url: 'processNews.php',
            type: 'POST',
            data: {filesent: file[0].name},
            success: function(data) {
                clearInterval(window.progressInterval);
                $("#workingModal").modal('hide');
                $("#successModal").modal('show');
                loadFileList();
            },
            error: function(data) {
                clearInterval(window.progressInterval);
                window.alert('error');
            }
        });
        $("#processModal").modal('hide');
        $("#workingModal").modal({
            backdrop: 'static',
            keyboard: false
        });
        $("#workingModal").modal('show');
        window.progressInterval = setInterval(updateProgress, window.pollingPeriod);
        function updateProgress() {
            $.ajax({
                url: 'progress.json',
                success: function(data) {
                    console.log(data.percentComplete + ' complete');
                    document.getElementById("progressor").style.width = data.percentComplete + '%';
                },
                error: function(data) {
                    console.log(JSON.stringify(data));
            //        clearInterval(window.progressInterval);
                }
            });
        }






/*        function getProgress() {
            $.ajax({
                url: 'processStatus.php',
                success: function(data) {
                    console.log(data);
                    document.getElementById('progressor').style.width = data + '%';
                    document.getElementById('percentage').innerHTML = data + '%';
                    if(data < 100) {
                        getProgress();
                    } else {
                      //  $("#workingModal").modal('hide');
                    }
                }
            });
        }
        $("#processModal").modal('hide');        
        $("#workingModal").modal({
            backdrop: 'static',
            keyboard: false
        });
        $("#workingModal").modal('show');
        getProgress();  */      
    });
    
    $("#obitButton").click(function() {
        $.ajax({
            url: 'process.php',
            type: 'POST',
            data: {filesent: file[0].name},
            success: function(data) {
                $("#workingModal").modal('hide');
                $("#successModal").modal('show');
                loadFileList();
            },
            error: function(data) {
                window.alert('error');
            }
        });
        function getProgress() {
            $.ajax({
                url: 'processStatus.php',
                success: function(data) {
                    console.log(data);
                    document.getElementById('progressor').style.width = data + '%';
                    document.getElementById('percentage').innerHTML = data + '%';
                    if(data < 100) {
                        getProgress();
                    } else {
                      //  $("#workingModal").modal('hide');
                    }
                }
            });
        }
        $("#processModal").modal('hide');        
        $("#workingModal").modal({
            backdrop: 'static',
            keyboard: false
        });
        $("#workingModal").modal('show');
        getProgress();        
    });
    $("#weddingButton").click(function() {
        $.ajax({
            url: 'processWeddings.php',
            type: 'POST',
            data: {filesent: file[0].name},
            success: function(data) {
                $("#workingModal").modal('hide');
                $("#successModal").modal('show');
                loadFileList();
            },
            error: function(data) {
                window.alert('error');
            }
        });
        function getProgress() {
            $.ajax({
                url: 'processStatus.php',
                success: function(data) {
                    console.log(data);
                    document.getElementById('progressor').style.width = data + '%';
                    document.getElementById('percentage').innerHTML = data + '%';
                    if(data < 100) {
                        getProgress();
                    } else {
                      //  $("#workingModal").modal('hide');
                    }
                }
            });
        }
        $("#processModal").modal('hide');        
        $("#workingModal").modal({
            backdrop: 'static',
            keyboard: false
        });
        $("#workingModal").modal('show');
        getProgress();        
    });
    $("body").on('click', '#removeFile', function() {
    /*    $('#workingModal').modal('show');
        startTask();*/
    });
    $("#removeButton").click(function() {
      //  debugger;
        var deleteList = [];
        var list = $('#removeFile:checked').map(function() {
            return $(this).data('id');
        }).get();
        for(x in list) {
            var item = fileList.find(function(a) {
                return a.id == list[x];
            });
            deleteList.push(item);
  //          window.alert(JSON.stringify(deleteList));
        }
 /*       $('#removeFile:checked').each(function() {
            var item = fileList.find(function(a) {
                return a.id == $(this).data('id');
            });
            deleteList.push(item);
        });*/
      //  debugger;
        $.ajax({
            url: 'remove.php',
            data: {data: JSON.stringify(deleteList)},
            type: 'POST',
            success: function(data) {
                $("#workingModal").modal('hide');
                loadFileList();
            },
            error: function(error) {
                $("#workingModal").modal('hide');                
                window.alert("There was an error");
                loadFileList();
            }
        });
        function getProgress() {
            debugger;
            $.ajax({
                url: 'sse_progress.php',
                success: function(data) {
                    debugger;
                    console.log(data);
                    document.getElementById('progressor').style.width = data + '%';
                    document.getElementById('percentage').innerHTML = data + '%';
                    if(data < 100) {
                        getProgress();
                    } else {
                      //  $("#workingModal").modal('hide');
                    }
                },
                error: function(data) {
                    console.log(data);
                }
            });
        }
        $("#workingModal").modal({
            backdrop: 'static',
            keyboard: false
        });
        $("#workingModal").modal('show');
        getProgress();        
     //   debugger;
    //    event.preventDefault();
    /*    document.getElementById("files").value = JSON.stringify(fileList);
        $("#removeFiles").submit();*/
    });

// New Progress


});