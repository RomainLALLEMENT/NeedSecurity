
//Show logout
const showModal = document.getElementById('btn-connection');
showModal.addEventListener('click', showConnect);
function showConnect(){
    console.log('Ask for connection');
    const modal = document.querySelector('#modal-connection');
    const closeModal = document.querySelector('#close');
    modal.style.display = "block";
    closeModal.addEventListener('click', ()=>{
        modal.style.display = "none";
    })
    window.addEventListener('click', (event) =>{
        if (event.target == modal) {
            modal.style.display = "none";
        }
    })
};


//connection
const login = document.getElementById('user-id');
const pwd = document.getElementById('user-pwd');
const btnLog = document.getElementById('submited');

function connect() {
    const request = new XMLHttpRequest();
    request.open('POST', 'inc/login.php', true);

    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            console.log('succeed connection');
        }
    };

    request.onerror = function() {
        console.log('something went wrong');
    };

    request.send();
}



//Inscription
function signIn() {
    const request = new XMLHttpRequest();
    request.open('POST', 'inc/inscription.php', true);

    request.onreadystatechange = function() {
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
            console.log('succeed account created');
        }
    };

    request.onerror = function() {
        console.log('something went wrong');
    };

    request.send();
}
