<?php
include "db_credentials.php";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$city = $_POST["city"];

// Check if the past week's weather data exists in the database
$query = "SELECT * FROM $tableName WHERE city_name = '$city'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    // Fetch and return the data from the database
    $row = $result->fetch_assoc();
    $weatherData = [
        "name" => $row["city_name"],
        "weather" => [
            [
                "description" => $row["weather_condition"],
                "icon" => $row["weather_icon"]
            ]
        ],
        "main" => [
            "temp" => $row["temperature"],
            "humidity" => $row["humidity"]
        ],
        "wind" => [
            "speed" => $row["wind_speed"]
        ]
    ];
    echo json_encode($weatherData);
} else {
    // Retrieve the past week's weather data from the OpenWeatherMap API
    $apiKey = "cdd1228da4be2430078ccf5f80d3d1f7";
    $pastWeekWeatherData = []; // Replace this with the actual retrieval of past week's weather data

    // Store the weather data in the database
    $query = "INSERT INTO $tableName (location, city_name, weather_condition, weather_icon, temperature, humidity, wind_speed) VALUES ('', '$city', '', '', 0, 0, 0)";
    $conn->query($query);

    echo json_encode($pastWeekWeatherData);
}

$conn->close();
?>
