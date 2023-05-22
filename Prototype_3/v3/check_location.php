<?php

require_once "db_credentials.php";

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the location from the form
    $location = $_POST["location"];

    // Create a connection to the database
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check if the connection was successful
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare the SQL query
    $sql = "SELECT * FROM $tableName WHERE location = '$location'";
    $result = $conn->query($sql);

    // Check if the location exists in the table
    if ($result->num_rows > 0) {
        echo "Yes";
    } else {
        echo "No";
    }

    // Close the database connection
    $conn->close();
}
?>
