<?php
// Assuming you have a MySQL database connection set up
require_once "db_credentials.php";

// Assuming you receive the location data as a POST parameter named "location"
$location = $_POST["location"];

// Create a new database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the database connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare the SQL statement to check if the location exists in the table
$stmt = $conn->prepare("SELECT COUNT(*) AS count FROM your_table_name WHERE location = ?");
$stmt->bind_param("s", $location);
$stmt->execute();
$result = $stmt->get_result();
$data = $result->fetch_assoc();
$count = $data["count"];

// Return true if the location exists, false otherwise
$response = array("exists" => ($count > 0));
echo json_encode($response);

// Close the database connection
$stmt->close();
$conn->close();

// Debug information
$debugInfo = date("Y-m-d H:i:s") . " - Location: " . $location . " - Exists: " . ($count > 0 ? "true" : "false") . "\n";
file_put_contents("debug.txt", $debugInfo, FILE_APPEND);
?>
