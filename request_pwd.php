<?php
require_once ('inc/bases.php');
include_once ('inc/header.php');
?>

    <div class="modal-content"><div class="absolute-modal"></div><form class="form-modal" id="login-form" method="post" action="" novalidate="novalidate">
                <label for="user-pwd">Nouveau mot de passe</label>
                <input type="password" name="user-pwd" id="user-pwd">

                <label for="user-pwd">Confirmer votre nouveau mot de passe</label>
                <input type="password" name="user-pwd" id="user-pwd">

                <input type="submit" id="submitted-login" value="Valider">
                <p class="error" id="error-login"></p>
            </form></div>

<?php
include('inc/footer.php');
