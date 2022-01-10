<?php
require ('../inc/bases.php');
include('inc/header_back.php');

?>
<div id="container">
    <header id="header">
        <div class="wrap">
            <div class="left">
                <img class="logo" src="../assets/img/logo.png" alt="Logo">
                <h1 class="site_name"><?= $NOM_SITE_COLORED; ?></h1>
            </div>
            <div class="right">
                <span>Pseudo</span>
                <a href="#"><i class="fas fa-sign-out-alt"></i></a>
            </div>
        </div>
    </header>
</div>

<?php
include('inc/footer_back.php');