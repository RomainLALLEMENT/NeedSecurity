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

function getCorrespondanceIn($trame, $search){
    if(str_contains($trame['frame_date'], $search)){
        return 'frame_date';
    }
    elseif(str_contains(strtolower($trame['identification']), $search)){
        return 'identification';
    }
    elseif(str_contains(strtolower($trame['flags_code']), $search)){
        return 'flags_code';
    }
    elseif(str_contains(strtolower($trame['protocol_name']), $search)){
        return 'protocol_name';
    }
    elseif(str_contains(strtolower($trame['ip_from']), $search)){
        return 'ip_from';
    }
    elseif(str_contains(strtolower($trame['ip_dest']), $search)){
        return 'ip_dest';
    }
    return ">not-found<";
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

/*$tramesFound = [];
$tramesFound['autocompletion'] = [];
$correspondanceLaPlusProche = '';
$maxCorrespondances = count($search_keys);
$cpt = 0;
for($i = 0; $i < count($trames); $i++){
    $trames[$i]['ip_from'] = hexadecimalCipher($trames[$i]['ip_from']);
    $trames[$i]['ip_dest'] = hexadecimalCipher($trames[$i]['ip_dest']);
    $trames[$i]['frame_date'] = dateToRead($trames[$i]['frame_date']);
    $correspondances = [];

    foreach($search_keys as $search_key){
        if(str_contains($trames[$i]['frame_date'], $search_key)){
            $correspondances['frame_date'] = $trames[$i]['frame_date'];
        }
        elseif(str_contains(strtolower($trames[$i]['identification']), $search_key)){
            $correspondances['identification'] = $trames[$i]['identification'];
        }
        elseif(str_contains(strtolower($trames[$i]['flags_code']), $search_key)){
            $correspondances['flags_code'] = $trames[$i]['flags_code'];
        }
        elseif(str_contains(strtolower($trames[$i]['protocol_name']), $search_key)){
            $correspondances['protocol_name'] = $trames[$i]['protocol_name'];
        }
        elseif(str_contains(strtolower($trames[$i]['ip_from']), $search_key)){
            $correspondances['ip_from'] = $trames[$i]['ip_from'];
        }
        elseif(str_contains(strtolower($trames[$i]['ip_dest']), $search_key)){
            $correspondances['ip_dest'] = $trames[$i]['ip_dest'];
        }
    }

    if(count($correspondances) > 0){
        $tramesFound[] = $trames[$i];
        $cpt++;
        if($cpt >= $limite){
            break;
        }
    }
}*/

// NOUVELLE VERSION
$tramesFound = [];
$tabAutoComplete = [];

for($i = 0; $i < count($trames); $i++) {
    $trames[$i]['ip_from'] = hexadecimalCipher($trames[$i]['ip_from']);
    $trames[$i]['ip_dest'] = hexadecimalCipher($trames[$i]['ip_dest']);
    $trames[$i]['frame_date'] = dateToRead($trames[$i]['frame_date']);
    $valide = true;

    $prefix = '';
    for($k = 0;$k < count($search_keys); $k++){
        $corresp = getCorrespondanceIn($trames[$i], $search_keys[$k]);
        if($corresp === '>not-found<'){
            $valide = false;
            break;
        }
        else{
            if(mb_strlen($prefix) > 0){
                $prefix .= ' ';
            }
            $prefix .= $trames[$i][$corresp];
        }
    }

    if($valide){
        $tramesFound[] = $trames[$i];
        $tabAutoComplete = addItemInArrayIfNotExist($tabAutoComplete, $prefix);
    }
}

$tramesFound["autocompletion"] = $tabAutoComplete;

// Générer l'autocomplétion via prefix + les données des tramesFound
// Repartir du tableau $tramesFound["autocompletion"] (préfixes) pour générer le reste des propositions



$json = json_encode($tramesFound, JSON_PRETTY_PRINT);
die($json);