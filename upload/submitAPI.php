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
echo $message;
?>