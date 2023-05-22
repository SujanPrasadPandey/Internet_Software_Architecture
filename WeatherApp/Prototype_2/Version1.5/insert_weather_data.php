<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "SujanWeather";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get the weather data
    $city = $_POST["city"];
    $temperature = $_POST["temperature"];
    $humidity = $_POST["humidity"];
    $pressure = $_POST["pressure"];
    $wind_speed = $_POST["wind"];

    // Prepare the SQL statement
    $stmt = $conn->prepare("INSERT INTO weather_data (date, time, location, temperature, humidity, wind_speed, pressure) VALUES (?, ?, ?, ?, ?, ?, ?)");

    // Bind the parameters
    $stmt->bind_param("sssssss", $date, $time, $city, $temperature, $humidity, $wind_speed, $pressure);

    // Set the values of the parameters
    date_default_timezone_set('Asia/Kathmandu');
    $date = date('Y-m-d');
    $time = date('H:i:s');

    // Execute the statement
    $stmt->execute();

    // Close the statement
    $stmt->close();
}

// Close the connection
$conn->close();
