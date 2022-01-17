<?php
require_once ('inc/bases.php');
include_once ('inc/header.php');
?>
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport"
              content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>A propos de nous</title>
    </head>
    <body>

    <section id="abouts-us">
        <div>
            <h2>A propos de nous...</h2>
            <p><?= $NOM_SITE_COLORED; ?> est un projet concernant une plateforme d'analyse de trame qui permet d'éviter les attaques DDoS. Créer en janvier 2022 par l'équipe de <?= $NOM_SITE_COLORED; ?>, elle est composée de 4 développeurs qui sont :</p>
            <ul>
                <li>Léonard JOUEN (Chef de projet & Développeur Back-End)</li>
                <li>Johann SIX (Développeur Back-End)</li>
                <li>Romain LALLEMENT (Développeur Front-End)</li>
                <li>Anthony CHEVALIER (Développeur Front-End)</li>
            </ul>
        </div>
    </section>


    </body>
    </html>
<?php
include('inc/footer.php');
