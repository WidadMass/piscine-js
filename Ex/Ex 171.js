/**
 * Exercice 171: POST - Créer une ressource
 * Objectifs:
 * 1. Envoyer des données au serveur avec method: 'POST'
 * 2. Définir les headers correctement (Content-Type)
 * 3. Convertir le body en string JSON
 */

const URL = 'https://jsonplaceholder.typicode.com/posts';

async function creerArticle(titre, contenu, userId) {
    console.log(`\n📝 Création de l'article "${titre}"...`);

    const nouveauPost = {
        title: titre,
        body: contenu,
        userId: userId
    };

    try {
        const response = await fetch(URL, {
            method: 'POST', // Méthode HTTP pour créer
            headers: {
                // Indispensable pour dire au serveur qu'on envoie du JSON
                'Content-Type': 'application/json; charset=UTF-8', 
            },
            // Conversion de l'objet JS en chaîne JSON
            body: JSON.stringify(nouveauPost) 
        });

        if (!response.ok) throw new Error("Erreur création");

        const data = await response.json();
        
        // Note: JSONPlaceholder simule la création et renvoie l'objet avec un ID 101
        console.log("✅ Article créé avec succès !");
        console.log("Variabler reçue du serveur :", data);

    } catch (error) {
        console.error("❌ Erreur :", error);
    }
}

// Test
creerArticle("Mon Super Article", "Ceci est le contenu de mon article.", 1);
