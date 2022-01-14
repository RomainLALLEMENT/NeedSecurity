
$( document ).ready(function() {
    // BASES
    const container = $('#container');
    // BASES - SEARCH
    var searchTimer = null;

    // MENU
    $('#page-recherche').on('click', function(){
        console.log('click page recherche');
        generate_search_page();
    });

    // Si on renseigne un protocole en GET
    if(findGetParameter('detail_protocol') != null){
        generate_protocol_path(findGetParameter('detail_protocol'));
    }
    else{
        const table = $('#last-trames');
        ajax_getTrames(table, 1);

        $('.data-box').on('click', function(e){
            e.preventDefault();
            generate_protocol_path($(this).attr('data-protocol'));
        });
    }

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

    function ajax_search(search){
        $.ajax({
            type: "GET",
            url: "inc/ajax_search.php",
            data: {search: search},
            success: function(response){
                const data = JSON.parse(response);
                update_search_page(data);
            },
            error: function(){

            }
        });
    }

    function generate_protocol_path(protocol_name){
        container.empty();

        const dashboardMain = $('<section id="dashboard"></section>');

        // Ligne titre
        var item = $('<div class="back-box"></div>');
        const title = $('<h2>Protocole '+protocol_name+'</h2>');

        item.append(title);
        dashboardMain.append(item);

        // Ligne chemins
        item = $('<div class="back-box"></div>');
        dashboardMain.append(item);
        ajax_generateProtocolPath(item, protocol_name);

        container.append(dashboardMain);
    }

    function update_search_page(searchData){
        // Autocomplétion
        const _autocomplete = $('#autocomplete');
        _autocomplete.empty();
        $.each(searchData.autocompletion, function() {
            const autocompleteData = $('<div class="autocomplete-data">'+this.toString()+'</div>').on('click', function(){
                const value = $(this).text();
                $('#input-search').val(value);
                _autocomplete.empty();
                _autocomplete.css('display', 'none');
                ajax_search(value);
            });
            _autocomplete.append(autocompleteData);
        });

        delete searchData['autocompletion'];
        const searchTable = $('#search-table');
        generate_table_from_trames(searchTable, searchData);
    }

    function generate_search_page(){
        container.empty();
        var item, divParent;
        const dashboardMain = $('<section id="dashboard"></section>');

        item = $('<div class="back-box"></div>');
        divParent = $('<div></div>');
        const inputSearch = $('<input id="input-search" type="text" placeholder="Recherche...">');
        divParent.append(inputSearch);
        item.append(divParent);
        dashboardMain.append(item);

        const autocomplete = $('<div id="autocomplete"></div>');
        divParent.append(autocomplete);
        autocomplete.css('display', 'none');

        inputSearch.on('input click', function() {
            const value = inputSearch.val();
            const _autocomplete = $('#autocomplete');
            if(value.length <= 0){
                _autocomplete.css('display', 'none');
            }
            if(searchTimer){
                clearTimeout(searchTimer);
            }

            searchTimer = setTimeout(function(){
                _autocomplete.empty();

                if(value.length > 0){
                    _autocomplete.css('display', 'flex');
                    ajax_search(value);
                }
                else{
                    _autocomplete.css('display', 'none');
                }
            }, 500);
        });

        // Ligne autres trames
        const item_autres_trames = $('<div class="back-box"></div>');

        item = $('<div class="back-box_table"></div>');

        const searchTable = $('<div class="table" id="search-table">');
        item.append(searchTable);
        item_autres_trames.append(item);
        dashboardMain.append(item_autres_trames);
        generate_table_from_trames(searchTable, null);

        container.append(dashboardMain);
    }

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

    function ajax_generateProtocolPath(element, protocol_name){
        $.ajax({
            type: "GET",
            url: "inc/ajax_get_path_for_protocol.php",
            data: {protocolName: protocol_name},
            success: function(response){
                const chemins = JSON.parse(response);
                console.log(chemins);
                const divCheminParent = $('<div class="chemin-parent">');
                $.each(chemins, function() {
                    $.each(this, function() {
                        const divCheminItem = $('<div data-trameid="'+this.id+'" class="chemin">').on('click', function(){
                            const trameid = $(this).data('trameid');
                            console.log('click ' + trameid);
                            ajax_getTrameDetail(trameid);
                        });

                        const paquet = $('<i class="fas fa-laptop-code chemin-paquet"></i>');
                        paquet.append('<span class="chemin-ip">' + this.ip_from + '</span>');
                        paquet.append('<span class="chemin-identifiant">Paquet <strong>' + this.identification + '</strong></span>');
                        divCheminItem.append(paquet);
                        const arrows = $('<div class="arrows">');
                        if(this.trajet === 'aller-retour'){
                            const arrow = $('<i class="fas fa-long-arrow-alt-right chemin-paquet return-'+getClassForCode(this.flags_code_aller)+'"></i>');
                            arrow.append('<span class="chemin-code-1">' + this.flags_code_aller + '</span>');
                            if(this.flags_code_aller !== '0x00'){
                                arrow.append('<i data-trajet="aller-error" class="fas fa-network-wired"></i>');
                            }
                            else if(this.flags_code_retour !== '0x00'){
                                arrow.append('<i data-trajet="retour-error" class="fas fa-network-wired"></i>');
                            }
                            else{
                                arrow.append('<i data-trajet="aller-retour" class="fas fa-network-wired"></i>');
                            }

                            const arrow_retour = $('<i class="fas fa-long-arrow-alt-left chemin-paquet return-'+getClassForCode(this.flags_code_retour)+'"></i>');
                            arrow_retour.append('<span class="chemin-code-2">' + this.flags_code_retour + '</span>');
                            arrows.append(arrow);
                            arrows.append(arrow_retour);
                        }
                        else if(this.trajet === 'aller'){
                            const arrow = $('<i class="fas fa-long-arrow-alt-right chemin-paquet return-'+getClassForCode(this.flags_code_aller, true)+'"></i>');
                            arrow.append('<span class="chemin-code-1">' + this.flags_code_aller + '</span>');
                            if(this.flags_code_aller !== '0x00'){
                                arrow.append('<i data-trajet="aller-error" class="fas fa-network-wired"></i>');
                            }
                            else{
                                arrow.append('<i data-trajet="aller" class="fas fa-network-wired"></i>');
                            }
                            arrows.append(arrow);
                        }
                        divCheminItem.append(arrows);

                        const paquet_destination = $('<i class="fas fa-laptop-code chemin-paquet"></i>');
                        paquet_destination.append('<span class="chemin-ip-dest">' + this.ip_dest + '</span>');
                        divCheminItem.append(paquet_destination);

                        divCheminItem.on('mouseenter', function() {
                            const icon = $(this).find('.fa-network-wired');
                            icon.empty();
                            const type_trajet = icon.data('trajet');
                            icon.stop();
                            icon.css('top', 0);
                            icon.css('left', -100);

                            // Aller
                            if(type_trajet === 'aller' || type_trajet === 'aller-error'){
                                icon.animate({
                                    opacity: 0.5,
                                    left: "+=250",
                                }, 2000, function() {
                                    icon.animate({
                                        opacity: 1,
                                        top: "+=30",
                                    }, 2000, function() {
                                        if(type_trajet === 'aller-error'){
                                            icon.append('<i class="fas fa-times"></i>');
                                        }
                                        else{
                                            icon.append('<i class="fas fa-check"></i>');
                                        }
                                    });
                                });
                            }
                            // Aller-retour
                            else{
                                icon.animate({
                                    opacity: 0.5,
                                    left: "+=250",
                                }, 2000, function() {
                                    icon.animate({
                                        top: "+=60"
                                    }, 2000, function() {

                                        icon.animate({
                                            opacity: 1,
                                            left: "-=300"
                                        }, 2000, function(){
                                            if(type_trajet === 'retour-error'){
                                                icon.append('<i class="fas fa-times"></i>');
                                            }
                                            else{
                                                icon.append('<i class="fas fa-check"></i>');
                                            }
                                        });
                                    });
                                });
                            }
                        });

                        divCheminParent.append(divCheminItem);
                    });
                });
                element.append(divCheminParent);
            },
            error: function(){

            }
        });
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

        const tableID = table.attr('id');

        $('#'+tableID+' .table_body_row').fadeOut(350, function(){
        });

        table.attr('data-protocol', protocol_name);

        setTimeout(function() {
            $.ajax({
                type: "GET",
                url: "inc/ajax_table_trames.php",
                data: {page: page, nbRows: nbRows, protocolName: protocol_name},
                success: function(response){
                    if(response.length > 1){
                        $('#paginator-' + table.attr('id') + ' .paginator-item').remove();
                        generate_table_from_trames(table, response);
                    }

                    $('#'+tableID+' .table_body_row').fadeIn(350, function(){
                    });
                },
                error: function(){
                    $('#paginator-' + table.attr('id') + ' .paginator-item').remove();
                    $('#'+tableID+' .table_body_row').fadeIn(350, function(){
                    });
                }
            });
        }, 600);
    }

    function generate_table_from_trames(table, response){
        const tableID = table.attr('id');

        const trHeaderExist = $('#'+tableID+' .table_head').length;
        if(!trHeaderExist){
            const trHeaderNew = $('<div class="table_head"></div>');
            if(response != null){
                $.each(response[0], function(k, v) {
                    if(k !== 'id'){
                        const tdHeader = $('<p>'+ capitalizeFirstLetter(k.replaceAll('_', ' ')) + '</p>');
                        trHeaderNew.append(tdHeader);
                    }
                });
            }
            table.append(trHeaderNew);
        }

        const trBodyExist = $('#'+tableID+' .table_body').length;
        var goodBody = $('#'+tableID+' .table_body');
        if(!trBodyExist){
            const trBodyNew = $('<div class="table_body" id="'+tableID+'-css"></div>');
            goodBody = trBodyNew;
            table.append(goodBody);
        }

        $('#'+tableID+' .table_body_row').remove();

        let cpt = 0;
        if(response != null) {
            $.each(response, function () {
                if (cpt < response.length - 1) {
                    const trTrame = $('<div class="table_body_row" data-idtrame="' + $(this)[0]['id'] + '"></div>').on('click', function () {
                        ajax_getTrameDetail($(this).data("idtrame"));
                    });

                    $.each(this, function (k, v) {
                        if (k !== 'id') {
                            const tdTrame = $('<p>' + v + '</p>');
                            trTrame.append(tdTrame);
                        }
                    });
                    goodBody.append(trTrame);
                } else {
                    // Régénération du paginator s'il n'existe pas
                    const paginator = $('#paginator-' + tableID);

                    var goodPaginator;
                    if (paginator.length) {
                        goodPaginator = paginator;
                    } else {
                        goodPaginator = $('<div id="paginator-' + tableID + '" class="paginator"></div>');
                        table.after(goodPaginator);
                    }

                    goodPaginator.empty();

                    $.each(this, function (k, v) {
                        const paginatorItem = $('<span data-tableid="' + table.attr('id') + '" class="paginator-item"></span>');
                        if (v[1] === 'selected') {
                            paginatorItem.addClass('paginator-selected');
                        }
                        paginatorItem.text(v[0]);
                        paginatorItem.on('click', function () {
                            const page = parseInt($(this).text());
                            const table = $('#' + $(this).data("tableid"));
                            const protocol_name = table.attr('data-protocol');
                            ajax_getTrames(table, page, 10, protocol_name);
                        });
                        goodPaginator.append(paginatorItem);
                    });
                }
                cpt++;
            });
        }
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

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
            tmp = item.split("=");
            if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}

function getClassForCode(code, allerOnly = false){
    if(code === '0x00'){
        if(allerOnly){
            return 'blue';
        }
        return 'green';
    }
    else{
        return 'red';
    }
}