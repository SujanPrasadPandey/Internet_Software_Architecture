<?php
require_once "db_credentials.php";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get the weather data from the request
    $location = $_POST["location"];
    $weatherData = json_decode($_POST["weatherData"], true);

    // Create a connection to the database
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check if the connection was successful
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Prepare the SQL query to insert the weather data
    $cityName = $conn->real_escape_string($weatherData['cityName']);
    $weatherCondition = $conn->real_escape_string($weatherData['weatherCondition']);
    $weatherIcon = $conn->real_escape_string($weatherData['weatherIcon']);
    $temperature = $weatherData['temperature'];
    $rainfall = $weatherData['rainfall'];
    $windSpeed = $weatherData['windSpeed'];
    $humidity = $weatherData['humidity'];
    $pressure = $weatherData['pressure'];

    $sql = "INSERT INTO $tableName (location, city_name, weather_condition, weather_icon, temperature, rainfall, wind_speed, humidity, pressure)
            VALUES ('$location', '$cityName', '$weatherCondition', '$weatherIcon', $temperature, $rainfall, $windSpeed, $humidity, $pressure)";

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
