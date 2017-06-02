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
        formData.append('xlsfile', file[0]);
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
                console.log(JSON.stringify(data));
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
                 //   debugger;
                    console.log(JSON.stringify(data));
                }
            });
        }   
    });
    
    $("#obitButton").click(function() {
        $.ajax({
            url: 'process.php',
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
                console.log(JSON.stringify(data));
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
               //     debugger;
                    console.log(JSON.stringify(data));
                }
            });
        }      
    });
    $("#weddingButton").click(function() {
        $.ajax({
            url: 'processWeddings.php',
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
                console.log(JSON.stringify(data));
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
                //    debugger;
                    console.log(JSON.stringify(data));
                }
            });
        }   
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
                clearInterval(window.progressInterval);
                $("#workingModal").modal('hide');
                loadFileList();
            },
            error: function(error) {
                clearInterval(window.progressInterval);
                $("#workingModal").modal('hide');                
                window.alert("There was an error");
                loadFileList();
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
                //    debugger;
                    console.log(JSON.stringify(data));
                }
            });
        }   
       /* function getProgress() {
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
        getProgress();     */   
     //   debugger;
    //    event.preventDefault();
    /*    document.getElementById("files").value = JSON.stringify(fileList);
        $("#removeFiles").submit();*/
    });

// New Progress


});