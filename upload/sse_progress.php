<?php
    header('Content-Type: text/event-stream');
    header('Content-Type: text/event-stream');
    // recommended to prevent caching of event data.
    header('Cache-Control: no-cache'); 
  
    function send_message($id, $message, $progress) {
        $d = array('message' => $message , 'progress' => $progress);
        
        echo "id: $id" . PHP_EOL;
        echo "data: " . json_encode($d) . PHP_EOL;
        echo PHP_EOL;
        
        ob_flush();
        flush();
    }
    session_start();
    $percent = $_SESSION['progress'];
    send_message('whatever', 'message', $percent);
?>