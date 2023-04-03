<?php
function isPrime($givenNumber)
{
    if ($givenNumber < 2) {
        return false;
    }
    for ($x = 2; $x <= sqrt($givenNumber); $x++) {
        if ($givenNumber % $x === 0) {
            return false;
        }
    }
    return true;
}

$input = 100;

for ($y = 2; $y <= $input; $y++) {
    if (isPrime($y)) {
        echo "$y ";
    }
}
?>