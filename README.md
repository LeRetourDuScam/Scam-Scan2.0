# Scam-Scan 2.0 - Site de Lecture Manga

Scam-Scan 2.0 est une plateforme web dédiée à la lecture en ligne de mangas. Ce projet avait pour but de s'entrainer avec angular et mieu comprendre certain concept du web il est fonctionnel. il suffit de créer un base mongodb et d'inserer les données avec les scripts mis a disposition pour le reste tout se trouve dans la suite du readme.

---

## Table des matières

- [Description](#description)
- [Fonctionnalités](#fonctionnalités)
- [Architecture du Projet](#architecture-du-projet)
- [Installation](#installation)
- [Licence](#licence)
- [Auteurs](#auteurs)

---

## Description

Scam-Scan 2.0 est une solution complète pour la lecture de mangas en ligne. Le projet se divise en plusieurs parties :

- **Scam-scan.FRONTEND** : L'interface utilisateur développée en HTML, CSS (SCSS) et TypeScript/JavaScript pour une expérience de lecture fluide et réactive.
- **Scam-scan.BACKEND** : Le serveur qui gère les requêtes, l’authentification et l’accès aux données des mangas.
- **Scam-scan.DATASCRIPT** : Les scripts dédiés à la récupération, la mise à jour et le traitement des données (chapitres, titres, images, etc.).

Ce projet vise à offrir une plateforme centralisée où les passionnés de manga peuvent facilement accéder aux contenus à jour.

---

## Fonctionnalités

- **Lecture en ligne** : Accès aux chapitres de mangas via une interface dédiée.
- **Navigation intuitive** : Interface réactive permettant de rechercher et filtrer les mangas par genres ou titres.
- **Design responsive** : Optimisé pour une lecture sur ordinateurs, tablettes et smartphones.
- **Sécurité et performance** : Architecture backend conçue pour offrir une navigation sécurisée et fluide.

---

## Architecture du Projet

Le projet est organisé en trois grands dossiers :

- **Scam-scan.FRONTEND** : Contient le code source de l'interface utilisateur (pages web, composants, styles, etc.).
- **Scam-scan.BACKEND** : Regroupe les fichiers liés au serveur (API, gestion des utilisateurs, connexions à la base de données, etc.).
- **Scam-scan.DATASCRIPT** : Scripts d'import, d'analyse et de mise à jour des données des mangas.

Cette structure modulaire facilite le développement, la maintenance et l’évolution du projet.

---

## Installation

### Prérequis

- **Node.js** (version 14 ou supérieure)
- **npm** ou **yarn**
- **Git**

### Étapes d'installation

1. **Cloner le dépôt :**

   ```sh
   git clone https://github.com/LeRetourDuScam/Scam-Scan2.0.git
   cd Scam-Scan2.0
   ```
## Installation des dépendances

### Pour le frontend

```sh
cd Scam-scan.FRONTEND
npm install
```
### Pour le backend
```sh
cd ../Scam-scan.BACKEND
npm install
```
### Pour les datascripts (si nécessaire)
```sh
cd ../Scam-scan.DATASCRIPT
npm install
```

## Configuration
Vérifiez et modifiez les fichiers de configuration (ex. .env) dans les dossiers FRONTEND et BACKEND selon vos besoins (port, base de données, clés API, etc.).

### Backend
Dans le dossier Scam-scan.BACKEND, lancez le serveur avec :

```sh
npm start
```
### Frontend
Dans le dossier Scam-scan.FRONTEND, démarrez l’interface utilisateur :

```sh
npm start
```

### Datascripts
Pour exécuter manuellement les scripts de mise à jour des mangas, utilisez :

```sh
node script.js
```

(Adaptez les commandes en fonction des scripts et de votre gestionnaire de tâches.)

## Licence
Ce projet est distribué sous la licence MIT. Vous êtes libre de l'utiliser et de le modifier dans le respect des termes de cette licence.

## Auteurs
LeRetourDuScam – Créateur et mainteneur principal.
