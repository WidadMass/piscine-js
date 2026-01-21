/**
 * Exercice 163: Gestion des erreurs réseau
 * Objectifs:
 * 1. Distinguer erreur réseau (offline) vs erreur HTTP (404, 500)
 * 2. Gérer proprement les différentes erreurs
 */

async function fetchAvecGestionErreurs(url) {
    console.log(`\n📡 Tentative de connexion à : ${url}`);
    
    try {
        const response = await fetch(url);

        // Erreur HTTP (La requête est passée, mais le serveur a répondu une erreur ex: 404, 500)
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("✅ Succès !", data);

    } catch (erreur) {
        // Distinction des types d'erreurs
        if (erreur.name === 'TypeError' && erreur.message.includes('fetch')) {
            // Souvent causé par une perte de connexion réseau ou DNS invalide
            console.error("❌ ERREUR RÉSEAU : Impossible de joindre le serveur. Vérifiez votre connexion.");
        } else {
            // Autres erreurs (HTTP throw ci-dessus, ou erreur de parsing JSON)
            console.error(`❌ ERREUR : ${erreur.message}`);
        }
    }
}

async function main() {
    // 1. URL valide (Succès)
    await fetchAvecGestionErreurs('https://jsonplaceholder.typicode.com/posts/1');

    // 2. URL valide mais ressource inexistante (Erreur HTTP 404)
    await fetchAvecGestionErreurs('https://jsonplaceholder.typicode.com/posts/999999');

    // 3. Domaine invalide (Erreur Réseau simulée)
    await fetchAvecGestionErreurs('https://domaine-qui-n-existe-pas-12345.com/data');
}

main();
