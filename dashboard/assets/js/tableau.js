
$( document ).ready(function() {

    function ajax_getTrames(table, page, nbRows = 10, protocol_name = '') {

        const tableID = table.attr('id');

        $('#' + tableID + ' .table_body_row').fadeOut(350, function () {
        });

        table.attr('data-protocol', protocol_name);

        setTimeout(function () {
            $.ajax({
                type: "GET",
                url: "inc/ajax_table_trames.php",
                data: {page: page, nbRows: nbRows, protocolName: protocol_name},
                success: function (response) {
                    if (response.length > 1) {
                        $('#paginator-' + table.attr('id') + ' .paginator-item').remove();
                        generate_table_from_trames(table, response);
                    }

                    $('#' + tableID + ' .table_body_row').fadeIn(350, function () {
                    });
                },
                error: function () {
                    $('#paginator-' + table.attr('id') + ' .paginator-item').remove();
                    $('#' + tableID + ' .table_body_row').fadeIn(350, function () {
                    });
                }
            });
        }, 600);
    }

    function generate_table_from_trames(table, response) {
        console.log('generate_table_from_trames');
        console.log(response);
        const tableID = table.attr('id');

        const trHeaderExist = $('#' + tableID + ' .table_head').length;
        if (!trHeaderExist) {
            const trHeaderNew = $('<div class="table_head"></div>');
            if (response != null) {
                $.each(response[0], function (k, v) {
                    if (k !== 'id') {
                        const tdHeader = $('<p>' + capitalizeFirstLetter(k.replaceAll('_', ' ')) + '</p>');
                        trHeaderNew.append(tdHeader);
                    }
                });
            }
            table.append(trHeaderNew);
        }

        const trBodyExist = $('#' + tableID + ' .table_body').length;
        var goodBody = $('#' + tableID + ' .table_body');
        if (!trBodyExist) {
            const trBodyNew = $('<div class="table_body" id="' + tableID + '-css"></div>');
            goodBody = trBodyNew;
            table.append(goodBody);
        }

        $('#' + tableID + ' .table_body_row').remove();

        let cpt = 0;
        if (response != null) {
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

});