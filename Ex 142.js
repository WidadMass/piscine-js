/**
 * Exercice 142: Promesse avec délai
 * Objectifs:
 * - Créer une Promesse avec new Promise()
 * - Utiliser resolve() pour indiquer le succès
 * - Utiliser reject() pour indiquer une erreur
 * - Consommer la Promesse avec .then() et .catch()
 */


function attendreDelai(ms) {
    return new Promise((resolve, reject) => {
        // Validation basique pour démontrer l'utilisation de reject()
        if (typeof ms !== 'number' || ms < 0) {
            reject("Erreur : Le délai doit être un nombre positif.");
            return;
        }

        console.log(` Début de l'attente de ${ms}ms...`);
        
        setTimeout(() => {
            resolve(` Succès : Attente de ${ms}ms terminée !`);
        }, ms);
    });
}

// Consommation de la Promesse
console.log("--- Test 1 : Cas de succès (2000ms) ---");
attendreDelai(2000)
    .then((message) => {
        console.log(message);
    })
    .catch((erreur) => {
        console.error("", erreur);
    });

// Démonstration du cas d'erreur (reject)
setTimeout(() => {
    console.log("\n--- Test 2 : Cas d'erreur (délai négatif) ---");
    attendreDelai(-500)
        .then((message) => {
            console.log(message);
        })
        .catch((erreur) => {
            console.error(" Erreur attrapée :", erreur);
        });
}, 2500)
