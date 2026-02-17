# Projet Chat Web

Application de chat simple, moderne et fonctionnelle, utilisant Next.js, SQLite et l'API Groq.

## Structure du Dossier

*   **frontend/** : Contient tous les éléments de l'interface utilisateur.
    *   components/ : Composants React réutilisables (Chat, MessageList, MessageInput).
    *   hooks/ : Logique de gestion d'état (useChat).
    *   styles/ : Fichiers CSS globaux.
*   **backend/** : Contient la logique serveur et base de données.
    *   prisma/ : Schéma de la base de données SQLite.
    *   services/ : Fonctions métier (Appel à Groq, sauvegarde en DB).
    *   lib/ : Instance unique du client Prisma.
*   **app/** : Dossier principal de Next.js (App Router).
    *   pi/ : Routes API (/api/chat).
    *   page.js : Page d'accueil.
*   **data/** : Dossier contenant le fichier de base de données pp.db.

## Prérequis

*   Node.js (v18+)
*   Une clé API Groq (https://console.groq.com/)

## Installation

1.  **Installer les dépendances** :
    `ash
    npm install
    `

2.  **Configuration** :
    *   Renommez .env.example en .env.
    *   Ajoutez votre clé API Groq dans le fichier .env :
        `env
        GROQ_API_KEY=votre_cle_api_ici
        `

3.  **Initialiser la base de données** :
    Créez les tables dans SQLite :
    `ash
    npx prisma migrate dev --name init --schema=backend/prisma/schema.prisma
    `

## Lancement

Pour lancer le serveur de développement :

`ash
npm run dev
`

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Fonctionnement

1.  L'utilisateur saisit un message.
2.  Le rontend envoie ce message à l'API (POST /api/chat).
3.  Le ackend sauvegarde le message (User) via Prisma.
4.  Le ackend interroge l'IA (Groq).
5.  Le ackend sauvegarde la réponse (Assistant).
6.  La réponse est retournée au frontend et affichée.
