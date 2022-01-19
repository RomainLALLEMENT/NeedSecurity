import {ajax_getTrameDetail} from "./tableau.js";

const container = $('#container');

function generate_protocol_path(protocol_name){
    container.empty();

    const dashboardMain = $('<section id="simulation"></section>');

    // Ligne titre
    var item = $('<div class="back-box"></div>');
    var box_clickable = $('<div class="data-box clickable"></div>');
    box_clickable.append($('<h3 class="data-box_name">ICMP</h3>')).on('click', function(){
       generate_protocol_path('ICMP');
    });
    item.append(box_clickable);
    box_clickable = $('<div class="data-box clickable"></div>');
    box_clickable.append($('<h3 class="data-box_name">UDP</h3>')).on('click', function(){
        generate_protocol_path('UDP');
    });
    item.append(box_clickable);
    box_clickable = $('<div class="data-box clickable"></div>');
    box_clickable.append($('<h3 class="data-box_name">TCP</h3>')).on('click', function(){
        generate_protocol_path('TCP');
    });
    item.append(box_clickable);
    box_clickable = $('<div class="data-box clickable"></div>');
    box_clickable.append($('<h3 class="data-box_name">TLSv1.2</h3>')).on('click', function(){
        generate_protocol_path('TLSv1.2');
    });
    item.append(box_clickable);
    dashboardMain.append(item);

    // Ligne chemins
    item = $('<div class="back-box"></div>');
    dashboardMain.append(item);
    ajax_generateProtocolPath(item, protocol_name);

    container.append(dashboardMain);
}

function ajax_generateProtocolPath(element, protocol_name){
    showLoading('Récupération des données...');
    $.ajax({
        type: "GET",
        url: "inc/ajax_get_simulation.php",
        data: {protocolName: protocol_name},
        success: function(response){
            console.log(response);
            const chemins = JSON.parse(response);
            console.log(chemins);
            const divCheminParent = $('<div class="chemin-parent">');
            divCheminParent.append('<h2>Protocole '+protocol_name+'</h2>');
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

                    if(protocol_name === 'ICMP'){
                        const arrow = $('<i class="fas fa-long-arrow-alt-right chemin-paquet return-'+getClassForCode(this.statut)+'"></i>');
                        if(this.statut.length > 0){
                            arrow.append('<span class="chemin-code-1">' + this.statut + '</span>');
                            arrow.append('<i data-trajet="retour-error" class="fas fa-network-wired"></i>');
                        }
                        else{
                            arrow.append('<span class="chemin-code-1">0x00</span>');
                            arrow.append('<i data-trajet="aller-retour" class="fas fa-network-wired"></i>');
                        }

                        const arrow_retour = $('<i class="fas fa-long-arrow-alt-left chemin-paquet return-'+getClassForCode(this.statut)+'"></i>');
                        arrow_retour.append('<span class="chemin-code-2">0x00</span>');
                        arrows.append(arrow);
                        arrows.append(arrow_retour);
                    }
                    else{
                        const arrow = $('<i class="fas fa-long-arrow-alt-right chemin-paquet return-green"></i>');
                        arrow.append('<span class="chemin-code-1">0x00</span>');
                        arrow.append('<i data-trajet="aller" class="fas fa-network-wired"></i>');
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
            hideLoading(500);
        },
        error: function(){
            hideLoading(500);
        }
    });
}

function getClassForCode(code, allerOnly = false){
    if(code.length == 0){
        return 'green';
    }
    else if(code === 'unverified'){
        return 'blue';
    }
    else{
        return 'red';
    }
}

export {generate_protocol_path};