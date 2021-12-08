**Binome** : Mélissa Perreymond & Samy Djama

# appbank : Une application bancaire fullstack sping-boot / react / keycloak


Il s'agit d'un projet universitaire en binôme dont le but est de fournir une API back d'application bancaire à un frontend. 

`appbank` est constituée d'un **Spring-Boot** Rest API `appbank-api `, et d'un frontend en **ReactJS**  `appbank-webui` sécurisé avec **keycloak**. La base de donnée utilisée pour l'API backend et celle de keycloak est **MySql**. La gestion de la base de donnée de l'API peut être faite depuis **adminer**.

## Prérequis

- `Java 11.0.11`
- `Tomcat 9.0.54`
- `Maven 3.6.3`
- `Node 14.18.1`
- `npm 6.14.15`
- `Docker 20.10.7` 
- `Docker-Compose 1.25.0`

## Lancer l'environnement

- Ouvrir le terminal et aller au dossier appbank 
- Lancer le script de démarrage  :
```
$./start.sh
``` 
Ce script lancera la base de donnée de l'API Rest et celle de keycloak. 

## Exécuter appbank avec Maven & Npm

**appbank-api**
- Ouvrir le terminal et aller au dossier appbank/appbank-api
- Lancer la commande **maven** : 
```
$./mvnw spring-boot:run
```
**appbank-webui**
- Ouvrir le terminal et aller au dossier appbank/appbank-webui
- Lancer la commande **npm**:
```
$npm start run
```
## Stopper l'environnement

- Ouvrir le terminal et aller au dossier appbank 
- Lancer le script de démarrage  :
```
$./stop.sh
```
- Vous pouvez vérifier que le stop s'est bien passé en lançant la commande dans ce même dossier : 
```
$ docker ps -a
```
- L'affichage ne devrait afficher **aucun** container :
```
CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES
```
- Si ce n'est pas le cas, vous pouvez toujours lancer la commande :
```
docker system prune
``` 
Cependant, la commande entraînera la **suppression des données que manipule l'API**. 




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
