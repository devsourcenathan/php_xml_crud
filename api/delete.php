<?php
    require_once 'header.php';
    require_once 'database.php';


    $idetudiant=$_GET['idetudiant'];


    $sql= "delete from etudiant where idetudiant=?";
    $params= array($idetudiant);
    request($sql, $params);
    
    echo getMessage(
        'delete',
        'etudiant supprimer avec success'
    );
?>