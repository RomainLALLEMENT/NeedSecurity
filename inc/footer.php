<footer class="footer">
    <div class="footer-top">
        <div class="contact">
            <a href="tel:<?=  $PHONE; ?>"><i class="fas fa-phone-square"></i>  <?=  $PHONE; ?></a>
            <a href="mailto:<?=  $MAIL; ?>"><i class="fas fa-envelope"></i>  <?=  $MAIL; ?></a>
            <a href="#"><i class="fas fa-map-marked"></i>  <?=  $ADRESS; ?></a>
        </div>
        <div class="social-red">
            <a href="<?= $FACEBOOK;?>"><i class="fab fa-facebook-square"></i></a>
            <a href="<?= $LINKEDIN;?>"><i class="fab fa-linkedin"></i></a>
            <a href="<?= $TWITTER;?>"><i class="fab fa-twitter-square"></i></a>
        </div>
    </div>
    <div class="footer-bot">
        <p class="copyright">Need Security©2022</p>
        <p><a href="mentionslegales.php">Mentions légal</a></p>
        <p><a href="#">Conditions d'utilisation</a></p>
    </div>
</footer>
<div id="modal-connection" class="modal">git
    <div class="modal-content" >
        <form id="login-form" action="" method="post" novalidate>
            <label for="user-id">Adresse e-mail</label>
            <input type="text" name="user-id" id="user-id" value="">

            <label for="user-pwd">Mot de passe</label>
            <input type="password" name="user-pwd" id="user-pwd">

            <input type="submit" id="submitted-login">
            <p class="error-login" id="error-login"></p>

            <p>Inscrivez vous</p>
        </form>
    <div id="absolute-modal"><i id="close" class="far fa-times-circle"></i></div>
    </div>
</div>


<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.7.0/chart.min.js"></script>
<script src="./assets/js/main_js_commun.js"></script>
<script src="./assets/js/main.js"></script>

</body>
</html>