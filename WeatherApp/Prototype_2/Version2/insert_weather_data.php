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
    $stmt = $conn->prepare("SELECT * FROM weather_data WHERE location = ? AND date BETWEEN DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND CURDATE()");
    $stmt->bind_param("s", $city);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // If data already exists in the database for the location, update it
        $stmt = $conn->prepare("UPDATE weather_data SET date = ?, time = ?, temperature = ?, humidity = ?, wind_speed = ?, pressure = ? WHERE location = ?");
        $stmt->bind_param("sssssss", $date, $time, $temperature, $humidity, $wind_speed, $pressure, $city);
    } else {
        // If data does not exist in the database for the location, insert it
        $stmt = $conn->prepare("INSERT INTO weather_data (date, time, location, temperature, humidity, wind_speed, pressure) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssss", $date, $time, $city, $temperature, $humidity, $wind_speed, $pressure);
    }

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