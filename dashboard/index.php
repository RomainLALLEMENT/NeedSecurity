<?php
require_once ('../inc/bases.php');

if(!isLoggedIn()){
    header('Location: ../');
    exit;
}

include_once ('inc/header_back.php');

// le container est régénéré lorsqu'on change de page
?>
    <div id="container">

    </div>
<?php
include('inc/footer_back.php');