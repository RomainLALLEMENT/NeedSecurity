<?php
require ('inc/bases.php');

$val = 'c0a8014a';
debug($val);

echo hexadecimalCipher($val);
include('inc/header.php');

?>
    <h1><?= $NOM_SITE; ?></h1>

<?php

insert_json_frames('./assets/frames/frames.json');

?>

<?php
include('inc/footer.php');