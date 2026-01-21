//   "exercise_143"
//       "Créez une séquence d'opérations asynchrones enchaînées."

//       "✅ Comprendre le chaînage de Promesses avec .then()",
//       "✅ Passer des valeurs d'une étape à l'autre",
//       "✅ Gérer les erreurs dans une chaîne",
//       "✅ Utiliser .finally() pour le nettoyage",
//       "Créer 3 fonctions qui retournent des Promesses",
//       "Chaque étape utilise le résultat de la précédente",
//       "Une seule erreur dans la chaîne est capturée par .catch()"

function etape1() {
    return new Promise((resolve) => {
        console.log("Étape 1 : Démarrage de l'opération...");
        setTimeout(() => {
            resolve("Résultat de l'étape 1");
        }, 1000);
    });
}
function etape2(input) {
    return new Promise((resolve) => {
        console.log("Étape 2 : Reçu ->", input);
        setTimeout(() => {
            resolve(input + " | Résultat de l'étape 2");
        }, 1000);
    });
}
function etape3(input) {
    return new Promise((_resolve, reject) => {
        console.log("Étape 3 : Reçu ->", input);
        setTimeout(() => {
            // Simuler une erreur pour démonstration
            reject("Erreur dans l'étape 3 !");
        }, 1000);
    });
}
// Chaînage des étapes avec gestion des erreurs
etape1()
    .then((resultat1) => etape2(resultat1))
    .then((resultat2) => etape3(resultat2))
    .then((resultat3) => {
        console.log("Chaîne terminée avec succès :", resultat3);
    })
    .catch((erreur) => {
        console.error("Erreur attrapée dans la chaîne :", erreur);
    })
    .finally(() => {
        console.log("Nettoyage finalisé, chaîne terminée.");
    });
