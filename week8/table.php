<!DOCTYPE html>
<html>
<head>
	<title>View Employee Table</title>
</head>
<body>
	<table border="1">
		<tr>
			<th>Employee ID</th>
			<th>Name</th>
			<th>Address</th>
			<th>Email</th>
		</tr>
		<?php
			$conn = mysqli_connect("localhost", "root", "", "isa_herald");
			$sql = "SELECT * FROM employee";
			$result = mysqli_query($conn, $sql);
			while ($row = mysqli_fetch_assoc($result)) {
				echo "<tr>";
				echo "<td>".$row['empId']."</td>";
				echo "<td>".$row['name']."</td>";
				echo "<td>".$row['address']."</td>";
				echo "<td>".$row['email']."</td>";
				echo "</tr>";
			}
			mysqli_close($conn);
		?>
	</table>
</body>
</html>
