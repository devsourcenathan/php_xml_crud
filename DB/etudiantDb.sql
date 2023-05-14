drop DATABASE if EXISTS EtudiantDbWeb;
create DATABASE if NOT EXISTS EtudiantDbWeb CHARACTER utf-8;
use EtudiantdbWeb;
create table etudiant(
    idetudiant integer NOT NULL auto_increment,
    matricule VARCHAR(128),
    nom VARCHAR(128),
    telephone varchar(128),
    PRIMARY key(idetudiant)
);