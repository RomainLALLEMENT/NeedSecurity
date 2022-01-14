<?php
require_once ('../inc/bases.php');

if(!isLoggedIn()){
    header('Location: ../');
    exit;
}

include_once ('inc/header_back.php');

?>
    <div id="container">
        <section id="dashboard">
<!-- Data nombre -->
                <div class="back-box">
                    <div class="data-box" data-box="1">
                        <h3 class="data-box_name">Donnée 1</h3>
<!--                        data noms-->
                        <p class="data-box_nb">8</p>
<!--                        donnée chiffre -->
                    </div>
                    <div class="data-box" data-box="2">
                        <h3 class="data-box_name">Donnée 2 p g j</h3>
<!--                        data noms-->
                        <p class="data-box_nb">2</p>
<!--                        donnée chiffre -->
                    </div>
                    <div class="data-box" data-box="3">
                        <h3 class="data-box_name">Donnée 3</h3>
                        <!--                        data noms-->
                        <p class="data-box_nb">3</p>
                        <!--                        donnée chiffre -->
                    </div>
                    <div class="data-box" data-box="4">
                        <h3 class="data-box_name">Donnée 4</h3>
                        <!--                        data noms-->
                        <p class="data-box_nb">43</p>
                        <!--                        donnée chiffre -->
                    </div>
                </div>

<!--Chat JS graphique-->
                <div class="back-box">
                    <div class="back-box_graph">
                        <h2>Trames graph</h2>
                        <div class="back-box_graph__chatjs">
                            <canvas id="chart-1"></canvas>
                        </div>
                    </div>
                    <div class="back-box_graph">
                        <h2>Trames graph</h2>
                        <div class="back-box_graph__chatjs">
                            <canvas id="chart-2"></canvas>
                        </div>
                    </div>

                </div>
                <div class="back-box">
                    <div class="back-box_table">
                        <h2>Tableau log</h2>
                            <div class="table" >
                                <div class="table_head">
                                        <p>date</p>
                                        <p>Identification</p>
                                        <p>Protocol name</p>
                                        <p>Ip from</p>
                                        <p>Ip dest</p>
                                </div>
                                <div class="table_body" id="dashboard_table">
                                <div class="table_body_row">
                                        <p>02/12/2020 10:57:33</p>
                                        <p>0xa443</p>
                                        <p>ICMP</p>
                                        <p>172.217.19.227</p>
                                        <p>192.168.1.74</p>
                                </div>
                                    <div class="table_body_row">
                                        <p>02/12/2020 10:57:33</p>
                                        <p>0xa443</p>
                                        <p>ICMP</p>
                                        <p>172.217.19.227</p>
                                        <p>192.168.1.74</p>
                                    </div>
                                    <div class="table_body_row">
                                        <p>02/12/2020 10:57:33</p>
                                        <p>0xa443</p>
                                        <p>ICMP</p>
                                        <p>172.217.19.227</p>
                                        <p>192.168.1.74</p>
                                    </div>

                                </div>

                            </div>
                            <div class="paginator">

                            </div>
                    </div>
                </div>

        </section>
    </div>

<p id="test">la</p>
    <div>
        <h1>Chart</h1>
        <canvas id="Chart" width="800" height="450"></canvas>
    </div>
<?php
include('inc/footer_back.php');