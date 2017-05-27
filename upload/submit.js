$(document).ready(function() {
    $("#processButton").click(function() {
        $.ajax({
            url: $("form").attr("action"),
            method: 'POST',
            data: $("form").serialize(),
            success: function(data) {
             //   window.alert(JSON.stringify(data));
             $("#workingModal").modal('hide');
            },
            error: function(data) {
                $("#workingModal").modal('hide');
                window.alert(JSON.stringify(data));
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
        $("#workingModal").modal({
            backdrop: 'static',
            keyboard: false
        });
        $("#workingModal").modal('show');
        getProgress();        
        $("#processButton").text('Processing...');
        $("#processButton").addClass('disabled');
    });
    $("#newsLabel").click(function() {
        $("form").attr("action", "processNews.php");
    });
    $("#obitLabel").click(function() {
        $("form").attr("action", "process.php");
    });
    $("#weddingsLabel").click(function() {
        $("form").attr("action", "processWeddings.php");
    });
});