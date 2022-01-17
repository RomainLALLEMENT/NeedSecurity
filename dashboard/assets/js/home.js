import {ajax_graph} from './graph.js';
import {showLogout} from "./modal.js";
import {ajax_getTrames} from "./tableau.js";
import {generate_search_page} from "./search.js";
import {generateDashboardPage} from "./dashboard.js";
// script principal

$( document ).ready(function() {
//Graph dashboard/index.php
//First graph

    ajax_graph('trames', 'protocol_name', 'pie', 'chart-pie1');
    ajax_graph('trames', 'protocol_name', 'bar', 'chart-bar1', 'hide');
    ajax_graph('trames', 'header_checksum', 'pie', 'chart-pie2', 'hide');

    const table = $('#last-trames');
    ajax_getTrames(table, 1);

    $('.data-box').on('click', function(e){
        e.preventDefault();
        generate_protocol_path($(this).attr('data-protocol'));
    });
    menuBack();
    const showModal = document.getElementById('logout-show');
    showModal.addEventListener('click', showLogout);
});

// MENU
function menuBack(){
    generateDashboardPage();
    //call function for generate page home here
    //menu nav
    const home = document.getElementById('page-accueil');
    const search = document.getElementById('page-recherche');

    home.addEventListener('click', ()=>{
        console.log('page-accueil');
        generateDashboardPage();
    })
    search.addEventListener('click', ()=>{
        console.log('click page recherche');
        generate_search_page();
    })


}

