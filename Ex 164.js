/**
 * Exercice 164: Loading states (États de chargement)
 * Objectifs:
 * 1. Gérer les états de chargement (IDLE, LOADING, SUCCESS, ERROR)
 * 2. Simuler une interface utilisateur via la console
 */

// Enumération des états possibles
const STATUS = {
    IDLE: 'Inactif',        // Rien ne se passe
    LOADING: 'Chargement',  // Requête en cours
    SUCCESS: 'Succès',      // Données reçues
    ERROR: 'Erreur'         // Problème survenu
};

// Simulation d'un composant ou d'une vue
let appState = {
    status: STATUS.IDLE,
    data: null,
    error: null
};

// Fonction pour mettre à jour l'état et afficher le rendu (simulation console)
function setStatus(newStatus, payload = null) {
    appState.status = newStatus;
    
    if (newStatus === STATUS.SUCCESS) {
        appState.data = payload;
        appState.error = null;
    } else if (newStatus === STATUS.ERROR) {
        appState.error = payload;
        appState.data = null;
    }

    render();
}

function render() {
    console.log(`\n[État actuel: ${appState.status}]`);
    
    switch (appState.status) {
        case STATUS.IDLE:
            console.log("⚪ En attente d'action utilisateur...");
            break;
        case STATUS.LOADING:
            console.log("⏳ Veuillez patienter, chargement en cours...");
            break;
        case STATUS.SUCCESS:
            console.log("✅ Données affichées :", appState.data);
            break;
        case STATUS.ERROR:
            console.log("❌ Une erreur est survenue :", appState.error);
            console.log("🔄 Bouton 'Réessayer' affiché.");
            break;
    }
}

// Fonction métier
async function chargerDonnees(simulerErreur = false) {
    // 1. Début du chargement
    setStatus(STATUS.LOADING);

    try {
        // Simulation délai réseau
        await new Promise(resolve => setTimeout(resolve, 1500));

        if (simulerErreur) {
            throw new Error("Serveur indisponible (503)");
        }

        const fakeData = ["Item A", "Item B", "Item C"];
        
        // 2. Succès
        setStatus(STATUS.SUCCESS, fakeData);

    } catch (err) {
        // 3. Erreur
        setStatus(STATUS.ERROR, err.message);
    }
}

// Scénario de test
async function main() {
    render(); // État initial

    console.log("\n--- Action 1: Chargement réussi ---");
    await chargerDonnees(false);

    console.log("\n--- Action 2: Chargement échoué ---");
    await chargerDonnees(true);
}

main();
