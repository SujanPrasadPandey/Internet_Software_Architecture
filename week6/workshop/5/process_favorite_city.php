<?php
if (isset($_POST['city'])) {
	$city = $_POST['city'];
	echo "Your favorite city is $city.";
} else {
	echo "No city entered.";
}
?>
