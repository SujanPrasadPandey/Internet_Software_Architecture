<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form method="post">
        <label for="weekDay">Enter a day of the week:</label>
        <input type="text" name="weekDay" id="weekDay">
        <br>
        <input type="submit" value="Submit">
    </form>

    <?php
    if(isset($_POST['weekDay'])) {
        $weekDay = $_POST['weekDay'];

        $weekDay = strtolower(trim($weekDay));

        if($weekDay == "monday") {
            echo "<p>Laugh for Monday, laugh for danger.</p>";
        } else if ($weekDay == "tuesday") {
            echo "<p>Laugh on Tuesday, smile at a stranger.</p>";
        } else if ($weekDay == "wednesday") {
            echo "<p>Laugh on Wednesday, laugh for a letter.</p>";
        } else if ($weekDay == "thursday") {
            echo "<p>Laugh on Thursday, something better.</p>";
        } else if ($weekDay == "friday") {
            echo "<p>Laugh on Friday, laugh for sorrow.</p>";
        } else if ($weekDay == "saturday") {
            echo "<p>Laugh on Saturday, joy tomorrow.</p>";
        } else if ($weekDay == "sunday") {
            echo "<p>DO NOTHING ON SUNDAY.</p>";
        } else {
            echo "<p>INPUT WRONG MAYBE. Give week day. Example: Monday, Tuesday, etc.</p>";
        }
    }
    ?>
</body>
</html>
