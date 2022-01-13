<?php
require_once ('../../inc/bases.php');

if(empty($_GET['trameid'])){
    exit;
}

$trameid = intval($_GET['trameid']);
$sql = "SELECT * FROM trames WHERE id = " . $trameid;
$query = $pdo->prepare($sql);
$query->execute();
$json = json_encode($query->fetch(), JSON_PRETTY_PRINT);
echo $json;