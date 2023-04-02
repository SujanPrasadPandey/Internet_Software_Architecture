<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <h1>three</h1>
    <?php
        function ifElseFuncAsk($x){
            if ($x > 0) {
                echo "value is greater than 0";
              } else {
                echo "value is less than or equal to 0";
              }
        }
      $input = readline("Enter a number: ");
      ifElseFuncAsk($input);
      
    ?>
  </body>
</html>
