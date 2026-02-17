/**
 * Exercice 154: Top-level await
 * Objectif: Utiliser await au niveau racine d'un module (ES modules).
 * 
 * NOTE IMPORTANTE:
 * Le "Top-level await" (await sans fonction async autour) ne fonctionne nativement
 * que dans les modules ES (fichiers .mjs ou package.json avec "type": "module").
 * 
 * Pour cet exercice dans un environnement Node.js standard (.js),
 * nous simulons ce comportement avec une IIFE (Immediately Invoked Function Expression) async.
 */

// Simulation d'une ressource distante
const fetchConfig = () => new Promise(resolve => setTimeout(() => resolve({ theme: 'dark', lang: 'fr' }), 500));

// --- CODE SIMULANT UN MODULE ---
(async () => {
    console.log("--- Début du module ---");

    try {
        // En mode "Module", on pourrait écrire directement :
        // const config = await fetchConfig();
        
        console.log("Chargement de la configuration...");
        const config = await fetchConfig(); // await au "top level" de notre scope
        
        console.log("Configuration chargée :", config);
        
        // On peut utiliser la config immédiatement après
        if (config.theme === 'dark') {
            console.log("Mode sombre activé");
        }

    } catch (err) {
        console.error("Erreur de chargement:", err);
    }
    
    console.log("--- Fin du module ---");
})();

/* 
// EXEMPLE DE VRAI TOP-LEVEL AWAIT (dans un fichier .mjs) :
const response = await fetch('https://api.example.com/data');
const data = await response.json();
export default data;
*/
