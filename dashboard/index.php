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

    <section id="dashboard-main">
        <div class="wrap">
            <div class="dashboard-menu">
                <ul>
                    <li class="li-selected"><i class="fas fa-house-user"></i> Résumé</li>
                    <li><i class="fas fa-database"></i> Détails</li>
                    <li><i class="fas fa-clipboard-list"></i> Logs</li>
                </ul>
            </div>
            <div class="dashboard-items">
                <div class="dashboard-items-line">
                    <div class="dashboard-item data-item"><span class="data-name">Donnée 1</span><p>8</p></div>
                    <div class="dashboard-item data-item"><span class="data-name">Donnée 2</span><p>8</p></div>
                    <div class="dashboard-item data-item"><span class="data-name">Donnée 3</span><p>8</p></div>
                    <div class="dashboard-item data-item"><span class="data-name">Donnée 4</span><p>8</p></div>
                </div>
                <div class="dashboard-items-line">
                    <div class="dashboard-item"><h2>Trames</h2>
                        <div id="chart-1-div">
                            <canvas id="chart-1"></canvas>
                        </div>
                    </div>
                    <div class="dashboard-item"><h2>Autre</h2>
                        <div>
                            <canvas id="chart-2"></canvas>
                        </div>
                    </div>
                </div>
                <div class="dashboard-items-line">
                    <div class="dashboard-item"><h2>Autre</h2></div>
                </div>
            </div>
        </div>
    </section>
</div>

<?php
include('inc/footer_back.php');