<section id="dashboard-main">
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
                <div >
                    <canvas id="chart-2"></canvas>
                </div>
            </div>
        </div>
        <div class="dashboard-items-line">
            <div class="dashboard-item"><h2>Dernières trames</h2>

                <?php
                generate_trames_table(['frame_date', 'identification', 'protocol_name', 'ip_from', 'ip_dest']);
                ?>
            </div>
        </div>
    </div>
</section>