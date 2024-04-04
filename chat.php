<?php
    session_start();
    if (!isset($_SESSION['email'])){
        header("Location: login.php");
    }

?>

<!DOCTYPE>
<html>
<link rel="stylesheet" href="chat.css" type="text/css">
<body>
    <h1>A Simple Chatroom</h1>
    <div id="out-container">
        <button id = "logout" >Logout</button>
        <div id = "msg-container">

        </div>

        <form id ="msg-form">
            <input name = "message" id="message">
            <button id="send-msg">Send</button>
        </form>
    <div>
    <script src = "chat.js"></script>
</body>
</html> 
