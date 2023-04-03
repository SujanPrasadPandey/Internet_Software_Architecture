<?php
    function isPalindrome($str){
        $reverseStr = strrev($str);
        if($str === $reverseStr){
            return true;
        }else{
            return false;
        }
    }
    
    $input = "nurses run";
    $inputwithoutspace = str_replace(' ','',$input);
    if(isPalindrome($inputwithoutspace)){
        echo "$input is a palindrome";
    }else{
        echo "$input is NOT a palindrome!!";
    }
?>