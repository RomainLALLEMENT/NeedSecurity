<?php
require_once ('../../inc/bases.php');

if(empty($_GET['protocolName'])){
    exit;
}

$protocol_name = trim(strip_tags($_GET['protocolName']));
if(mb_strlen($protocol_name) == 0){
    exit;
}

$sql = "SELECT identification,protocol_checksum_status,header_checksum,protocol_type FROM trames WHERE protocol_name = '".$protocol_name."' ORDER BY identification";
$query = $pdo->prepare($sql);
$query->execute();
$protocol_data = $query->fetchAll();
$errors_data['paquets_count'] = $query->rowCount();
$errors_data['erreurs'] = [];
$errors_data['unverified'] = [];

foreach($protocol_data as $tmpData){
    if($tmpData['header_checksum'] === 'unverified'){
        $errors_data['unverified'][] = $tmpData['identification'];
    }
    else if($tmpData['protocol_type'] == 8 || $tmpData['protocol_checksum_status'] === 'disabled'){
        $errors_data['erreurs'][] = $tmpData['identification'];
    }
}

$json = json_encode($errors_data, JSON_PRETTY_PRINT);
die($json);