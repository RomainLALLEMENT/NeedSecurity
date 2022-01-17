import {reloadBd} from "./reload-bd.js";
import {showLogout} from "./modal.js";
import {ajax_getTrames} from "./tableau.js";
import {generate_search_page} from "./search.js";
import {generateDashboardPage} from "./dashboard.js";
// script principal

$( document ).ready(function() {
    // reload db
    reloadBd();
    setInterval(reloadBd, 300000);



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
        generate_search_page();
    })


}

