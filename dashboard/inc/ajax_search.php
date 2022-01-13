<?php
require_once ('../../inc/bases.php');
$limite = 50;

if(empty($_GET['search'])){
    exit;
}

$search = strtolower(trim(strip_tags($_GET['search'])));
if (str_contains($search, " ")) {
    $search_keys = explode(" ", $search);
}
else{
    $search_keys = [];
    $search_keys[] = $search;
}

$sql = "SELECT frame_date,identification,flags_code,protocol_name,ip_from,ip_dest FROM trames";
$query = $pdo->prepare($sql);
$query->execute();
$trames = $query->fetchAll();

$tramesFound = [];
$maxCorrespondances = count($search_keys);
$cpt = 0;
for($i = 0; $i < count($trames); $i++){
    $trame['ip_from'] = hexadecimalCipher($trames[$i]['ip_from']);
    $trame['ip_dest'] = hexadecimalCipher($trames[$i]['ip_dest']);
    $trame['frame_date'] = dateToRead($trames[$i]['frame_date']);
    $correspondances = 0;
    foreach($search_keys as $search_key){
        if(str_contains($trames[$i]['frame_date'], $search_key)){
            $correspondances++;
        }
        elseif(str_contains(strtolower($trames[$i]['identification']), $search_key)){
            $correspondances++;
        }
        elseif(str_contains(strtolower($trames[$i]['flags_code']), $search_key)){
            $correspondances++;
        }
        elseif(str_contains(strtolower($trames[$i]['ip_from']), $search_key)){
            $correspondances++;
        }
        elseif(str_contains(strtolower($trames[$i]['ip_dest']), $search_key)){
            $correspondances++;
        }
    }

    if($correspondances == $maxCorrespondances){
        $tramesFound[] = $trames[$i];
        $cpt++;
        if($cpt >= $limite){
            break;
        }
    }
}

$tramesFound['autocompletion'] = [];

$json = json_encode($tramesFound, JSON_PRETTY_PRINT);
die($json);