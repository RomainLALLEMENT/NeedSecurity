function ajax_graph(table, column, type, docId){
    setTimeout(function() {
        $.ajax({
            type: "GET",
            url: "inc/ajax_graph.php",
            data: {table: table,
                column:  column},
            success: function(response){
                console.log('sucess');
                if(response.length > 0){
                    console.log('response');
                    console.log(response);
                    const graph = JSON.parse(response);
                    //generate graph
                    console.log(graph);
                    createGraph(graph, type, docId );
                }
            },
            error: function(){
                console.log('error');
            }
        });
    }, 600);
}

const test = document.getElementById('test');
test.addEventListener('click', ()=>{
    ajax_graph('trames', 'protocol_name', 'pie', 'Chart');
})

// Graph
function createGraph(object, type, docId ) {
    //Key = key, Data = Value, color
    let dataT = [];
    let keyT = [];
    let randomColor = [];
    for (const key in object) {
        keyT.push(key);
        dataT.push(object[key]);
        randomColor.push(color());
    }
    console.log(keyT);
    console.log(dataT);
    console.log(randomColor);
//func for colos
    function color(){
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
    return "#" + randomColor;
    }

//Let's updatedDataSet[] be the array to hold the upadted data set with every update call
    let updatedDataSet;
    /* Creating graph */
    let container = document.getElementById(docId);
    let graph = new Chart(container, {
        type: type,
        data: {
            labels: keyT,
            datasets: [{
                backgroundColor: randomColor,
                data: dataT
            }]
        },
        options: {
            responsive: true,
            layout: {
                padding: 30
            }
        }
    });
}
    /*Function to update the bar chart*/
    function updateGraph(chart, color, data) {
        chart.data.datasets.pop();
        chart.data.datasets.push({
            backgroundColor: color,
            data: data
        });
        chart.update();
    }

    /*Updating the bar chart with updated data in every second. */
    // setInterval(function () {
    //     updatedDataSet = [Math.random(), Math.random(), Math.random(), Math.random()];
    //     updateBarGraph(chart, 'Prediction', colouarray, updatedDataSet);
    // }, 10000);
