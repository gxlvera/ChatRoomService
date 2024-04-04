<?php
    session_start();
    session_unset();
    if (isset($_SESSION['email'])){
        header("Location: chat.php");
    }
    $a = "hi";
    #connect to database
    $db_conn = mysqli_connect("mydb", "dummy", "c3322b", "db3322")
    or die("Connection Error!".mysqli_connect_error());

    #login/register
    if(isset($_POST["email"])&&isset($_POST["password"])&&isset($_POST["type"])){
        $email = $_POST["email"];
        $password = $_POST["password"];
        $type = $_POST["type"];
        
        if ($type=="login"){
            $query = "SELECT * FROM userRecord WHERE email = '$email'";
            $result = mysqli_query($db_conn, $query) 
            or die("<p>Query Error!<br>".mysqli_error($db_conn)."</p>");
    
            #check if user exists and password correctness
            if (mysqli_num_rows($result) > 0){
                $row=mysqli_fetch_array($result);
                if ($row["password"] == $password){
                    $_SESSION['email'] = $email; //Store authenticated variable
                    session_write_close(); //free session lock
                    header("Location: chat.php");
                    echo "Login successful!";
                } else {
                    echo "Login failed. Wrong password!";
                }
            } else {
                echo "Faild to log in. User not found!";
            }
            mysqli_free_result($result);
        } else {
            $query = "SELECT * FROM userRecord WHERE email = '$email'";
            $result = mysqli_query($db_conn, $query)
            or die("<p>Query Error!<br>".mysqli_error($db_conn)."</p>");
            #check duplicate
            if (mysqli_num_rows($result) > 0){
                echo "Failed to register! Already registered before!";
            } else {
                $query = "INSERT INTO userRecord (email, password) VALUES ('$email', '$password')";
                $result = mysqli_query($db_conn, $query)
                or die("<p>Query Error!<br>".mysqli_error($db_conn)."</p>");
                $query = "SELECT * FROM userRecord WHERE email = '$email'";
                $result = mysqli_query($db_conn, $query)
                or die("<p>Query Error!<br>".mysqli_error($db_conn)."</p>");
                if (mysqli_num_rows($result) > 0){
                    
                    $_SESSION['email'] = $email; //Store authenticated variable
                    session_write_close(); //free session lock
                    header("Location: chat.php");
                    echo "Register successful!";
                } else {
                    echo "Failed to register!";
                }
                mysqli_free_result($result);
            }
        }
    }
    mysqli_close($db_conn);

    if(isset($_GET['action'])&&$_GET['action']=='signout'){
        session_unset();
        session_destroy();
        header("Location: login.php");
    
    }
?>

<!DOCTYPE> 
<html> 
    <link rel="stylesheet" href="login.css" type="text/css">
    <body>
    <h1>A Simple Chatroom Service</h1>
            <div id = "inner-box">
                
                    <form id = "loginForm" action="login.php" method="post">
                        <h3>Login to Chatroom</h3>
                        <fieldset>
                            <legend>Login</legend>
                            <input type="hidden" name="type" value="login">
                            <label for="emailLogin">Email:</label>
                            <input name = "email" id = "emailLogin" type = "text" required>
                            <br>
                            <label for ="passwordLogin">Password:</label>
                            <input name = "password" id = "passwordLogin" type = "password" required>
                            <br>
                            <button type = "submit" id="submitLogin">Login</button>
                            <br>
                            <span>Click&nbsp<a  id="toRegister">here</a>&nbspto register an account.</span>
                        </fieldset>
                    </form>
                <span id= "alertMsgLogin"></span>
                <span id = "alertAfterLogin"><span>
                
                <form id = "registerForm" action="login.php" method="post">
                    <input type="hidden" name="type" value="register">
                    <label for="emailRegister">Email:</label>
                    <input name = "email" id = "emailRegister" type = "text" required>
                    <br>
                    <label for ="passwordRegister">Password:</label>
                    <input name = "password" id = "passwordRegister" type = "password" required>
                    <br>
                    <label for ="repeatPassword">Repeat Password:</label>
                    <input name = "repeatPassword" id = "repeatPassword" type = "password" required>
                    <br>
                    <button type = "submit" id="submitRegister">submit</button>
                    <br>
                    <span>Click&nbsp<a  id="toLogin">here</a>&nbspto log in.</span>
                    <p id= "alertMsgRegister"></p>
                </form>
            </div>
            
            
    
        <script src = "login.js"></script>
    </body>
</html>