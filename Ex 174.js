/**
 * Exercice 174: Headers et authentification
 * 
 * Objectifs :
 * 1. Ajouter des headers personnalisés
 * 2. Gérer l'authentification (Bearer token)
 * 3. Comprendre les headers communs
 * 4. Créer une fonction wrapper réutilisable
 */

// Mock de fetch pour la démonstration 
const myFetch = async (url, options) => {
    console.log(`\n[Simulation Fetch] Requête envoyée vers : ${url}`);
    console.log(`[Simulation Fetch] Méthode : ${options.method || 'GET'}`);
    console.log(`[Simulation Fetch] Headers :`, options.headers);
    if (options.body) {
        console.log(`[Simulation Fetch] Body :`, options.body);
    }
    
    // Simulation d'une réponse réussie
    return {
        ok: true,
        status: 200,
        json: async () => ({ success: true, message: "Données récupérées avec succès" })
    };
};

//  Fonction wrapper gère l'injection du token et des headers communs.

async function apiWrapper(url, token, options = {}) {  
    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Accept-Language': 'fr-FR'
    };

    const authHeaders = {
        'Authorization': `Bearer ${token}`
    };

    const customHeaders = {
        'X-Client-Version': '1.0.0',
        'X-Requested-With': 'MyAppWrapper'
    };

    // Fusion de tous les headers
 
    const finalHeaders = {
        ...defaultHeaders,
        ...authHeaders,
        ...customHeaders,
        ...options.headers // ajouter/surcharger des headers spécifiques
    };

    // Configuration finale pour fetch
    const fetchOptions = {
        ...options,
        headers: finalHeaders
    };

    try {
        // Exécution de la requête (ici on utilise myFetch pour simuler)
        // Dans un vrai code, remplacez myFetch par fetch
        const response = await myFetch(url, fetchOptions);

        if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur lors de l'appel API :", error);
        throw error;
    }
}

// --- Exemple d'utilisation ---

async function main() {
    const myToken = "eyJhGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.exemple.signature";
    const apiUrl = "https://api.mon-serveur.com/utilisateurs";

    console.log("=== Test 1 : Récupération de données (GET) ===");
    await apiWrapper(apiUrl, myToken);

    console.log("\n=== Test 2 : Envoi de données (POST) ===");
    const newUserData = { name: "Alice", role: "admin" };
    
    await apiWrapper(apiUrl, myToken, {
        method: 'POST',
        body: JSON.stringify(newUserData),
        // On peut aussi ajouter un header spécifique pour cet appel
        headers: {
            'X-Correlation-ID': 'abc-123-xyz'
        }
    });
}

main();




 


