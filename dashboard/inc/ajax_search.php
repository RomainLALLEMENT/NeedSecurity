<?php
require_once ('../../inc/bases.php');
$limite = 50;

function addItemInArrayIfNotExist($ar, $item){
    if(count($ar) >= 20){
        return $ar;
    }
    if(!in_array($item, $ar)){
        $ar[] = $item;
    }
    return $ar;
}

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
$tramesFound['autocompletion'] = [];
$correspondanceLaPlusProche = '';
$maxCorrespondances = count($search_keys);
$cpt = 0;
for($i = 0; $i < count($trames); $i++){
    $trames[$i]['ip_from'] = hexadecimalCipher($trames[$i]['ip_from']);
    $trames[$i]['ip_dest'] = hexadecimalCipher($trames[$i]['ip_dest']);
    $trames[$i]['frame_date'] = dateToRead($trames[$i]['frame_date']);
    $correspondances = 0;
    foreach($search_keys as $search_key){
        if(str_contains($trames[$i]['frame_date'], $search_key)){
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['frame_date']);
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['frame_date'].' '.$trames[$i]['protocol_name']);
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['frame_date'].' '.$trames[$i]['ip_from']);
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['frame_date'].' '.$trames[$i]['ip_dest']);
            $correspondances++;
            $correspondanceLaPlusProche .= ' '.$trames[$i]['frame_date'];
        }
        elseif(str_contains(strtolower($trames[$i]['identification']), $search_key)){
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['identification']);
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['identification'].' '.$trames[$i]['protocol_name']);
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['identification'].' '.$trames[$i]['ip_from']);
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['identification'].' '.$trames[$i]['ip_dest']);
            $correspondances++;
            $correspondanceLaPlusProche .= ' '.$trames[$i]['identification'];
        }
        elseif(str_contains(strtolower($trames[$i]['flags_code']), $search_key)){
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['flags_code']);
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['flags_code'].' '.$trames[$i]['protocol_name']);
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['flags_code'].' '.$trames[$i]['ip_from']);
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['flags_code'].' '.$trames[$i]['ip_dest']);
            $correspondances++;
            $correspondanceLaPlusProche .= ' '.$trames[$i]['flags_code'];
        }
        elseif(str_contains(strtolower($trames[$i]['protocol_name']), $search_key)){
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['protocol_name']);
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['protocol_name'].' '.$trames[$i]['ip_from']);
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['protocol_name'].' '.$trames[$i]['ip_dest']);
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['protocol_name'].' '.$trames[$i]['flags_code']);
            $correspondances++;
            $correspondanceLaPlusProche .= ' '.$trames[$i]['protocol_name'];
        }
        elseif(str_contains(strtolower($trames[$i]['ip_from']), $search_key)){
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['ip_from']);
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['ip_from'].' '.$trames[$i]['protocol_name']);
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['ip_from'].' '.$trames[$i]['ip_dest']);
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['ip_from'].' '.$trames[$i]['flags_code']);
            $correspondances++;
            $correspondanceLaPlusProche .= ' '.$trames[$i]['ip_from'];
        }
        elseif(str_contains(strtolower($trames[$i]['ip_dest']), $search_key)){
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['ip_dest']);
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['ip_dest'].' '.$trames[$i]['protocol_name']);
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['ip_dest'].' '.$trames[$i]['ip_from']);
            $tramesFound['autocompletion'] = addItemInArrayIfNotExist($tramesFound['autocompletion'], $trames[$i]['ip_dest'].' '.$trames[$i]['flags_code']);
            $correspondances++;
            $correspondanceLaPlusProche .= ' '.$trames[$i]['ip_dest'];
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

$correspondanceLaPlusProche = substr($correspondanceLaPlusProche,1);
for($i = 0;$i<count($tramesFound);$i++){

}

$json = json_encode($tramesFound, JSON_PRETTY_PRINT);
die($json);