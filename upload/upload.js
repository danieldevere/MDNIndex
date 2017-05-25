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
        }
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
    });
    $("#removeButton").click(function() {
        debugger;
        var deleteList = $("#removeFile:checked");
        var list = [];
        for(x in deleteList) {
            var item = fileList.find(function(a) { return a.id = deleteList[x].data('id');});
            list.push(item);
        }
      //  debugger;
        $.ajax({
            url: 'remove.php',
            data: list,
            type: 'POST',
            dataType: 'json',
            success: function(data) {
                window.alert(JSON.stringify(data));
            },
            error: function(data) {
                window.alert(JSON>stringify(data));
            }
        });
        debugger;
    //    event.preventDefault();
    /*    document.getElementById("files").value = JSON.stringify(fileList);
        $("#removeFiles").submit();*/
    });
});