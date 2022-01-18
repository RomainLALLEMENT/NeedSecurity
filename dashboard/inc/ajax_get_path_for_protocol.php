<?php
require_once ('../../inc/bases.php');

if(empty($_GET['protocolName'])){
    exit;
}

$protocol_name = trim(strip_tags($_GET['protocolName']));
if(mb_strlen($protocol_name) == 0){
    exit;
}

$sql = "SELECT identification FROM trames WHERE protocol_name = '".$protocol_name."' GROUP BY identification ORDER BY frame_date";
$query = $pdo->prepare($sql);
$query->execute();
$protocol_data = $query->fetchAll();

$chemins = [];
$cpt = 0;
foreach($protocol_data as $data){
    $sql = "SELECT id,flags_code,ip_from,ip_dest FROM trames WHERE identification = '".$data['identification']."' ORDER BY frame_date";
    $query = $pdo->prepare($sql);
    $query->execute();
    $flags_codes = $query->fetchAll();

    $last_identifiant = '';
    for ($i = 0; $i < $query->rowCount(); $i++){
        if($last_identifiant === '' || $last_identifiant !== $data['identification']){

            if($query->rowCount() == 2){
                $chemins[$cpt][] = [
                    'id' => $flags_codes[$i]['id'],
                    'identification' => $data['identification'],
                    'flags_code_aller' => $flags_codes[$i]['flags_code'],
                    'flags_code_retour' => $flags_codes[$i+1]['flags_code'],
                    'ip_from' => hexadecimalCipher($flags_codes[$i]['ip_from']),
                    'ip_dest' => hexadecimalCipher($flags_codes[$i]['ip_dest']),
                    'statut' => 'retour-valide',
                    'trajet' => 'aller-retour'
                ];
            }
            else{
                $chemins[$cpt][] = [
                    'id' => $flags_codes[$i]['id'],
                    'identification' => $data['identification'],
                    'flags_code_aller' => $flags_codes[$i]['flags_code'],
                    'ip_from' => hexadecimalCipher($flags_codes[$i]['ip_from']),
                    'ip_dest' => hexadecimalCipher($flags_codes[$i]['ip_dest']),
                    'statut' => 'retour-error',
                    'trajet' => 'aller-retour'
                ];
            }
            $last_identifiant = $data['identification'];
        }
    }
    $cpt++;
}

$json = json_encode($chemins, JSON_PRETTY_PRINT);
die($json);