<?php
require_once ('../../inc/bases.php');

$page = 1;
$nbRow = 5;

if(!empty($_GET['page'])){
    $page = intval($_GET['page']);
}

if(!empty($_GET['nbRows'])){
    $nbRow = intval($_GET['nbRows']);
}

$trames = db_get_trames(['frame_date', 'identification', 'protocol_name', 'ip_from', 'ip_dest'], $page, $nbRow);

$cptTrame = 0;
foreach($trames as $trame){
    foreach ($trame as $key => $trameData)
    {
        if($key == 'frame_date') {
            $trames[$cptTrame][$key] = dateToRead($trameData);
        }
        elseif($key == 'ip_from' || $key == 'ip_dest'){
            $trames[$cptTrame][$key] = hexadecimalCipher($trameData);
        }
    }
    $cptTrame++;
}

$sql = "SELECT count(id) FROM trames";
$query = $pdo->prepare($sql);
$query->execute();
$count = $query->fetchColumn();
if($count <= $nbRow){
    $pages = 1;
}
else{
    $pages = ceil($count / $nbRow);
}

$paginatorRebuild = [];

if($pages <= 10) {
    for ($i = 1; $i <= $pages; $i++) {
        if ($page == $i) {
            $paginatorRebuild[] = [$i, 'selected'];
        } else {
            $paginatorRebuild[] = [$i, 'unselected'];
        }
    }
}
else{
    for ($i = 1; $i <= $pages; $i++) {
        if($page == $i || $i <= 3 || $i >= $pages - 3 || ($i >= $page - 2 && $i <= $page + 2)){
            if ($page == $i) {
                $paginatorRebuild[] = [$i, 'selected'];
            } else {
                $paginatorRebuild[] = [$i, 'unselected'];
            }
        }
    }
}

$trames[] = $paginatorRebuild;

showJson($trames);