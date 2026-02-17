/**
 * Exercice 173: DELETE - Supprimer une ressource
 * Objectifs:
 * 1. Supprimer une ressource du serveur avec method: 'DELETE'
 * 2. Vérifier le succès de l'opération
 */

async function supprimerPost(id) {
    const url = `https://jsonplaceholder.typicode.com/posts/${id}`;
    console.log(`\n🗑️ Tentative de suppression du post ID: ${id}...`);

    try {
        const response = await fetch(url, {
            method: 'DELETE'
        });

        // La plupart des APIs renvoient 200 (OK) ou 204 (No Content) lors d'un succès
        if (response.ok) {
            console.log(`✅ Succès ! Le post ${id} a été supprimé.`);
            console.log(`Statut HTTP: ${response.status}`);
        } else {
            console.error("❌ Échec de la suppression.");
        }

    } catch (error) {
        console.error("Erreur réseau :", error);
    }
}

// Test
supprimerPost(1);
