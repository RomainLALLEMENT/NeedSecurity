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
            <h2>Fonctionnalités</h2>
            <ul id="list-func">
                <li><i class="fas fa-database"></i>Accès aux données du réseau et données graphiques sur vos trames</li>
                <li><i class="fas fa-server"></i>Protection et anticipation des attaques</li>
                <li><i class="fas fa-chart-pie"></i>Analyse de vos trames réseau et synthèse des données réseau</li>
                <li><i class="fas fa-search"></i>Recherche rapide et intuitive</li>
            </ul>
        </div>
        <div>
            <img src="assets/img/pc.png" alt="ordinateur avec vue sur le dashboard">
        </div>
    </section>

    <section id="analyse">
        <div>
            <h2>Analyse des paquets</h2>
            <ul id="list-func">
                <li><i class="fas fa-table-tennis"></i>Récupération des données des pings</li>
                <li><i class="fas fa-compress-arrows-alt"></i>Simulation du trajet parcouru par les paquets</li>
                <li><i class="fas fa-chart-area"></i>Représentation graphique par protocole</li>
                <li><i class="fas fa-file"></i>Synthèse complète des données classées par protocole</li>
            </ul>
        </div>
        <div>
            <img src="assets/img/orga.svg" alt="ordinateur avec vue sur le dashboard">
        </div>
    </section>



<?php
include('inc/footer.php');