<?php
    session_start();
    if (!isset($_SESSION['email'])){
        header("Location: login.php");
    }
    if(!isset($_SESSION['time'])){
        $_SESSION['time'] = time()*1000;

    }
    

?>

<!DOCTYPE>
<html>
<link rel="stylesheet" href="chat.css" type="text/css">
<body>
    <h2>A Simple Chatroom Service</h2>
   
    <div id="out-container">
        
        <button id = "logout" >Logout</button>

        <div id = "msg-container">
        </div>

        <div id = "form-container">
            <form id ="msg-form">
                <textarea name = "message" id="message"></textarea>
                <button id="send-msg">Send</button>
            </form>
        </div>
    <div>
    <script src = "chat.js"></script>
</body>
</html> 
