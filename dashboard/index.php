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
    <section id="dashboard-main">
        <div class="dashboard-items">
            <div class="dashboard-items-line">
                <div class="dashboard-item data-item"><span class="data-name">Donnée 1</span><p>8</p></div>
                <div class="dashboard-item data-item"><span class="data-name">Donnée 2</span><p>8</p></div>
                <div class="dashboard-item data-item"><span class="data-name">Donnée 3</span><p>8</p></div>
                <div class="dashboard-item data-item"><span class="data-name">Donnée 4</span><p>8</p></div>
            </div>

            <div class="dashboard-items-line">

                <?php
                $sql = "SELECT protocol_name,count(id) as cpt FROM trames GROUP BY protocol_name LIMIT 4";
                $query = $pdo->prepare($sql);
                $query->execute();
                $trameData = $query->fetchAll();

                foreach($trameData as $trame){
                    echo '<div class="dashboard-item data-item"><span class="data-name">'.$trame['protocol_name'].'</span><p>'.$trame['cpt'].'</p></div>';
                }
                ?>
            </div>
            <div class="dashboard-items-line">
                <div class="dashboard-item"><h2>Trames</h2>
                    <div id="chart-1-div">
                        <canvas id="chart-1"></canvas>
                    </div>
                </div>
                <div class="dashboard-item"><h2>Autre</h2>
                    <div >
                        <canvas id="chart-2"></canvas>
                    </div>
                </div>
            </div>
            <div class="dashboard-items-line">
                <div class="dashboard-item"><h2>Dernières trames</h2>
                    <div class="table-parent">
                        <table id="last-trames"></table>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>

<?php
include('inc/footer_back.php');