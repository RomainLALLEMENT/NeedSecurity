function generateDashboardPage(){
    const container = document.getElementById('container');
    //clear container
    while(container.firstChild) {
        container.removeChild(container.firstChild);
    }
    const dashBoard = document.createElement('section');
    dashBoard.id = "dashboard";
    container.appendChild(dashBoard);

    //data box
    const dataDiv = document.createElement('div');
    dataDiv.classList.add('back-box');
    //get data
    let dataList = {
        'Total trame': 16,
        'nombre erreur': 4,
        'donnée perdu': 1,
        'undefinie': 4
    };
    for(const data in dataList){
        //creat box
        const dataBox = document.createElement('div');
        dataBox.classList.add('data-box');
        dataBox.classList.add('clickable');
        const dataBoxName = document.createElement('h3');
        dataBoxName.classList.add('data-box_name');
        dataBox.appendChild(dataBoxName);
        const dataBoxNb = document.createElement('p');
        dataBoxNb.classList.add('data-box_nb');
        dataBox.appendChild(dataBoxNb);

        //add info
        console.log(data);
        console.log(dataList[data]);
        dataBoxName.innerText = data;
        dataBoxNb.innerText = dataList[data];

        //put in the div container
        dataDiv.appendChild(dataBox);
    }
    dashBoard.appendChild(dataDiv);


}

export {generateDashboardPage};