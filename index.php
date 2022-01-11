<?php
require ('inc/bases.php');

$val = 'c0a8014a';
debug($val);

echo hexadecimalCipher($val);
include('inc/header.php');

?>
    <h1><?= $NOM_SITE; ?></h1>

    <a href="inc/ajax.php" style="background: black">test BD</a>
<p><?= dateToRead(1608219651); ?></p>

<?php
include('inc/footer.php');