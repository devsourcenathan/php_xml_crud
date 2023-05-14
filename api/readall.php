<?php
    require_once 'header.php';
    require_once 'database.php';



    $sql= 'select * from etudiant order by idetudiant desc';
    $req=request($sql);
    $etudiants=recover($req,false);

    
    $xml= PROLOGUE;
    $xml= $xml .'<etudiants>';

    if($etudiants != null && sizeof($etudiants)>0){
        foreach($etudiants as $etudiant){
            $xml=$xml . etudiantToXml($etudiant);
        }
    }
    $xml= $xml .'</etudiants>';
    echo $xml;

?>