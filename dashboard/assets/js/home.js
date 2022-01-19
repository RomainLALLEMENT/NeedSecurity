import {reloadBd} from "./reload-bd.js";
import {showLogout} from "./modal.js";
import {generate_search_page} from "./search.js";
import {generateDashboardPage} from "./dashboard.js";
import {generate_protocol_path} from "./simulation.js";
import {generate_details_protocol_page} from "./detail.js";
// script principal

$( document ).ready(function() {
    // reload db
    reloadBd();
    setInterval(reloadBd, 300000);

    //menu
    //menuBack();

    //modal logout
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
    const detail = document.getElementById('page-details');
    const simulation = document.getElementById('page-simulation');

    home.addEventListener('click', (e)=>{
        console.log('page-accueil');
        isActiveMenu(e);
        generateDashboardPage();
    })
    search.addEventListener('click', (e)=>{
        console.log('page-recherche');
        isActiveMenu(e);
        generate_search_page();
    })
    detail.addEventListener('click', (e)=>{
        console.log('page-details');
        isActiveMenu(e);
        generate_details_protocol_page('UDP');
    })
    simulation.addEventListener('click', (e)=>{
        console.log('page-simulation');
        isActiveMenu(e);
        generate_protocol_path('ICMP');
    })
}

function isActiveMenu(e){
    const menuSelected = document.querySelectorAll('.li-selected');
    menuSelected[0].classList.remove('li-selected');
    e.target.parentElement.classList.add('li-selected');
}

