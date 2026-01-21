/**
 * Exercice 151: Première fonction async
 * Objectifs:
 * 1. Convertir du code avec Promesses en async/await
 * 2. Comprendre que async retourne toujours une Promesse
 * 3. Utiliser await pour attendre une Promesse
 */

// Simulation d'une fonction qui retourne une promesse (API simulée)
function getUtilisateur() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id: 1, nom: "Dupont" });
        }, 1000);
    });
}

function chargerDonneesPromise() {
    console.log("1. Début chargement (Promise)");
    getUtilisateur()
        .then(user => {
            console.log("2. Utilisateur reçu (Promise):", user);
            return user;
        })
        .catch(err => console.error(err));
}


async function chargerDonneesAsync() {
    console.log("1. Début chargement (Async/Await)");
    

    const user = await getUtilisateur();
    
    console.log("2. Utilisateur reçu (Async/Await):", user);
    return user;
}


console.log("--- Test Promesses ---");
chargerDonneesPromise();


setTimeout(() => {
    console.log("\n--- Test Async/Await ---");
    chargerDonneesAsync().then(() => {
        console.log("3. Fin de la fonction async");
    });
}, 1500);

async function fetchData(url) {
    try {
        console.log(`Début de la récupération des données depuis : ${url}`);
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur HTTP ! statut : ${response.status}`);
        }
        const data = await response.json();
        console.log("Données récupérées avec succès :", data);
        return data;
    }
    catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        throw error;
    }
}

fetchData("https://jsonplaceholder.typicode.com/posts/1")
    .then((data) => {
        console.log("Traitement des données dans .then() :", data);
    })
    .catch((error) => {
        console.error("Erreur attrapée dans .catch() :", error);
    });