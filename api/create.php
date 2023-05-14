<?php
    require_once 'header.php';
    require_once 'database.php';

    $matricule=$_POST['matricule'];
    $nom=$_POST['nom'];
    $telephone=$_POST['telephone'];


    $sql= 'insert into etudiant set matricule=?,nom=?,telephone=?';
    $params= array($matricule,$nom,$telephone);
    request($sql, $params);

    echo getMessage(
        'success',
        'etudiant ajouter avec success'
    );

?>