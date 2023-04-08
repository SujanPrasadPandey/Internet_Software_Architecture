<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>associative array cities</title>
</head>
<body>
<?php

$cities = array(
    'Nepal' => 'Kathmandu',
    'Japan' => 'Tokyo',
    'Mexico' => 'Mexico City',
    'USA' => 'New York City',
    'India' => 'Mumbai',
    'Korea' => 'Seoul',
    'China' => 'Shanghai',
    'Nigeria' => 'Lagos',
    'Argentina' => 'Buenos Aires',
    'Egypt' => 'Cairo',
    'England' => 'London'
);

?>

<form method="post">
    <label>Please choose a city:</label>
    <select name="city">
        <?php
        foreach ($cities as $country => $city) {
            echo '<option value="' . $city . '">' . $city . '</option>';
        }
        ?>
    </select>
    <input type="submit" name="submit" value="Submit">
</form>

<?php

if (isset($_POST['submit'])) {
    $city = $_POST['city'];

    $country = array_search($city, $cities);

    echo $city . " is in " . $country . ".";
}

?>

</body>
</html>
