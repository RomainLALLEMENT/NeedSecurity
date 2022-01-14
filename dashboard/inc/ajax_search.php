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

function cumulateDataIn($ar, $trame, $prefixe, $ignoreColonneAr){

    foreach ($trame as $key => $value){
        if(!in_array($key, $ignoreColonneAr)){
            if(!str_contains($prefixe, $value)){
                $ar = addItemInArrayIfNotExist($ar, $prefixe . ' ' . $value);
            }
        }
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

// NOUVELLE VERSION
$tramesFound = [];
$tabAutoComplete = [];
$ignoreFields = [];

for($i = 0; $i < count($trames); $i++) {
    $trames[$i]['ip_from'] = hexadecimalCipher($trames[$i]['ip_from']);
    $trames[$i]['ip_dest'] = hexadecimalCipher($trames[$i]['ip_dest']);
    $trames[$i]['frame_date'] = explode(" ", dateToRead($trames[$i]['frame_date']))[0];
    $valide = true;

    $prefix = '';
    $needIgnore = [];
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
            $needIgnore[] = $corresp;
        }
    }

    if($valide){
        $tramesFound[] = $trames[$i];
        $tabAutoComplete = addItemInArrayIfNotExist($tabAutoComplete, $prefix);
        if(count($needIgnore) > 0){
            foreach ($needIgnore as $ni){
                $ignoreFields = addItemInArrayIfNotExist($ignoreFields, $ni);
            }
        }
    }
}

// Générer l'autocomplétion via prefix + les données des tramesFound
// Repartir du tableau $tramesFound["autocompletion"] (préfixes) pour générer le reste des propositions

if(count($tramesFound) > 0){
    $prefixes = $tabAutoComplete;
    foreach ($prefixes as $prefixe){
        foreach ($trames as $trame){
            $tabAutoComplete = cumulateDataIn($tabAutoComplete, $trame, $prefixe, $ignoreFields);
        }
    }
}
$tramesFound["autocompletion"] = $tabAutoComplete;

$json = json_encode($tramesFound, JSON_PRETTY_PRINT);
die($json);