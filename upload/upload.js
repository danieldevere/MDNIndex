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
            $.ajax({
                url: 'sse_progress.php',
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

});