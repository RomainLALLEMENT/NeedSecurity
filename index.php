<?php
require_once ('inc/bases.php');

if(isLoggedIn()){
    header('Location: ./dashboard');
    exit;
}

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

<section id="abouts-us">
    <div>
        <h2>A propos de nous...</h2>
        <p><?= $NOM_SITE_COLORED; ?> est un projet concernant une plateforme d'analyse de trame qui permet d'éviter les attaques DDoS. Créer en janvier 2022 par l'équipe de <?= $NOM_SITE_COLORED; ?>, elle est composée de 4 développeurs qui sont :</p>
        <ul>
            <li>Léonard JOUEN (Chef de projet & Développeur Back-End)</li>
            <li>Johann SIX (Développeur Back-End)</li>
            <li>Romain LALLEMENT (Développeur Front-End)</li>
            <li>Anthony CHEVALIER (Développeur Front-End)</li>
        </ul>
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