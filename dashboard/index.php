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

    <section id="dashboard">

        <div class="back-box">

            <?php

            $sql = "SELECT protocol_name,count(id) as cpt FROM trames GROUP BY protocol_name LIMIT 4";
            $query = $pdo->prepare($sql);
            $query->execute();
            $trameData = $query->fetchAll();

            $cpt = 1;
            foreach($trameData as $trame){
                echo '<div class="data-box clickable" data-box="'.$cpt.'" data-protocol="'.$trame['protocol_name'].'"><h3 class="data-box_name">'.$trame['protocol_name'].'</h3><p class="data-box_nb">'.$trame['cpt'].'</p></div>';
                $cpt++;
            }
            ?>
        </div>


        <div class="back-box">
            <div class="back-box_graph">
                <h2>Répartition des protocoles</h2>
                <div class="back-box_graph__chatjs">
                    <canvas id="chart-pie1"></canvas>
                </div>
            </div>
        </div>
        <div class="back-box">
            <div class="back-box_graph">
                <h2>trame</h2>
                <div class="back-box_graph__chatjs">
                    <canvas id="chart-bar1"></canvas>
                </div>
            </div>
        </div>

        <div class="back-box">
            <div class="back-box_table">
                <h2>Dernières trames</h2>
                <div class="table" id="last-trames">
                    <!-- tableau généré en js -->
                </div>
            </div>
        </div>
    </section>
</div>

<?php
include('inc/footer_back.php');