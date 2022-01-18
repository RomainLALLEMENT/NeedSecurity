<?php
require_once ('inc/bases.php');

if (isLoggedIn()){
    header('Location: ./dashboard');
    die();
}

$error = [];
$succes = false;

if (!empty($_POST['submitted'])) {
    $email = cleanXss($_POST['email']);
    $error = emailValidation($error, $email, 'email');
    if(empty($error['email'])) {
        $sql = "SELECT email,token FROM users WHERE email = :email";
        $query = $pdo->prepare($sql);
        $query->bindValue(':email',$email,PDO::PARAM_STR);
        $query->execute();
        $verifEmail = $query->fetch();
        if($query->rowCount() > 0) {
            $succes = true;
            $token = generateRandomString(200);
            $sql = "UPDATE users SET token = :token WHERE email = :email";
            $query = $pdo->prepare($sql);
            $query->bindValue(':token',$token,PDO::PARAM_STR);
            $query->bindValue(':email',$email,PDO::PARAM_STR);
            $query->execute();
            // send email
        }else{
            $error['email'] = 'Cette adresse email n\'existe pas';
        }
    }

}

include_once ('inc/header.php');
?>

    <section id="lost-pwd">
        <div class="wrap_contact">
            <?php if ($succes){ ?>
                <div class="msg">
                    <p>L'email a bien été envoyé.</p>
                    <div class="back">
                        <p><a href="index.php">Retour à l'accueil</a></p>
                        <p><a href="recup_pwd.php?token=<?= urlencode($token); ?>&email=<?= urlencode($verifEmail['email']); ?>">Cliquez ici pour modifier votre mot de passe</a></p>
                    </div>

                </div>
            <?php }else { ?>

                <form action="" method="post" class="wrapform" novalidate>
                    <label for="email">Votre adresse email :</label>
                    <input type="email" class="input_email" name="email" id="email" placeholder="">
                    <span class="error"><?= returnError($error, 'email');?></span>
                    <input type="submit" class="submit" name="submitted" value="Envoyer">
                </form>
            <?php }?>
        </div>
    </section>

<?php
include('inc/footer.php');
