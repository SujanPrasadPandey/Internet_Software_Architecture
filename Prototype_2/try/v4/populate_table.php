<?php
require_once "db_credentials.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the weather data from the request
    $location = $_POST["location"];
    $weatherData = $_POST["weatherData"];

    // Create a connection to the database
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check if the connection was successful
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare the SQL query to insert the weather data
    $sql = "INSERT INTO $tableName (location, weather_data) VALUES ('$location', '$weatherData')";

    // Execute the SQL query
    if ($conn->query($sql) === true) {
        echo "Weather data saved successfully!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close the database connection
    $conn->close();
}
?>
