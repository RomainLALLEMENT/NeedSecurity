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

define('HX', 16);
function hexadecimalCipher($value){
    $cypher = [
        '0'=>0,
        '1'=>1,
        '2'=>2,
        '3'=>3,
        '4'=>4,
        '5'=>5,
        '6'=>6,
        '7'=>7,
        '8'=>8,
        '9'=>9,
        'a'=>10,
        'b'=>11,
        'c'=>12,
        'd'=>13,
        'e'=>14,
        'f'=>15
    ];
    $toHexa = [];
    $diz = 0;
    $unit = 0;
    $valueSplit = str_split($value);
    for($i = 0; $i < count($valueSplit); $i++){
        if (in_array($valueSplit[$i], $cypher))
        {
            if($i % 2 == 0) {
                $diz = $cypher[$valueSplit[$i]];
            } else{
                $unit = $cypher[$valueSplit[$i]];
                $toHexa[] = $diz * HX + $unit;
            }
        } else {
            return 'error';
        }
    }
    return implode(".", $toHexa);
}
