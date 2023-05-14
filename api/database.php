<?php
    define('DSN','mysql:host=localhost;dbname=etudiant_db;port=3306;charset=utf8');
    define('USER','root');
    define('PASS','');
    define('PROLOGUE','<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>');

    function getConnect(){
        $pdo=new PDO(DSN,USER,PASS);
        $pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
        return $pdo;
    }

    function request($sql,$params=null){
        $pdo=getconnect();
        $req=$pdo->prepare($sql);
        if($params == null){
            $req->execute();
        }else{
            $req->execute($params);
        }       
        return $req;
    }


    //false pour recupere toute les information et tru une seul
    
    function recover($req,$one=true){
        $datas=null;
        $req->setFetchMode(PDO::FETCH_OBJ);
        if($one == true){
            $datas=$req->fetch();

        }else{
            $datas=$req->fetchAll();
        }
        return $datas;
    }

    //convertir un objet en xml

    function etudiantToXml($etudiant){
        $xml='';
        $xml= $xml.'<etudiant id="'. $etudiant->idetudiant .'">';

        $xml= $xml.'<matricule>';
        $xml= $xml.$etudiant->matricule;
        $xml= $xml.'</matricule>';

        $xml= $xml.'<nom>';
        $xml= $xml.$etudiant->nom;
        $xml= $xml.'</nom>';

        $xml= $xml.'<telephone>';
        $xml= $xml.$etudiant->telephone;
        $xml= $xml.'</telephone>';

        $xml= $xml.'</etudiant>';
        
        return $xml;
    }

    function getMessage($status, $content){
        $xml= PROLOGUE;
        $xml=$xml . '<message>';

        $xml=$xml . '<status>';
        $xml=$xml . $status;
        $xml=$xml . '</status>';

        $xml=$xml . '<content>';
        $xml=$xml . $content;
        $xml=$xml . '</content>';

        $xml=$xml. '</message>';

        return $xml;

    }

    // continuer avec api 
    //     update.php
    //     delete.php
    //     read.php lecture dun element

    // cote javascript
    //     XMLHTTPRequest
?>