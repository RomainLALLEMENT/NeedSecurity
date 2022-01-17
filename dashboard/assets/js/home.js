
// script principal

$( document ).ready(function() {

    const table = $('#last-trames');
    ajax_getTrames(table, 1);

    $('.data-box').on('click', function(e){
        e.preventDefault();
        generate_protocol_path($(this).attr('data-protocol'));
    });

});
