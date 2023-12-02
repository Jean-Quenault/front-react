# Projet Front Node.js

Ce projet affiche l'adresse IP, le système d'exploitation, et le navigateur internet de l'utilisateur. Il permet également l'affichage du conetenu d'une base de données comportant ces informations pour tous les utilisateurs. Le site permet aussi une fonctionnalité pour envoyer les informations de l'utilisateur vers la base de données via un bouton.

L'application sera build, son image Docker sera envoyé vers un registry AWS dans le but de faciliter un déploiement scalable (avec autoscaling group).

## Prérequis

- Docker
- Jenkins
- Deux noeuds EC2 Amazon Linux AWS
- Un registry AWS

## Installation et Configuration

1. **Cloner le dépôt :**

 - https://github.com/Jean-Quenault/front-react/tree/main

2. ** Définition des variables d'environnement**

 - Créez en fonction du besoin un fichier .env.development ou .env.production
 - Définissez vos variables

3. **Configurer Jenkins :**
- Assurez-vous que Jenkins est installé et configuré sur votre serveur.
- Créer et configurer votre noeud.
- Modifier le Jenkinsfile avec votre registry AWS.
- Utilisez le `Jenkinsfile` fourni dans le dépôt pour configurer votre pipeline.
- Lancer le pipeline. L'image de l'application web est désormais sur le registry.

4. **Déploiement avec Docker :**
- Sur votre noeud EC2, exécutez les commandes suivantes pour s'authentifier auprès du registry, pour push l'image, la construire et lancer le conteneur Docker :
  ```
  aws ecr get-login-password --region votre_region | docker login --username AWS --password-stdin votre_id_aws.dkr.ecr.votre_region.amazonaws.com
  docker pull votre_id_aws.dkr.ecr.votre_region.amazonaws.com/nom_repo_ecr:tag
  docker run -p port_local:port_container votre_id_aws.dkr.ecr.votre_region.amazonaws.com/nom_repo_ecr:tag

  ```

## Utilisation

- Ouvrez votre navigateur et accédez à `http://[adresse_IP_du_noeud_EC2]`.
- Vous verrez vos informations (IP, OS, navigateur) affichées.
- Utilisez le bouton fourni pour envoyer vos informations à la base de données.


## Contribution

Si vous souhaitez contribuer à ce projet, veuillez contacter Jean.

## Licence

Ce projet est privé.

## Contact

Pour toute question ou aide, veuillez contacter Jean.

## Remerciements

Merci à Armen Avdoyan.
