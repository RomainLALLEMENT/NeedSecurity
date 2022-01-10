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

function insert_json_frames($json_file)
{
    global $pdo;
    $data = file_get_contents($json_file);
    if (mb_strlen($data) > 0) {
        $frames = json_decode($data);

        foreach ($frames as $frame) {
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
}


