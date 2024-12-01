<?php
    session_start();
    // print_r($_SESSION);

    $db_conn = mysqli_connect("mydb", "dummy", "c3322b", "db3322")
    or die("Connection Error!".mysqli_connect_error());
    // if (!$db_conn){
    //     http_response_code(500);
    //     echo "Database Connection Failed!";
    //     die("Connection Error!".mysqli_connect_error());
    // };
    
    if (isset($_GET['time'])){
        $currentTime = $_GET['time'];
        $oneHourEalier = $currentTime-3600000;

        $query = "SELECT * FROM message WHERE time between $oneHourEalier AND $currentTime";
        $result = mysqli_query($db_conn, $query)
        or die("<p>Query Error!<br>".mysqli_error($db_conn)."</p>");
    
        // if (!$result){
        //     http_response_code(500);
        //     echo "Query Error: SELECT!";
        //     die("<p>Query Error!<br>".mysqli_error($db_conn)."</p>");
        // }
        $response=[];
        array_push($response,$_SESSION['email']);
        if (mysqli_num_rows($result) > 0) {
            $data = mysqli_fetch_all($result,MYSQLI_ASSOC);
            array_push($response,$data);
        } 
        // $lastMsg = $data[count($data)-1];
        // $time = $lastMsg['time'];
        // if ($time<=$currentTime-120000){
        //     http_response_code(401);
        //     session_unset();
        //     session_destroy();
        // }
        
        $lastTime = $_SESSION['time'];

        if ($lastTime<=$currentTime-120000){
            http_response_code(401);
            session_unset();
            session_destroy();
        }
        array_push($response,$currentTime);
        array_push($response,$lastTime);
        echo json_encode($response);
    }


    if (isset($_POST['message'])){
        $message = $_POST['message'];
        $time = $_POST['time'];
        $person = $_SESSION['email'];
        $query = "INSERT INTO message(person,message,time) VALUES('$person','$message','$time')";
        $result = mysqli_query($db_conn, $query)
        or die("<p>Query Error!<br>".mysqli_error($db_conn)."</p>");
        // if (!$result){
        //     http_response_code(500);
        //     echo "Query Error: INSERT!"; 
        //     die("<p>Query Error!<br>".mysqli_error($db_conn)."</p>");
        // }
        $_SESSION['time'] = $time;
    }

?>