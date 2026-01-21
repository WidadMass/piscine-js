/**
 * Exercice 153: Async/await avec Promise.all()
 * Objectifs:
 * 1. Exécuter des requêtes en parallèle plutôt qu'en séquence
 * 2. Comprendre le gain de performance
 */

// Simulation de requêtes réseau avec des délais
const fakeFetch = (id, delay) => new Promise(resolve => setTimeout(() => resolve(`Donnée ${id}`), delay));

async function executionSequentielle() {
    console.time("Séquentiel");
    console.log("--- Début Séquentiel (Lent) ---");
    
    // Chaque 'await' bloque l'exécution, donc les délais s'additionnent
    const data1 = await fakeFetch(1, 1000);
    console.log("Reçu:", data1);
    
    const data2 = await fakeFetch(2, 1000);
    console.log("Reçu:", data2);
    
    const data3 = await fakeFetch(3, 1000);
    console.log("Reçu:", data3);
    
    console.timeEnd("Séquentiel"); // Devrait afficher environ 3000ms
}

async function executionParallele() {
    console.time("Parallèle");
    console.log("\n--- Début Parallèle (Rapide) ---");
    
    // On lance toutes les promesses en même temps SANS 'await' immédiat
    const p1 = fakeFetch(1, 1000);
    const p2 = fakeFetch(2, 1000);
    const p3 = fakeFetch(3, 1000);

    // Promise.all attend que TOUTES les promesses soient résolues
    // Le temps total sera celui de la plus longue (ici 1000ms), pas la somme
    // Si une seule échoue, tout échoue (sauf si on utilise Promise.allSettled)
    try {
        const resultats = await Promise.all([p1, p2, p3]);
        console.log("Tous reçus:", resultats);
    } catch (err) {
        console.error("Une des requêtes a échoué", err);
    }

    console.timeEnd("Parallèle"); // Devrait afficher environ 1000ms
}

// Lancement
async function main() {
    await executionSequentielle();
    await executionParallele();
}

main();
