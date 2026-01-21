/**
 * Exercice 172: PUT/PATCH - Modifier une ressource
 * Objectifs:
 * 1. Comprendre la différence entre PUT (remplacement) et PATCH (modification partielle)
 * 2. Modifier une donnée existante via API
 */

const BASE_URL = 'https://jsonplaceholder.typicode.com/posts/1';

// PUT : Remplace TOUT la ressource. Si on oublie un champ, il sera supprimé.
async function modifierCompletementWithPUT() {
    console.log("\n--- Test PUT (Remplacement complet) ---");
    
    // On veut juste changer le titre, mais avec PUT on doit renvoyer tout l'objet sinon le reste disparait
    const newData = {
        id: 1,
        title: 'TITRE MODIFIÉ (PUT)',
        body: 'Nouveau contenu complet',
        userId: 1
    };

    const response = await fetch(BASE_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(newData)
    });

    const data = await response.json();
    console.log("✅ Résultat PUT :", data);
}

// PATCH : Modifie SEULEMENT les champs envoyés.
async function modifierPartiellementWithPATCH() {
    console.log("\n--- Test PATCH (Modification partielle) ---");

    // On veut juste changer le titre. Pas besoin d'envoyer body ou userId.
    const partialData = {
        title: 'TITRE MODIFIÉ (PATCH)'
    };

    const response = await fetch(BASE_URL, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(partialData)
    });

    const data = await response.json();
    console.log("✅ Résultat PATCH :", data);
    // Notez que le body et userId sont préservés dans la réponse simulée par JSONPlaceholder
}

async function main() {
    await modifierCompletementWithPUT();
    await modifierPartiellementWithPATCH();
}

main();
