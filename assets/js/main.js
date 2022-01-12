
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


//connexion
const loginError = $('#error-login');
const form = $('#login-form');

form.on( "submit", function(e) {
    e.preventDefault();

    const login = $('#user-id');
    const pwd = $('#user-pwd');
    const email = login.val();
    const pass = pwd.val();
    pwd.val('');
    if(email.length <= 0) {
        loginError.text('Veuillez renseigner une adresse mail');
    }
    else if(pass.length <= 0) {
        loginError.text('Veuillez renseigner un mot de passe');
    }
    else {
        ajax_requestLogin(email, pass);
    }
});

// Requête de login
function ajax_requestLogin(email, pass, connectionType = 'normal', rememberMe = 0){ // (rememberMe 0 ou 1)
    const loader = generate_loader();
    form.css('display', 'none');
    form.after(loader);

    setTimeout(function() {
        $.ajax({
            type: "GET",
            url: "inc/ajax_login.php",
            data: {email: email, password: pass, connectionType: connectionType, rememberMe: rememberMe},
            success: function(response){
                if(response.length > 0){
                    if(response === 'ok'){
                        window.location.href = './dashboard';
                    }
                    else{
                        loginError.text(response);
                        form.css('display', 'block');
                    }
                }
                else{
                    loginError.text('Une erreur s\'est produite');
                    form.css('display', 'block');
                }

                loader.remove();
            },
            error: function(){
                form.css('display', 'block');
                loader.remove();
            }
        });
    }, 500);
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
