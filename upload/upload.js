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
        debugger;
        var deleteList = [];
        var list = $('#removeFile:checked').map(function() {
            return $(this).data('id');
        }).get();
        for(x in list) {
            var item = fileList.find(function(a) {
                return a.id == list[x];
            });
            deleteList.push(item);
            window.alert(JSON.stringify(deleteList));
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
                debugger;
           //     $("#workingModal").modal('hide');
            //    window.alert(JSON.stringify('Success!'));
                loadFileList();
            },
            error: function(error) {
                $("#workingModal").modal('hide');                
                debugger;
                window.alert("There was an error");
                loadFileList();
            }
        });
        $("#workingModal").modal('show');
        startTask();
     //   debugger;
    //    event.preventDefault();
    /*    document.getElementById("files").value = JSON.stringify(fileList);
        $("#removeFiles").submit();*/
    });


    var es;
    function startTask() {
        es = new EventSource('sse_progress.php');
        
        //a message is received
        es.addEventListener('message', function(e) {
            var result = JSON.parse( e.data );

            console.log(result.message); 
            
            if(e.lastEventId == 'CLOSE') {
            //    addLog('Received CLOSE closing');
                console.log('Received CLOSE');
                es.close();
                var pBar = document.getElementById('progressor');
                pBar.style.width = '100%'; //max out the progress bar
                $('#workingModal').modal('close');
            }
            else {
                var pBar = document.getElementById('progressor');
                console.log(result.progress);
                pBar.style.width = result.progress + '%';
                var perc = document.getElementById('percentage');
                perc.innerHTML   = result.progress  + "%";
           //     perc.style.width = (Math.floor(pBar.clientWidth * (result.progress/100)) + 15) + 'px';
            }
        });
        
/*        es.addEventListener('error', function(e) {
            console.log('Error occurred');
            es.close();
        });*/
    }
        
    function stopTask() {
        es.close();
        console.log('Interrupted');
    }
});