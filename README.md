# Scam-Scan 2.0 - Site de Lecture Manga

Scam-Scan 2.0 est une plateforme web dédiée à la lecture en ligne de mangas. Ce projet permet aux utilisateurs de découvrir, lire et suivre les derniers chapitres de leurs mangas préférés grâce à une interface moderne, intuitive et responsive.

---

## Table des matières

- [Description](#description)
- [Fonctionnalités](#fonctionnalités)
- [Architecture du Projet](#architecture-du-projet)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Contribution](#contribution)
- [Licence](#licence)
- [Auteurs et Remerciements](#auteurs-et-remerciements)

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
- **Mise à jour automatique** : Récupération régulière des nouveaux chapitres grâce à des scripts automatisés.
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

   ```bash
   git clone https://github.com/LeRetourDuScam/Scam-Scan2.0.git
   cd Scam-Scan2.0
## Installation des dépendances

### Pour le frontend

```bash
cd Scam-scan.FRONTEND
npm install
Pour le backend
bash
Copy
Edit
cd ../Scam-scan.BACKEND
npm install
Pour les datascripts (si nécessaire)
bash
Copy
Edit
cd ../Scam-scan.DATASCRIPT
npm install
Configuration
Vérifiez et modifiez les fichiers de configuration (ex. .env) dans les dossiers FRONTEND et BACKEND selon vos besoins (port, base de données, clés API, etc.).

Utilisation
Démarrage du projet
Backend
Dans le dossier Scam-scan.BACKEND, lancez le serveur avec :

bash
Copy
Edit
npm start
Frontend
Dans le dossier Scam-scan.FRONTEND, démarrez l’interface utilisateur :

bash
Copy
Edit
npm start
Datascripts
Pour exécuter manuellement les scripts de mise à jour des mangas, utilisez :

bash
Copy
Edit
node script.js
(Adaptez les commandes en fonction des scripts et de votre gestionnaire de tâches.)

Contribution
Les contributions sont les bienvenues ! Pour contribuer :

Forkez le dépôt.

Créez une branche dédiée à votre fonctionnalité ou correction :

bash
Copy
Edit
git checkout -b feature/nom-de-la-fonctionnalite
Développez et testez vos modifications.

Committez vos changements :

bash
Copy
Edit
git commit -m "Ajout de la fonctionnalité XYZ"
Poussez votre branche sur votre fork :

bash
Copy
Edit
git push origin feature/nom-de-la-fonctionnalite
Ouvrez une Pull Request pour soumettre vos modifications.

Licence
Ce projet est distribué sous la licence MIT. Vous êtes libre de l'utiliser et de le modifier dans le respect des termes de cette licence.

Auteurs et Remerciements
LeRetourDuScam – Créateur et mainteneur principal.
Un grand merci à toutes les personnes ayant contribué, testé et fourni des retours pour améliorer ce projet. N’hésitez pas à nous contacter pour toute question ou suggestion.

Avec Scam-Scan 2.0, plongez dans l’univers du manga et profitez d’une expérience de lecture enrichie et accessible depuis tous vos supports. Bonne lecture !
