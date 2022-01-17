import {addChartData, removeChartData} from "./utils.js";
import {ajax_getTrames} from "./tableau.js";

const container = $('#container');
    function generate_trame_details(trame){
        container.empty();
        const dashboardMain = $('<section id="dashboard"></section>');

        // Ligne titre
        var item = $('<div class="back-box"></div>');
        const title = $('<h2>Trame <strong>'+trame.identification+'</strong> ('+trame.protocol_name+')</h2>');

        var backBoxContent = $('<div></div>');

        item.append(title);
        dashboardMain.append(item);

        // Ligne infos
        item = $('<div class="back-box"></div>');

        backBoxContent.append($('<h2>Informations globales</h2>'));
        item.append(backBoxContent);

        var trame_data_item = $('<div class="trame-info-item"></div>');

        trame_data_item.append($('<div class="trame-info-data"><span>Date</span><i>'+trame.frame_date+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>Version</span><i>'+trame.version+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>Header length</span><i>'+trame.header_length+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>Service</span><i>'+trame.service+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>Flags code</span><i>'+trame.flags_code+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>TTL</span><i>'+trame.ttl+'</i></div>'));

        backBoxContent.append(trame_data_item);
        dashboardMain.append(item);
        item = $('<div class="back-box"></div>');
        backBoxContent = $('<div></div>');
        backBoxContent.append($('<h2>Protocole</h2>'));

        trame_data_item = $('<div class="trame-info-item"></div>');

        trame_data_item.append($('<div class="trame-info-data"><span>Protocol name</span><i>'+trame.protocol_name+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>Protocol checksum status</span><i>'+trame.protocol_checksum_status+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>Protocol port from</span><i>'+trame.protocol_ports_from+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>Protocol port dest</span><i>'+trame.protocol_ports_dest+'</i></div>'));

        backBoxContent.append(trame_data_item);
        item.append(backBoxContent);
        dashboardMain.append(item);
        item = $('<div class="back-box"></div>');
        backBoxContent = $('<div></div>');
        backBoxContent.append($('<h2>IP</h2>'));
        trame_data_item = $('<div class="trame-info-item"></div>');

        trame_data_item.append($('<div class="trame-info-data"><span>Header checksum</span><i>'+trame.header_checksum+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>IP from</span><i>'+trame.ip_from+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>IP dest</span><i>'+trame.ip_dest+'</i></div>'));

        backBoxContent.append(trame_data_item);
        item.append(backBoxContent);

        dashboardMain.append(item);

        // Ligne graphes (errors)

        let data = {
            labels: [
                'Erreurs',
                'Valides'
            ],
            datasets: [{
                label: 'Paquets ' + trame.protocol_name,
                data: [80,20],
                backgroundColor: [
                    'rgb(252,66,66)',
                    'rgb(65,220,82)'
                ],
                hoverOffset: 4
            }]
        };

        const item_graphes = $('<div class="back-box"></div>');
        dashboardMain.append(item_graphes);
        item = $('<div class="back-box_graph"></div>');
        item.append('<h2>Erreurs '+trame.protocol_name+'</h2>');
        item.append('<p><strong id="erreur-prct">0%</strong> d\'erreurs, <strong id="erreur-paquet-count">0/0</strong> paquet(s)</p>');
        const chartjs_canvas = $('<canvas id="graphe_errors"></canvas>');
        const chartjs_canvas_parent = $('<div class="back-box_graph__chatjs" id="graphe_errors_parent"></div>');
        chartjs_canvas_parent.append(chartjs_canvas);
        item.append(chartjs_canvas_parent);


        let config = {
            type: 'pie',
            data: data,
            options: {
                maintainAspectRatio: false,
            }
        };

        const chartjs_graphe_errors = new Chart(chartjs_canvas, config);
        chartjs_graphe_errors.resize(200,200);
        ajax_getProtocolData(chartjs_graphe_errors, trame.protocol_name);

        item_graphes.append(item);

        // Ligne autres trames
        const item_autres_trames = $('<div class="back-box"></div>');

        item = $('<div class="back-box_table"></div>');

        item.append('<h2>Trames en protocole '+trame.protocol_name+'</h2>');

        const tableSameProtocol = $('<div class="table" id="same-protocol">');
        item.append(tableSameProtocol);
        item_autres_trames.append(item);
        dashboardMain.append(item_autres_trames);
        ajax_getTrames(tableSameProtocol, 1, 10, trame.protocol_name);

        container.append(dashboardMain);
    }

    function ajax_getProtocolData(chartjs_graphe, protocol_name){
        showLoading('Récupération des informations du protocole '+protocol_name+'...');
        $.ajax({
            type: "GET",
            url: "inc/ajax_get_protocol_data.php",
            data: {protocolName: protocol_name},
            success: function(response){
                const protocol_data = JSON.parse(response);
                const nbErreurs = protocol_data.erreurs.length;
                const nbData = protocol_data.paquets_count;
                const prct = (nbErreurs / nbData) * 100;
                removeChartData(chartjs_graphe, 2);
                addChartData(chartjs_graphe, "Erreurs", nbErreurs);
                addChartData(chartjs_graphe, "Valides", (nbData - nbErreurs));
                $('#erreur-prct').text(prct + '%');
                $('#erreur-paquet-count').text(nbErreurs + '/' + nbData);
                hideLoading(500);
            },
            error: function(){
                hideLoading(500);
            }
        });
    }

export {generate_trame_details};