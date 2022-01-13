
//Show logout
const showConnect = document.getElementById('btn-connection');
const showLogin = document.getElementById('btn-login');
showLogin.addEventListener('click', showModal);
showConnect.addEventListener('click', showModal);
function showModal(){
    console.log('Ask for connection');
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const content = document.createElement('div');
    content.classList.add('modal-content');
    const closeModal = document.createElement('div');
    closeModal.classList.add('absolute-modal');
    const iClose = document.createElement('i');
    iClose.id = 'close';
    iClose.classList.add('far');
    iClose.classList.add('fa-times-circle');
    closeModal.appendChild(iClose);
    content.appendChild(closeModal);
    modal.appendChild(content);
    const form = document.createElement('form');
    form.classList.add('form-modal');
    content.appendChild(form);

    document.body.insertAdjacentElement("beforeend", modal);

    loginModal();

    closeModal.addEventListener('click', ()=>{
        modal.remove();
    })
    window.addEventListener('click', (event) =>{
        if (event.target == modal) {
            modal.remove();
        }
    })
};
function loginModal(){
    const form = document.querySelector('.form-modal');
    form.innerText = '';
    form.id = 'login-form';
    form.setAttribute('method', 'post');
    form.setAttribute('action', '');
    form.setAttribute('novalidate', 'novalidate');
    let html = `
            <label for="user-id">Adresse e-mail</label>
            <input type="email" name="user-id" id="user-id">

            <label for="user-pwd">Mots de passe</label>
            <input type="password" name="user-pwd" id="user-pwd">

            <input type="submit" id="submitted-login" value="Se connecter">
            <p class="error" id="error-login"></p>
            <p class="low-focus"><a href="request_pwd.php">Mots de passe oublié</a></p>

            <p class="sub-btn-modal" id="sign-in">Inscrivez vous</p>
       `;
    form.innerHTML = html;
    const sign = document.getElementById('sign-in');
    sign.addEventListener('click', signModal);
}

function signModal(){
    const form = document.querySelector('.form-modal');
    form.innerText = '';
    form.id = 'register-form';
    form.setAttribute('method', 'post');
    form.setAttribute('action', '');
    form.setAttribute('novalidate', 'novalidate');
    let html = `
            <label for="last-name">Nom</label>
            <input type="text" name="last-name" id="last-name">

            <label for="first-name">Prénom</label>
            <input type="text" name="first-name" id="first-name">

            <label for="email">Adresse e-mail</label>
            <input type="email" name="email" id="email">

            <label for="pwd">Mots de passe</label>
            <input type="password" name="pwd" id="pwd">

            <label for="pwd-confirm">Confirmer votre mots de passe</label>
            <input type="password" name="pwd-confirm" id="pwd-confirm">

            <input type="submit" id="submitted-sign" value="S'inscrire">
            <p class="error" id="error-register"></p>

            <p class="sub-btn-modal" id="login">Se connecter</p>
        
`;
    form.innerHTML = html;
    const login = document.getElementById('login');
    login.addEventListener('click', loginModal);
}

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

    const input_email = $('#email');
    const input_pwd = $('#pwd');
    const input_nom = $('#last-name');
    const input_prenom = $('#first-name');
    const input_pwdconf = $('#pwd-confirm');
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