<?php

session_start();
$_SESSION = array();

if (isset($_COOKIE['member_email'])) {
    unset($_COOKIE['member_email']);
    setcookie('member_email', '');
}

unset($_SESSION['user']);

session_destroy();
header('Location: ../index.php');

