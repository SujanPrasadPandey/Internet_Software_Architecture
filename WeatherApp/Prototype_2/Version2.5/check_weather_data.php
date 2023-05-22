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

    // Prepare the SQL statement
    $stmt = $conn->prepare("SELECT * FROM weather_data WHERE location = ?");
    $stmt->bind_param("s", $city);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // If data exists in the database for the location, check the last update time
        $row = $result->fetch_assoc();
        $last_updated = strtotime($row["date"] . " " . $row["time"]);
        $current_time = time();

        // If the data was last updated less than 60 minutes ago, return the data from the database
        if (($current_time - $last_updated) < (60 * 60)) {
            $weather_data = array(
                "city" => $row["location"],
                "description" => $row["description"],
                "temperature" => $row["temperature"],
                "humidity" => $row["humidity"],
                "pressure" => $row["pressure"],
                "wind_speed" => $row["wind_speed"],
                "icon" => $row["icon"],
            );
            echo json_encode($weather_data);
            exit();
        }
    }

    // If the data does not exist in the database or if the data is older than 60 minutes, fetch the data from the OpenWeatherMap API
    $url = "https://api.openweathermap.org/data/2.5/weather?q=" . $city . "&units=metric&appid=YOUR_API_KEY";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url);
    $data = curl_exec($ch);
    curl_close($ch);

    $data = json_decode($data, true);

    if ($data["cod"] == 200) {
        // If the data is valid, insert it into the database
        $description = $data["weather"][0]["description"];
        $temperature = $data["main"]["temp"];
        $humidity = $data["main"]["humidity"];
        $pressure = $data["main"]["pressure"];
        $wind_speed = $data["wind"]["speed"];
        $icon = $data["weather"][0]["icon"];

        // Prepare the SQL statement
        $stmt = $conn->prepare("INSERT INTO weather_data (date, time, location, description, temperature, humidity, pressure, wind_speed, icon) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("sssssssss", $date, $time, $city, $description, $temperature, $humidity, $pressure, $wind_speed, $icon);

        // Set the values of the parameters
        date_default_timezone_set('Asia/Kathmandu');
        $date = date('Y-m-d');
        $time = date('H:i:s');

        // Execute the statement
        $stmt->execute();

        // Close the statement
        $stmt->close();

        // Return the data fetched from the API
        $weather_data = array(
            "city" => $data["name"],
            "description" => $description,
            "temperature" => $temperature,
            "humidity" => $humidity,
            "pressure" => $pressure,
            "wind_speed" => $wind_speed,
            "icon" => $icon,
        );

        echo json_encode($weather_data);
        exit();
    } else {
        // If the data is invalid, return an error message
        echo json_encode(array("error" => "Invalid city name"));
        exit();
    }

}

// Close the database connection
$conn->close();
