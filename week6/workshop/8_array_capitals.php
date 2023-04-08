<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Array Capital</title>
</head>
<body>
<?php

    function print_with_commas($value) {
        foreach($value as $val) {
            echo $val . ", ";
        }
    }


    $capital = array('Kathmandu', 'Tokyo', 'Mexico City', 'New York City', 'Mumbai', 'Seoul', 'Shanghai', 'Lagos', 'Buenos Aires', 'Cairo', 'London');

    echo "Printing the initial capitals using commas as separators, using loop: ";
    print_with_commas($capital);

    sort($capital);

    echo "<br>After sorting: ";
    print_with_commas($capital);

    $capital1 = array('Los Angeles', 'Calcutta', 'Osaka', 'Beijing');

    $capital_merged = array_merge($capital, $capital1);

    echo "<br>After merging initial capitals with new capitals: ";
    print_with_commas($capital_merged);

    sort($capital_merged);

    echo "<br>After sorting: ";
    print_with_commas($capital_merged);

?>

</body>
</html>