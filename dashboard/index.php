<?php
require_once ('../inc/bases.php');

if(!isLoggedIn()){
    header('../');
    exit;
}

include_once ('inc/header_back.php');

?>
<div id="container">

    <?php include ('pages/page-accueil.php'); ?>
</div>

<?php
include('inc/footer_back.php');