<?php
    $db_conn = mysqli_connect("mydb", "dummy", "c3322b", "db3322")
    or die("Connection Error!".mysqli_connect_error());

    #precheck if user exist
    if(isset($_GET["email"])){
        $email = $_GET["email"];
        $query = "SELECT * FROM account WHERE email = '$email'";
        $result = mysqli_query($db_conn, $query) 
        or die("Connection Error!".mysqli_connect_error());
        if(mysqli_num_rows($result) > 0){
            //user exists
            echo 1;
        }
        else {
            //user not exists
            echo 0;
        }
        mysqli_free_result($result);
    }
    mysqli_close($db_conn);
?>