/**
 * Exercice 161: Premier fetch
 * Objectifs:
 * 1. Utiliser fetch() pour récupérer des données
 * 2. Parser la réponse avec .json()
 * 3. Vérifier response.ok
 */

// URL d'une API publique de test (utilisateurs fakés)
const URL = 'https://jsonplaceholder.typicode.com/users';

const recupererDonnees = async () => {
    console.log(`📡 Requête envoyée vers ${URL}...`);

    try {
        // 1. Appel réseau
        const response = await fetch(URL);

        // 2. Vérification du statut HTTP (200-299)
        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status}`);
        }

        console.log("✅ Réponse reçue ! Statut:", response.status);

        // 3. Parsing du JSON (c'est aussi une promesse !)
        const data = await response.json();
        
        console.log(`📊 Nombre d'utilisateurs récupérés : ${data.length}`);
        console.log("🔹 Premier utilisateur :", data[0].name);

        return data;

    } catch (erreur) {
        console.error('❌ Erreur lors du fetch :', erreur.message);
    }
};

recupererDonnees();
