# with-mongodb-app

## Description

Le projet `with-mongodb-app` est une API RESTful conçue pour interagir avec une base de données de films sur MongoDB. Elle permet aux utilisateurs de rechercher, ajouter, mettre à jour et supprimer des films et des commentaires liés à ces films. Utilisant Next.js et MongoDB Atlas, cette API fournit une solution puissante et évolutive pour la gestion des données cinématographiques.

## Installation

### Prérequis

- Node.js (version 12 ou plus)
- npm (version 6 ou plus) ou yarn (version 1.22 ou plus)
- Un compte MongoDB Atlas

### Mise en place

1. Clonez le dépôt GitHub :
   `git clone https://github.com/OssamaAfri/With-mongodb-app.git && cd With-mongodb-app`

2. Installez les dépendances :
   `npm install` ou `yarn install`

3. Configurez votre base de données MongoDB Atlas et ajoutez la chaîne de connexion dans un fichier `.env.local` à la racine du projet :
   `MONGODB_URI=votre_chaine_de_connexion_mongodb`

4. Lancez le serveur de développement :
   `npm run dev` ou `yarn dev`
   Puis, ouvrez `http://localhost:3000` dans votre navigateur.

## Stack Technologique

- **Next.js** : Un framework React pour des applications rendues côté serveur.
- **MongoDB** : Une base de données NoSQL pour un stockage flexible des documents.
- **MongoDB Atlas** : Une plateforme cloud pour héberger et gérer des bases de données MongoDB.

## Conception de l'API

Endpoints disponibles :

- **GET `/movies`** : Récupère tous les films.
- **GET `/movie/:idMovie`** : Récupère un film par son ID.
- **POST `/movie/:idMovie`** : Ajoute un nouveau film.
- **PUT `/movie/:idMovie`** : Met à jour un film existant.
- **DELETE `/movie/:idMovie`** : Supprime un film.

Pour les commentaires :

- **GET `/movie/comments`** : Récupère tous les commentaires d'un film.
- **GET `/movie/comment/:idComment`** : Récupère un commentaire par son ID.
- **POST `/movie/comment/:idComment`** : Ajoute un nouveau commentaire.
- **PUT `/movie/comment/:idComment`** : Met à jour un commentaire existant.
- **DELETE `/movie/comment/:idComment`** : Supprime un commentaire.