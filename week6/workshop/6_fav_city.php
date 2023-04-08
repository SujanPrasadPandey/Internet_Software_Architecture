<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fav_City</title>
</head>
<body>
<form method="post">
		<label for="city">What is your favorite city?</label>
		<input type="text" name="city" id="city">
		<br>
		<input type="submit" value="Submit">
	</form>
    <?php
    if(isset($_POST['city'])) {
        $city = $_POST['city'];
        echo "<p>Your favorite city is $city.</p>";
    }
    ?>
</body>
</html>