$(document).ready(function() {
    $("#processButton").click(function() {
        $.ajax({
            url: $("form").attr("action"),
            method: 'POST',
            data: $("form").serialize(),
            success: function(data) {
                window.alert(JSON.stringify(data));
            },
            error: function(data) {
                window.alert(JSON.stringify(data));
            }
        });
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