
$( document ).ready(function() {

    const container = $('#container');

    const table = $('#last-trames');
    ajax_getTrames(table, 1);

    // Graphe - Pie 1

    let data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    let config = {
        type: 'pie',
        data: data,
    };

    const chart1 = new Chart(
        document.getElementById('chart-1'),
        config
    );

    // Graphe - 2

    const labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
    ];

    data = {
        labels: labels,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: [0, 10, 5, 2, 20, 30, 45],
        }]
    };

    config = {
        type: 'line',
        data: data,
        options: {}
    };

    const chart2 = new Chart(
        document.getElementById('chart-2'),
        config
    );


    function ajax_getTrameDetail(trameid){
        setTimeout(function() {
            $.ajax({
                type: "GET",
                url: "inc/ajax_get_trame_data.php",
                data: {trameid: trameid},
                success: function(response){
                    if(response.length > 0){
                        const trame = JSON.parse(response);
                        generate_trame_details(trame);
                    }
                },
                error: function(){

                }
            });
        }, 600);
    }

    function generate_trame_details(trame){
        container.empty();
        const dashboardMain = $('<section id="dashboard-main"></section>');
        const items = $('<div class="dashboard-items"></div>');
        dashboardMain.append(items);

        // Ligne titre
        const item_line_title = $('<div class="dashboard-items-line"></div>');
        items.append(item_line_title);

        var item = $('<div class="dashboard-item"></div>');
        const title = $('<h2>Trame <strong>'+trame.identification+'</strong> ('+trame.protocol_name+')</h2>');

        item.append(title);
        items.append(item);

        // Ligne infos
        const item_line_infos_1 = $('<div class="dashboard-items-line"></div>');
        const item_line_infos_2 = $('<div class="dashboard-items-line"></div>');
        const item_line_infos_3 = $('<div class="dashboard-items-line"></div>');

        item = $('<div class="dashboard-item"></div>');

        item.append($('<h2>Informations globales</h2>'));

        var trame_data_item = $('<div class="trame-info-item"></div>');

        trame_data_item.append($('<div class="trame-info-data"><span>Date</span><i>'+trame.frame_date+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>Version</span><i>'+trame.version+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>Header length</span><i>'+trame.header_length+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>Service</span><i>'+trame.service+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>Flags code</span><i>'+trame.flags_code+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>TTL</span><i>'+trame.ttl+'</i></div>'));

        item.append(trame_data_item);
        item_line_infos_1.append(item);
        item = $('<div class="dashboard-item"></div>');
        item.append($('<h2>Protocole</h2>'));

        trame_data_item = $('<div class="trame-info-item"></div>');

        trame_data_item.append($('<div class="trame-info-data"><span>Protocol name</span><i>'+trame.protocol_name+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>Protocol checksum status</span><i>'+trame.protocol_checksum_status+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>Protocol port from</span><i>'+trame.protocol_ports_from+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>Protocol port dest</span><i>'+trame.protocol_ports_dest+'</i></div>'));

        item.append(trame_data_item);
        item_line_infos_2.append(item);
        item = $('<div class="dashboard-item"></div>');
        item.append($('<h2>IP</h2>'));
        trame_data_item = $('<div class="trame-info-item"></div>');

        trame_data_item.append($('<div class="trame-info-data"><span>Header checksum</span><i>'+trame.header_checksum+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>IP from</span><i>'+trame.ip_from+'</i></div>'));
        trame_data_item.append($('<div class="trame-info-data"><span>IP dest</span><i>'+trame.ip_dest+'</i></div>'));


        item.append(trame_data_item);

        item_line_infos_3.append(item);
        items.append(item_line_infos_1);
        items.append(item_line_infos_2);
        items.append(item_line_infos_3);

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

        const item_graphes = $('<div class="dashboard-items-line"></div>');
        items.append(item_graphes);
        item = $('<div class="dashboard-item"></div>');
        item.append('<h2>Erreurs '+trame.protocol_name+'</h2>');
        item.append('<p><strong id="erreur-prct">0%</strong> d\'erreurs, <strong id="erreur-paquet-count">0/0</strong> paquet(s)</p>');
        const chartjs_canvas = $('<canvas id="graphe_errors"></canvas>');
        const chartjs_canvas_parent = $('<div id="graphe_errors_parent"></div>');
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
        const item_autres_trames = $('<div class="dashboard-items-line"></div>');
        items.append(item_autres_trames);

        item = $('<div class="dashboard-item"></div>');

        item.append('<h2>Trames en protocole '+trame.protocol_name+'</h2>');

        const tableParent = $('<div class="table-parent"></div>');
        const tableSameProtocol = $('<table id="trames-same-protocol"></table>');
        tableParent.append(tableSameProtocol);
        item.append(tableParent);
        items.append(item);
        ajax_getTrames(tableSameProtocol, 1, 10, trame.protocol_name);

        container.append(dashboardMain);
    }

    function ajax_getProtocolData(chartjs_graphe, protocol_name){
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
            },
            error: function(){

            }
        });
    }

    function ajax_getTrames(table, page, nbRows = 10, protocol_name = ''){
        table.fadeOut(350, function(){
        });

        table.attr('data-protocol', protocol_name);

        setTimeout(function() {
            $.ajax({
                type: "GET",
                url: "inc/ajax_table_trames.php",
                data: {page: page, nbRows: nbRows, protocolName: protocol_name},
                success: function(response){
                    if(response.length > 1){
                        generate_table_from_trames(table, response);
                    }

                    table.fadeIn(350, function(){  });
                },
                error: function(){
                    table.fadeIn(350, function(){  });
                }
            });
        }, 600);
    }

    function generate_table_from_trames(table, response){
        const trHeader = $('<tr class="table-header"></tr>');

        $.each(response[0], function(k, v) {
            if(k !== 'id'){
                const tdHeader = $('<td>'+ capitalizeFirstLetter(k.replaceAll('_', ' ')) + '</td>');
                trHeader.append(tdHeader);
            }
        });

        table.empty();
        table.append(trHeader);

        let cpt = 0;
        $.each(response, function() {
            if(cpt < response.length - 1){
                const trTrame = $('<tr class="trame-clickable" data-idtrame="' + $(this)[0]['id'] + '"></tr>').on('click', function(){
                    ajax_getTrameDetail($(this).data("idtrame"));
                });

                $.each(this, function(k, v) {
                    if(k !== 'id'){
                        const tdTrame = $('<td>'+v+'</td>');
                        trTrame.append(tdTrame);
                    }
                });
                table.append(trTrame);
            }
            else{
                // Régénération du paginator
                const paginator = $('<div class="paginator"></div>');
                $.each(this, function(k, v) {
                    const paginatorItem = $('<span data-tableid="' + table.attr('id') + '" class="paginator-item"></span>');
                    if(v[1] === 'selected'){
                        paginatorItem.addClass('paginator-selected');
                    }
                    paginatorItem.text(v[0]);
                    paginatorItem.on('click', function(){
                        const page = parseInt($(this).text());
                        const table = $('#' + $(this).data("tableid"));
                        const protocol_name = table.attr('data-protocol');
                        ajax_getTrames(table, page, 10, protocol_name);
                    });
                    paginator.append(paginatorItem);
                });
                table.append(paginator);
            }
            cpt++;
        });
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});

//Show logout
const showModal = document.getElementById('logout-show');
showModal.addEventListener('click', showLogout);
function showLogout(){
    console.log('Ask for logout');
    const modal = document.querySelector('#modal-logout');
    const closeModal = document.querySelector('#n');
    modal.style.display = "block";
    closeModal.addEventListener('click', ()=>{
        modal.style.display = "none";
    })
    window.addEventListener('click', (event) =>{
        if (event.target == modal) {
            modal.style.display = "none";
        }
    })
};

function addChartData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeChartData(chart, nbLabels = 1) {
    for(let i = 0;i < nbLabels; i++){
        chart.data.labels.pop();
        chart.data.datasets.forEach((dataset) => {
            dataset.data.pop();
        });
        chart.update();
    }
}