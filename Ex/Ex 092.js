// Modifier le contenu du DOM
// Apprenez à modifier le texte, le HTML, les attributs et les styles des éléments.

// HTML de départ :
// <!DOCTYPE html>
// <html lang="fr">
// <head>
//     <meta charset="UTF-8">
//     <title>DOM - Modification</title>
//     <style>
//         .highlight { background-color: yellow; }
//         .large { font-size: 24px; }
//     </style>
// </head>
// <body>
//     <h1 id="titre">Titre original</h1>
//     <p id="description" class="normal">Description originale</p>
//     <button id="monBouton" class="btn">Bouton</button>
//     <div id="contenu"></div>

//     <script src="092_A.js"></script>
// </body>
// </html>

// Objectifs :
// ✅ Modifier le texte du titre
// ✅ Modifier le HTML du div #contenu
// ✅ Ajouter/enlever des classes CSS
// ✅ Modifier les styles inline
// ✅ Modifier les attributs
// Méthodes à utiliser :
// textContent / innerHTML
// classList.add() / classList.remove() / classList.toggle()
// style.property
// setAttribute() / getAttribute() / removeAttribute()

const titre = document.getElementById("titre");
titre.textContent = "Titre modifié avec JavaScript";

const contenu = document.getElementById("contenu");
contenu.innerHTML = "<p><strong>Contenu ajouté dynamiquement</strong></p>";

const description = document.getElementById("description");
description.classList.add("highlight");
description.classList.remove("normal");
description.classList.toggle("large");

titre.style.color = "blue";
titre.style.textTransform = "uppercase";
titre.style.marginBottom = "20px";

const bouton = document.getElementById("monBouton");
bouton.setAttribute("disabled", "true");
bouton.setAttribute("title", "Bouton désactivé");

console.log(bouton.getAttribute("title"));

setTimeout(() => {
  bouton.removeAttribute("disabled");
}, 3000);
