<?php
// Assuming you have a MySQL database connection set up
require_once "db_credentials.php";

// Step 6: After getting the JSON data, script.js will then run populate_table.php, which will save the weather data to the MySQL database table.

// Assuming you receive the weather data as a POST parameter named "weatherData"
$weatherData = $_POST["weatherData"];

// Create a new database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the database connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare the SQL statement to insert the weather data into the table
$stmt = $conn->prepare("INSERT INTO your_table_name (weather_data) VALUES (?)");
$stmt->bind_param("s", $weatherData);
$stmt->execute();

// Close the database connection
$stmt->close();
$conn->close();
?>
