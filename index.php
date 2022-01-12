<?php
require ('inc/bases.php');

//$val = 'c0a8014a';
//debug($val);
//echo hexadecimalCipher($val);
include('inc/header.php');
?>

<img class="backdata" src="assets/img/background.png" alt="">

<div class="data">
    <div id="dataccueil">
        <h2>données réseau</h2>
        <p>Visualisez vos données réseau</p>
        <button>Accéder à mon espace</button>
    </div>
</div>
<div class="tableaudebord">
    <h2>Tableau de bord</h2>
    <div id="fonctionalités">
        <div id="fonc1">
            <i class="fas fa-hdd"></i>
            <p> ° Fonctionalité 1</p>
        </div>
        <div id="fonc2">
            <i class="fas fa-hdd"></i>
            <p> ° Fonctionalité 2</p>
        </div>
        <div id="fonc3">
            <i class="fas fa-hdd"></i>
            <p> ° Fonctionalité 3</p>
        </div>
    </div>
    <div class="imgpc">
        <img src="assets/img/pc.png" alt="">
    </div>  
</div>
<div class="analyse">
    <div id="imganalyse">
        <img src="assets/img/orga.png" alt="">
    </div>
    <div id="fonctionalités2">
        <h2>Analyse des paquets</h2>
        <div><p> ° Fonctionalité 1</p></div>
        <div><p> ° Fonctionalité 1</p></div>
        <div><p> ° Fonctionalité 1</p></div>
    </div>
</div>

<?php
include('inc/footer.php');