<body>
<form method="post" >
    <label for="city">City:</label>
    <input type="text" name="city" id="city" required>
    <br>
    <input type="submit" value="Submit">

    <?php
    if(isset($_POST['city'])) {
        $city = $_POST['city'];
        echo "<p>Your favorite city is $city.</p>";
    }else{
        echo "<p>form not submitted</p>";
    }
    ?>
</body>