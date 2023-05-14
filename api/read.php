<?php
    require_once 'header.php';
    require_once 'database.php';

    //$_REQUEST se comporte comme $_POST et $_GET
    $idetudiant=$_GET['idetudiant'];

    $sql= "select * from etudiant where idetudiant=?";
    $params= array($idetudiant);
    $req=request($sql, $params);
    $etudiant=recover($req,true);

    $xml= PROLOGUE;
    $xml= $xml . '<etudiants>';
    $xml= $xml . etudiantToXml($etudiant);
    $xml= $xml . '</etudiants>';
    echo $xml;

?>