/**
 * Exercice 162: Récupérer un seul élément
 * Objectifs:
 * 1. Utiliser des URLs dynamiques avec template literals
 * 2. Récupérer une ressource spécifique par son ID
 * 3. Gérer le cas où la ressource n'existe pas (404)
 */

async function recupererUtilisateur(id) {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;
    console.log(`\n🔍 Recherche de l'utilisateur ID: ${id}...`);

    try {
        const response = await fetch(url);

        if (!response.ok) {
            // Si l'utilisateur n'existe pas, l'API renvoie 404
            if (response.status === 404) {
                throw new Error("Utilisateur introuvable (404)");
            }
            throw new Error(`Erreur serveur (${response.status})`);
        }

        const user = await response.json();
        console.log(`✅ Trouvé : ${user.name} (${user.email})`);
        return user;

    } catch (error) {
        console.error("❌ Erreur :", error.message);
    }
}

async function main() {
    // Cas valide
    await recupererUtilisateur(1);

    // Cas invalide (ID inexistant)
    await recupererUtilisateur(999);
}

main();
