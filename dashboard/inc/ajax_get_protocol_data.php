<?php
require_once ('../../inc/bases.php');

if(empty($_GET['protocolName'])){
    exit;
}

$protocol_name = trim(strip_tags($_GET['protocolName']));
if(mb_strlen($protocol_name) == 0){
    exit;
}

$sql = "SELECT identification,flags_code,ip_from,ip_dest FROM trames WHERE protocol_name = '".$protocol_name."' ORDER BY identification";
$query = $pdo->prepare($sql);
$query->execute();
$protocol_data = $query->fetchAll();

$sql = "SELECT identification,flags_code,ip_from,ip_dest FROM trames WHERE protocol_name = '".$protocol_name."' GROUP BY identification";
$query = $pdo->prepare($sql);
$query->execute();
$erreurs_data = $query->fetchAll();
$protocol_data['paquets_count'] = $query->rowCount();

$protocol_data['erreurs'] = [];
foreach($erreurs_data as $tmpData){
    $sql = "SELECT flags_code FROM trames WHERE identification = '".$tmpData['identification']."'";
    $query = $pdo->prepare($sql);
    $query->execute();
    $flags_codes = $query->fetchAll();
    if($query->rowCount() == 2){
        if($flags_codes[0]['flags_code'] !== $flags_codes[1]['flags_code']){
            $protocol_data['erreurs'][] = [$tmpData['identification'], 'different_code'];
        }
    }
    else{
        //$protocol_data['erreurs'][] = [$tmpData['identification'], 'no_response']; // est-ce que c'est vraiment considéré comme une erreur?
    }
}

$json = json_encode($protocol_data, JSON_PRETTY_PRINT);
die($json);