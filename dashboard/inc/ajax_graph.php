<?php
require_once ('../../inc/bases.php');
$tableV = trim(strip_tags($_GET['table']));
$columnV = trim(strip_tags($_GET['column']));
if(empty($tableV) && empty($columnV)){
    exit;
} else {
    if (mb_strlen($tableV) == 0 || mb_strlen($columnV) == 0) {
        exit;
    } else {
        function getDbByColumn($table, $column)
        {
            global $pdo;
            $sql = "SELECT :column_db FROM :table_db";
            $query = $pdo->prepare($sql);
            $query->bindValue('column_db', $column, PDO::PARAM_STR);
            $query->bindValue('table_db', $table, PDO::PARAM_STR);
            $query->execute();
            return $query->fetchAll(PDO::FETCH_COLUMN);
        }
        $db = getDbByColumn($tableV, $columnV);
        $count = array_count_values($db);
        $json = json_encode($count, JSON_PRETTY_PRINT);
        die($json);
    }
}