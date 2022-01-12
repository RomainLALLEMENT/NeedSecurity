<?php
require_once ('inc/bases.php');


include_once ('inc/header.php');

?>

<!--Hero banner-->
<section id="hero-banner">
    <div id="box-hero">
        <h2>données réseau</h2>
        <p>Visualisez vos données réseau</p>
        <p id="btn-login">Accéder à mon espace</p>
    </div>
</section>

<section id="functionality">
    <div>
    <h2>Fonctionalité</h2>
        <ul id="list-func">
            <li><i class="fas fa-database"></i>Sécurité de Base de donnée</li>
            <li><i class="fas fa-server"></i>Protection Serveur</li>
            <li><i class="fas fa-chart-pie"></i>Analyse Réseaux</li>
        </ul>
    </div>
    <div>
        <img src="assets/img/pc.png" alt="ordinateur avec vue sur le dashboard">
    </div>
</section>

<section id="analyse">
    <div><img src="assets/img/orga.png" alt=""></div>
    <div>
        <h2>Analyse </h2>
        <ul id="list-analyse">
            <li><i class="fas fa-angle-double-right"></i>Lorem ipsum dolor.</li>
            <li><i class="fas fa-angle-double-right"></i>Lorem ipsum dolor.</li>
            <li><i class="fas fa-angle-double-right"></i>Lorem ipsum dolor.</li>
        </ul>
    </div>
</section>



<?php
include('inc/footer.php');