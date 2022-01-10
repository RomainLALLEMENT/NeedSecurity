<?php

//Debug
function debug($x)
{
    echo '<pre <pre style="height:300px;overflow-y: scroll;font-size: .7rem;padding: .6rem;font-family: Consolas, Monospace;background-color: #000;color:#fff;">';
    print_r($x);
    echo '</pre>';
}

//Clean XSS
function cleanXss($string)
{
    return trim(strip_tags($string));
}


function textValid($err,$value,$key,$min,$max,$empty = true)
{
    if(!empty($value)) {
        if(mb_strlen($value) < $min) {
            $err[$key] = 'Min '.$min.' caracteres';
        } elseif (mb_strlen($value) > $max) {
            $err[$key] = 'Max '.$max.' caracteres';
        }
    } else {
        if($empty) {
            $err[$key] = 'Veuillez renseigner ce champ';
        }
    }
    return $err;
}

function emailValidation($err,$mail,$key)
{
    if(!empty($mail)) {
        if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
            $err[$key] = 'Email non valide';
        }
    } else {
        $err[$key] = 'Veuillez renseigner ce champ';
    }
    return $err;
}

function hexadecimalCipher($value){
    $valueTreat = str_split($value);
    $toHexa = [];
    echo $value;
    foreach ($valueTreat as $val){
        switch ($val){
            case '0':
                $val = 0;
                break;
            case '1':
                $val = 1;
                break;
            case '2':
                $val = 2;
                break;
            case '3':
                $val = 3;
                break;
            case '4':
                $val = 4;
                break;
            case '5':
                $val = 5;
                break;
            case '6':
                $val = 6;
                break;
            case '7':
                $val = 7;
                break;
            case '8':
                $val = 8;
                break;
            case '9':
                $val = 9;
                break;
            case 'a':
                $val = 10;
                break;
            case 'b':
                $val = 11;
                break;
            case 'c':
                $val = 12;
                break;
            case 'd':
                $val = 13;
                break;
            case 'e':
                $val = 14;
                break;
            case 'f':
                $val = 15;
                break;
        }
        $toHexa[] = $val;
    }
    //for each 2 do the first one 16*x + second value
    for($i = 0; $i < count($toHexa); $i++) {
        if($i % 2 == 0){
            $toHexa[$i] = 16* $toHexa[$i];
        }
    }
    $ip = [];
    for($i = 0; $i < count($toHexa); $i += 2){
        $sum = $toHexa[$i] + $toHexa[$i+1];
        $ip[] = $sum;
    }
    //join all with . and return result
     return implode(".", $ip);
}


