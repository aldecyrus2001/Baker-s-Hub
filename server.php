<?php
include 'connection.php';


if ($_GET["action"] === "insertBakery") {
    $BakeryID = $_POST['bakeryid'];
    $BakeryName = $_POST['bakeryname'];
    $OwnerName = $_POST['ownername'];
    $Address = $_POST['address'];
    $Province = $_POST['province'];
    $Municipality = $_POST['municipality'];
    $Email = $_POST['email'];
    $Password = $_POST['password'];
    $original_certificate_name = $_FILES['certificate']['name'];
    $new_certificate_name = uniqid() . time() . "." . pathinfo($original_certificate_name, PATHINFO_EXTENSION);


    if (move_uploaded_file($_FILES['certificate']['tmp_name'], './bakery_resources/certificate/' . $new_certificate_name)) {
        $sql = "INSERT INTO `bakery`(`BakeryID`, `StoreName`, `OwnerName`, `Address`, `Municipality`, `Province`, `Certificate`, `email`, `password`) 
        VALUES ('$BakeryID','$BakeryName','$OwnerName','$Address','$Municipality','$Province','$new_certificate_name','$Email','$Password')";

        if (mysqli_query($conn, $sql)) {
            echo json_encode([
                "statusCode" => 200,
                "message" => "Data Inserted Successfully"
            ]);
        } else {
            echo json_encode([
                "statusCode" => 400,
                "message" => "Error executing the query:" . mysqli_error($conn)
            ]);
        }
    } else {
        $error_message = "Error uploading certificate file.";
        error_log($error_message);
        $response = array('error' => $error_message);
        echo json_encode($response);
        exit();
    }
}

if ($_GET['action'] === "insertConsumer") {
    $ConsumerID = $_POST['consumerid'];
    $Firstname = $_POST['firstname'];
    $Lastname = $_POST['lastname'];
    $apartment = $_POST['apartment'];
    $street = $_POST['street'];
    $address = $_POST['address'];
    $province = $_POST['province'];
    $municipality = $_POST['municipality'];
    $username = $_POST['username'];
    $consumer_password = $_POST['consumer_password'];

    $sql = "INSERT INTO `consumer`(`ConsumerID`, `Firstname`, `Lastname`, `Apartment`, `Street`, `Address`, `Province`, `Municipality`, `Email`, `Password`) 
    VALUES ('$ConsumerID','$Firstname','$Lastname','$apartment','$street','$address','$province','$municipality','$username','$consumer_password')";
    
    if (mysqli_query($conn, $sql)) {
        echo json_encode([
            "statusCode" => 200,
            "message" => "Data Inserted Successfully"
        ]);
    } else {
        echo json_encode([
            "statusCode" => 400,
            "message" => "Error executing the query:" . mysqli_error($conn)
        ]);
    }
}

if ($_GET['action'] === "loginUser"){
    $Email = $_POST['username'];
    $Password = $_POST['password'];

    // Assuming you have a 'user_type' column in both 'bakery' and 'consumer' tables
    $sql_seller = "SELECT * FROM `bakery` WHERE `email` = '$Email' AND `password` = '$Password'";
    $Sql_consumer = "SELECT * FROM `consumer` WHERE `Email` = '$Email' AND `Password` = '$Password'";

    $result_seller = mysqli_query($conn, $sql_seller);
    $result_consumer = mysqli_query($conn, $Sql_consumer);

    if ($result_seller && mysqli_num_rows($result_seller) > 0) {
        // Seller login successful
        echo json_encode([
            "user_type" => "seller",
            "message" => "Seller login successful"
        ]);
    } elseif ($result_consumer && mysqli_num_rows($result_consumer) > 0) {
        // Consumer login successful
        echo json_encode([
            "user_type" => "consumer",
            "message" => "Consumer login successful"
        ]);
    } else {
        // Login failed
        echo json_encode([
            "user_type" => "unknown",
            "message" => "Invalid credentials"
        ]);
    }
}
