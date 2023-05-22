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
        <label>Student Id</label>
        <input type="text" name="studentId" id="">
        <br><br>
        <label>Name</label>
        <input type="text" name="name" id=""><br><br> 
        <label>Address</label>
        <input type="text" name="address" id=""><br><br> 
        <input type="submit" value="Save">
    </form>
    <?php
    if (isset($_POST["name"]) && isset($_POST["address"]) && isset($_POST["studentId"])){
        $name = $_POST["name"];
        $address = $_POST["address"];
        $studentId = $_POST["studentId"];
            
        $conn = mysqli_connect("localhost", "root", "", "isa_herald");
        $sql = "INSERT INTO Student (StudentId, Name, Address) VALUES ('$studentId', '$name', '$address')";
        try {
            mysqli_query($conn, $sql);
        } catch (Exception $e) {
            echo 'Error: ' . mysqli_error($conn);
        }
    }
    ?>
</body>
</html>
