// Événement click simple
// Créez un compteur qui s'incrémente à chaque clic sur un bouton.

// HTML fourni :
// <!DOCTYPE html>
// <html lang="fr">
// <head>
//     <meta charset="UTF-8">
//     <title>Compteur</title>
//     <style>
//         #compteur {
//             font-size: 48px;
//             font-weight: bold;
//             text-align: center;
//             margin: 20px;
//         }
//         button {
//             padding: 10px 20px;
//             font-size: 18px;
//             margin: 5px;
//         }
//     </style>
// </head>
// <body>
//     <div id="compteur">0</div>
//     <button id="incrementer">+1</button>
//     <button id="decrementer">-1</button>
//     <button id="reset">Reset</button>

//     <script src="111_A.js"></script>
// </body>
// </html>

// Objectifs :
// ✅ Le bouton +1 incrémente le compteur
// ✅ Le bouton -1 décrémente le compteur
// ✅ Le bouton Reset remet le compteur à 0
// ✅ Afficher le compteur à l'écran
// Méthodes à utiliser :
// addEventListener('click', callback)
// Modifier textContent pour afficher le compteur

const compteurDiv = document.getElementById("compteur");
const boutonIncrementer = document.getElementById("incrementer");
const boutonDecrementer = document.getElementById("decrementer");
const boutonReset = document.getElementById("reset");

let compteur = 0;

const afficherCompteur = () => {
  compteurDiv.textContent = compteur;
};

boutonIncrementer.addEventListener("click", () => {
  compteur++;
  afficherCompteur();
});

boutonDecrementer.addEventListener("click", () => {
  compteur--;
  afficherCompteur();
});

boutonReset.addEventListener("click", () => {
  compteur = 0;
  afficherCompteur();
});
