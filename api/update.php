<?php
    require_once 'header.php';
    require_once 'database.php';

    $idetudiant= $_POST['idetudiant'];
    $nom= $_POST['nom'];
    $telephone= $_POST['telephone'];

    $sql= "update etudiant set nom=?, telephone=? where idetudiant=?";
    $params= array($nom,$telephone,$idetudiant);
    request($sql, $params);

    echo getMessage(
        'update',
        'etudiant modifier avec success'
    );
?>