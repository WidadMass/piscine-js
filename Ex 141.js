//   "exercise_141":
//       "Observez la différence entre code synchrone et asynchrone."

//       "✅ Comprendre la différence entre synchrone et asynchrone",
//       "✅ Utiliser setTimeout() pour simuler du code asynchrone",
//       "✅ Observer l'ordre d'exécution du code",
//       "✅ Comprendre l'Event Loop de JavaScript",
//       "Le code synchrone s'exécute ligne par ligne, dans l'ordre",
//       "Le code asynchrone ne bloque pas l'exécution",
//       "setTimeout planifie une exécution future, le code continue immédiatement"

console.log("Début du code synchrone");

setTimeout(function() {
    console.log("Code asynchrone exécuté après 2 secondes");
}, 2000);
console.log("Fin du code synchrone");
