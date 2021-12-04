readme a faire

API Rest

Prérequis :<br>
-> Avoir node js npm d'installé <br>
-> Java 11<br>
-> installer docker<br>
Et je sais plus 

Run mysql admirer tout ça :<br>
Se placer dans /appbank-project/appbank<br>
**$./start.sh** : ça va lancer mysql admiNer dans un docker 

localhost:9000  (pour adminer)

Voir dans docker-compose.yaml pour les environment <br>
MYSQL_DATABASE <br>
MYSQL_USER <br>
MYSQL_PASSWORD <br>
MYSQL_ROOT_PASSWORD <br>
Pour se connecter...

-------------------------

Puis, il faut run tomcat tout ça :<br>
Se placer dans /appbank-project/appbank<br>
**$./mvnw spring-boot:run**

localhost:8080

Là, si on reactualise sur le localhost:9000 , on verra que les tables users administrators accounts sont crées automatiquement. A partir de là, on peut faire des requetes sur le port 8080 du localhost pour interagir avec la BDD (voir plus bas pr les requetes) 

---------------------------

Et enfin, run le frontend :<br>
Se placer dans /appbank-project-react<br>
**$npm start run**

localhost:3000

Pour l'instant y'a aucun lien entre le front et le middle/back

---------------------------

Requêtes faites :<br>
Ajouter un user (client)<br>
**$curl --location --request POST 'http://localhost:8080/api/users?email=dupontjean@randommail.com&firstName=jean&lastName=dupont'**
Contraintes respectées : id unique + mail unique. 

Lister la liste des users (clients)<br>
**$curl -X GET http://localhost:8080/api/users**

----------------------------

docker compose volume => données persistantes.<br>
Vider la bdd : ./stop.sh + docker prune 


A faire : le reste des requetes, la partie sécurité (droit d'exécuter telle ou telle requete..), le lien entre front et back et modifier le front en fonction
