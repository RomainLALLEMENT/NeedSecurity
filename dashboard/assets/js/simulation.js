
$( document ).ready(function() {

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

});