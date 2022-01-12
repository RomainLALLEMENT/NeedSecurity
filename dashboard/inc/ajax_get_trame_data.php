<?php
require_once ('../../inc/bases.php');

if(empty($_GET['trameid'])){
    exit;
}

$trameid = intval($_GET['trameid']);
$sql = "SELECT * FROM trames WHERE id = " . $trameid;
$query = $pdo->prepare($sql);
$query->execute();
if($query->rowCount() > 0){
    $trame = $query->fetch();

    $trame['frame_date'] = dateToRead($trame['frame_date']);
    $trame['ip_from'] = hexadecimalCipher($trame['ip_from']);
    $trame['ip_dest'] = hexadecimalCipher($trame['ip_dest']);

    $json = json_encode($trame, JSON_PRETTY_PRINT);
    echo $json;
}
die();