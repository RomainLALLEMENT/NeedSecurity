
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
    form.css('display', 'none');

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
            },
            error: function(){
                form.css('display', 'block');
            }
        });
    }, 500);
}

//inscription
const registerError = $('#error-register'); // à modifier selon l'id de l'erreur
const formRegister = $('#register-form'); // à modifier selon l'id du formulaire d'inscription

formRegister.on( "submit", function(e) {
    e.preventDefault();

    const input_email = $('#user-email');
    const input_pwd = $('#user-pwd');
    const input_nom = $('#user-nom');
    const input_prenom = $('#user-prenom');
    const input_pwdconf = $('#user-pwd-conf');
    const email = input_email.val();
    const nom = input_nom.val();
    const prenom = input_prenom.val();
    const pass = input_pwd.val();
    const pass_conf = input_pwdconf.val();

    input_pwd.val('');
    input_pwdconf.val('');

    if(email.length <= 0) {
        loginError.text('Veuillez renseigner une adresse mail');
    }
    else if(pass.length <= 0) {
        loginError.text('Veuillez renseigner un mot de passe');
    }
    else if(pass !== pass_conf) {
        loginError.text('Veuillez renseigner des mots de passe identiques');
    }
    else {
        ajax_requestRegister(email, pass, pass_conf, prenom, nom);
    }
});

// Requête d'inscription
function ajax_requestRegister(email, pass, confPass, prenom = '', nom = ''){ // champs facultatifs nom et prenom
    formRegister.css('display', 'none');

    setTimeout(function() {
        $.ajax({
            type: "GET",
            url: "inc/ajax_inscription.php",
            data: {email: email, password: pass, passwordConf: confPass, prenom: prenom, nom: nom},
            success: function(response){
                if(response.length > 0){
                    if(response === 'ok'){
                        // à ajouter: cacher la modal d'inscription
                        showConnect(); // l'inscription s'est bien passée, l'utilisateur peut maintenant se connecter (on montre la modal de connexion)
                    }
                    else{
                        registerError.text(response);
                        formRegister.css('display', 'block');
                    }
                }
                else{
                    registerError.text('Une erreur s\'est produite');
                    formRegister.css('display', 'block');
                }
            },
            error: function(){
                formRegister.css('display', 'block');
            }
        });
    }, 200);
}