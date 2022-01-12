<?php
require_once ('inc/bases.php');
include_once ('inc/header.php');
?>
<section>
    <div class="wrap">
        <h2>Mentions légales</h2>
        <p class="trait_blanc"></p>

        <h3>INFORMATIONS EDITORIALES</h3>
        <p class="site_name"><?= $NOM_SITE_COLORED; ?></p>
        <p>Analyse de trames réseaux</p>
        <p>Place Henri Gadeau de Kerville</p>
        <p>76000 ROUEN</p>
        <p><a href="mailto:<?=  $MAIL; ?>"><?=  $MAIL; ?></a></p>
        <p>Publication du contenu du site web : L'équipe <?= $NOM_SITE_COLORED; ?>, Chef du projet <?= $NOM_SITE_COLORED; ?> : Léonard JOUEN</p>
        <p>La conception éditoriale, le suivi, la maintenance technique et les mises à jour du site internet sont assurés par <?= $NOM_SITE_COLORED; ?></p>
    </div>
</section>

<?php
include('inc/footer.php');
