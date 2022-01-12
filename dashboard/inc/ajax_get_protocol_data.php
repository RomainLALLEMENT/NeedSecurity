<?php
require_once ('../../inc/bases.php');

if(empty($_GET['protocolName'])){
    exit;
}

$protocol_name = trim(strip_tags($_GET['protocolName']));
$sql = "SELECT identification,flags_code,ip_from,ip_dest FROM trames WHERE protocol_name = '".$protocol_name."'";
$query = $pdo->prepare($sql);
$query->execute();
$protocol_data = $query->fetchAll();
$json = json_encode($protocol_data, JSON_PRETTY_PRINT);
echo $json;