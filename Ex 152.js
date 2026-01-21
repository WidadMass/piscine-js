/**
 * Exercice 152: Gestion d'erreurs avec try/catch
 * Objectifs:
 * 1. Utiliser try/catch pour gérer les erreurs dans une fonction async
 * 2. Utiliser finally pour le nettoyage
 * 3. Lancer des erreurs manuelles avec throw
 */

// Simulation d'une API instable
function operationRisquee(doitEchouer) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (doitEchouer) {
                reject(new Error("Échec critique du système !"));
            } else {
                resolve("Opération réussie !");
            }
        }, 1000);
    });
}

async function executerOperation(doitEchouer) {
    console.log(`\n--- Tentative (doitEchouer = ${doitEchouer}) ---`);
    console.log("1. Début de l'opération...");

    try {
        // Bloc TRY : On tente d'exécuter le code qui pourrait échouer
        const resultat = await operationRisquee(doitEchouer);
        console.log("2. Succès :", resultat);
        return resultat;

    } catch (erreur) {
        // Bloc CATCH : Exécuté seulement si une erreur survient dans le bloc try
        console.error("2. Erreur capturée :", erreur.message);
        // On pourrait ici renvoyer une valeur par défaut ou relancer l'erreur
        return "Valeur par défaut suite à erreur";

    } finally {
        // Bloc FINALLY : Toujours exécuté, succès ou erreur
        console.log("3. Nettoyage (fermeture de connexion, arrêt loader, etc.)");
    }
}

// Exécution des tests
async function main() {
    // Cas succès
    await executerOperation(false);
    
    // Cas erreur
    await executerOperation(true);
}

main();
