<?php
// Assuming you have a MySQL database connection set up
require_once "db_credentials.php";

// Step 4: If script.js gets true from check_location.php, it runs fetch_location.php, which will return the weather data of the location typed to the index.html that will show the weather data to the user.
// Step 7: After populate_table.php is run, the main script.js will then run fetch_location.php.

// Assuming you receive the location data as a POST parameter named "location"
$location = $_POST["location"];

// Create a new database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the database connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare the SQL statement to fetch the weather data for the given location
$stmt = $conn->prepare("SELECT weather_data FROM your_table_name WHERE location = ?");
$stmt->bind_param("s", $location);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_assoc();
$weatherData = $data["weather_data"];

// Return the weather data as a JSON response
header("Content-Type: application/json");
echo $weatherData;

// Close the database connection
$stmt->close();
$conn->close();
?>
