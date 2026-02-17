// Event delegation
// Comprenez la délégation d'événements avec une liste dynamique.

// HTML fourni :
// <!DOCTYPE html>
// <html lang="fr">
// <head>
//     <meta charset="UTF-8">
//     <title>Event Delegation</title>
//     <style>
//         .item {
//             padding: 10px;
//             margin: 5px 0;
//             background: #e0e0e0;
//             cursor: pointer;
//         }
//         .item.selected {
//             background: #4caf50;
//             color: white;
//         }
//     </style>
// </head>
// <body>
//     <button id="ajouter">Ajouter un item</button>
//     <ul id="liste"></ul>

//     <script src="script.js"></script>
// </body>
// </html>

// Objectifs :
// ✅ Ajouter des items dynamiquement avec le bouton
// ✅ Utiliser event delegation (un seul listener sur le parent)
// ✅ Sélectionner un item au clic (changement de style)
// ✅ Désélectionner les autres items lors de la sélection
// Exemple de comportement attendu :
// Clic sur "Ajouter un item" → Un nouvel item apparaît dans la liste


const boutonAjouter = document.getElementById("ajouter");
const liste = document.getElementById("liste");

let compteur = 1;

boutonAjouter.addEventListener("click", () => {
  const li = document.createElement("li");
  li.textContent = `Item ${compteur}`;
  li.classList.add("item");
  liste.appendChild(li);
  compteur++;
});


liste.addEventListener("click", (event) => {
  if (event.target.classList.contains("item")) {
    const items = liste.querySelectorAll(".item");
    items.forEach(item => item.classList.remove("selected"));
    event.target.classList.add("selected");
  }
});
