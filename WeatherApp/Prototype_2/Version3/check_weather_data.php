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

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // Get the city parameter
    $city = $_GET["city"];

    // Prepare the SQL statement to retrieve weather data for the past 7 days
    $stmt = $conn->prepare("SELECT * FROM weather_data WHERE location = ? AND date >= DATE_SUB(NOW(), INTERVAL 7 DAY) ORDER BY date DESC");
    $stmt->bind_param("s", $city);
    $stmt->execute();
    $result = $stmt->get_result();

    $weather_data = array();
    if ($result->num_rows > 0) {
        // Loop through the results and add them to the weather_data array
        while ($row = $result->fetch_assoc()) {
            $weather_data[] = array(
                "city" => $row["location"],
                "description" => $row["description"],
                "temperature" => $row["temperature"],
                "humidity" => $row["humidity"],
                "pressure" => $row["pressure"],
                "wind_speed" => $row["wind_speed"],
                "date" => $row["date"],
                "time" => $row["time"],
            );
        }
    }

    // Return the weather data as JSON
    header("Content-Type: application/json");
    echo json_encode($weather_data);
}
