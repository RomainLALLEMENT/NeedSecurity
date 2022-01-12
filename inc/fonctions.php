<?php

function showJson($data){
    header("Content-type: application/json");
    $json = json_encode($data, JSON_PRETTY_PRINT);
    if($json){
        die($json);
    }
    else{
        die('error in json encoding');
    }
}

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
        if (array_key_exists($valueSplit[$i], $cypher))
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

function db_get_trames($fieldsArray, $page = 1, $nbRows = 5)
{
    global $pdo;
    $fieldsStr = "";
    foreach ($fieldsArray as $field)
    {
        if(mb_strlen($field) > 0){
            if(mb_strlen($fieldsStr) > 0){
                $fieldsStr .= ',';
            }
            $fieldsStr .= $field;
        }
    }

    $sql = "SELECT ".$fieldsStr." FROM trames ORDER BY id DESC LIMIT ".$nbRows." OFFSET " . (($page-1) * $nbRows);
    $query = $pdo->prepare($sql);
    $query->execute();
    return $query->fetchAll();
}

function insert_json_frames($json_file): bool
{
    global $pdo;
    $success = false;
    $data = file_get_contents($json_file);
    if(mb_strlen($data) > 0) {
        $frames = json_decode($data);

        foreach ($frames as $frame) {
            $success = true;
            $sql = "SELECT id FROM trames WHERE frame_date = :frame_date AND identification = :identification AND protocol_name = :protocol_name";
            $query = $pdo->prepare($sql);
            $query->bindValue(':frame_date', $frame->date, PDO::PARAM_STR);
            $query->bindValue(':identification', $frame->identification, PDO::PARAM_STR);
            $query->bindValue(':protocol_name', $frame->protocol->name, PDO::PARAM_STR);
            $query->execute();
            $count = $query->rowCount();

            if ($count == 0) {
                $sql = "INSERT INTO trames (frame_date,version,header_length,service,identification,flags_code,ttl,protocol_name,protocol_checksum_status,protocol_ports_from,protocol_ports_dest,header_checksum,ip_from,ip_dest)
                VALUES (:dat,:version,:header_length,:service,:identification,:flags_code,:ttl,:protocol_name,:protocol_checksum_status,:protocol_ports_from,:protocol_ports_dest,:header_checksum,:ip_from,:ip_dest)";
                $query = $pdo->prepare($sql);
                $query->bindValue(':dat', $frame->date, PDO::PARAM_STR);
                $query->bindValue(':version', $frame->version, PDO::PARAM_INT);
                $query->bindValue(':header_length', $frame->headerLength, PDO::PARAM_INT);
                $query->bindValue(':service', $frame->service, PDO::PARAM_STR);
                $query->bindValue(':identification', $frame->identification, PDO::PARAM_STR);
                $query->bindValue(':flags_code', $frame->flags->code, PDO::PARAM_STR);
                $query->bindValue(':ttl', $frame->ttl, PDO::PARAM_INT);
                $query->bindValue(':protocol_name', $frame->protocol->name, PDO::PARAM_STR);
                $query->bindValue(':protocol_checksum_status', $frame->protocol->checksum->status, PDO::PARAM_STR);
                $query->bindValue(':protocol_ports_from', $frame->protocol->ports->from, PDO::PARAM_INT);
                $query->bindValue(':protocol_ports_dest', $frame->protocol->ports->dest, PDO::PARAM_INT);
                $query->bindValue(':header_checksum', $frame->headerChecksum, PDO::PARAM_STR);
                $query->bindValue(':ip_from', $frame->ip->from, PDO::PARAM_STR);
                $query->bindValue(':ip_dest', $frame->ip->dest, PDO::PARAM_STR);
                $query->execute();
            }
        }
    }

    return $success;
}

function dateToRead($dateDb){
    $date = new DateTime();
    $date->setTimestamp($dateDb);
    return $date->format('d/m/Y H:i:s');
}





