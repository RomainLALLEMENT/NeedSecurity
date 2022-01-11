// JS du back

$( document ).ready(function() {


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

    /* Paginator tableau des dernières trames */
});

function ajax_getTrames(table, page){
    const loader = generate_loader();
    table.after(loader);
    table.empty();
    table.css('display', 'none');

    setTimeout(function() {
        $.ajax({
            type: "GET",
            url: "inc/ajax_table_trames.php",
            data: {page: page, nbRows: 5},
            beforeSend: function(){
                /*btn.fadeOut(1000);*/
            },
            success: function(response){
                if(response.length > 1){
                    generate_table_from_trames(table, response);
                }

                loader.remove();
                table.css('display', 'block');
            },
            error: function(){

            }
        });
    }, 500);
}

function generate_table_from_trames(table, response){
    const trHeader = $('<tr class="table-header"></tr>');

    $.each(response[0], function(k, v) {
        const tdHeader = $('<td>'+ k + '</td>');
        trHeader.append(tdHeader);
    });

    table.append(trHeader);

    let cpt = 0;
    $.each(response, function() {
        if(cpt < response.length - 1){
            const trTrame = $('<tr></tr>');
            $.each(this, function(k, v) {
                const tdTrame = $('<td>'+v+'</td>');
                trTrame.append(tdTrame);
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
                    ajax_getTrames(table, page, $(this));
                });
                paginator.append(paginatorItem);
            });
            table.append(paginator);
        }
        cpt++;
    });
}

function generate_loader(){
    const loaderContainer = $("<div class=\"loader-container\"></div>");
    const loader = $("<div class=\"loader\"></div>");
    const square_one = $("<div class=\"square one\"></div>");
    const square_two = $("<div class=\"square two\"></div>");
    loaderContainer.append(loader);
    loader.append(square_one, square_two);
    return loaderContainer;
}