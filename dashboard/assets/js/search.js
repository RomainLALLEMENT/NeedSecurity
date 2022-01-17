import {generate_table_from_trames} from "./tableau.js";

var searchTimer = null;
    const container = $('#container');
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

    export {generate_search_page};