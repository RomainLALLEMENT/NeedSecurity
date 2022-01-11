<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/reset.css">
    <link rel="stylesheet" href="../assets/css/style_commun.css">
    <link rel="stylesheet" href="assets/css/style_back.css">
    <title><?= $NOM_SITE; ?></title>
</head>
<body>
<header id="header">
        <a href="index.php"><img class="logo" src="../assets/img/logo.png" alt="Logo"></a>
            <h1 class="site_name"><?= $NOM_SITE_COLORED; ?></h1>
            <p>Pseudo</p>
            <a href="#"><i class="fas fa-sign-out-alt"></i></a>
</header>
<div id="dashboard-menu">
    <ul>
        <li id="page-accueil" class="li-selected"><i class="fas fa-house-user"></i> Résumé</li>
        <li id="page-details"><i class="fas fa-database"></i> Détails</li>
        <li id="page-log"><i class="fas fa-clipboard-list"></i> Logs</li>
    </ul>
</div>