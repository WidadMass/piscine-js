//   "exercise_144":
//       "Exécutez plusieurs promesses en parallèle et attendez qu'elles soient toutes terminées."
//    
//       "✅ Comprendre Promise.all() pour exécuter des Promesses en parallèle",
//       "✅ Récupérer tous les résultats une fois terminés",
//       "✅ Gérer le cas où une Promesse échoue",
//       "✅ Découvrir Promise.race() et Promise.allSettled()",
//       "Exécuter 3 Promesses en parallèle",
//       "Attendre que toutes soient terminées",
//       "Récupérer les résultats dans un tableau",
//       "Si une échoue, tout échoue"

function promesseA(delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Résultat A après ${delay}ms`);
        }, delay);
    });
}
function promesseB(delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Résultat B après ${delay}ms`);
        }, delay);
    });

}
function promesseC(delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Résultat C après ${delay}ms`);
        }



            , delay);
    });
}
Promise.all([promesseA(1000), promesseB(2000), promesseC(1500)])
    .then((resultats) => {
        console.log("Toutes les promesses sont terminées :", resultats);
    })  