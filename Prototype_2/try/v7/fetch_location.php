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

    // Execute the query
    $result = $conn->query($sql);

    // Check if the location exists in the table
    if ($result->num_rows > 0) {
        // Fetch all rows for the given location
        $rows = $result->fetch_all(MYSQLI_ASSOC);

        // Print the weather data of each row
        foreach ($rows as $row) {
            echo "<h3>Location: " . $row['city_name'] . "</h3>";
            echo "Weather Condition: " . $row['weather_condition'] . "<br>";
            echo "Temperature: " . $row['temperature'] . "°C<br>";
            echo "Rainfall: " . $row['rainfall'] . "mm<br>";
            echo "Wind Speed: " . $row['wind_speed'] . "m/s<br>";
            echo "Humidity: " . $row['humidity'] . "%<br>";
            echo "Pressure: " . $row['pressure'] . "hPa<br><br>";
        }
    } else {
        echo "No weather data found for the location '$location'.";
    }

    // Close the database connection
    $conn->close();
}
?>
