// Créer et ajouter des éléments au DOM
// Apprenez à créer dynamiquement des éléments HTML et à les ajouter à la page.

// HTML de départ :
// <!DOCTYPE html>
// <html lang="fr">
// <head>
//     <meta charset="UTF-8">
//     <title>DOM - Création</title>
//     <style>
//         .produit {
//             border: 1px solid #ccc;
//             padding: 15px;
//             margin: 10px 0;
//             border-radius: 5px;
//         }
//         .prix { color: green; font-weight: bold; }
//     </style>
// </head>
// <body>
//     <h1 id="titre">Ma boutique</h1>
//     <div id="produits"></div>

//     <script src="093_A.js"></script>
// </body>
// </html>

// Objectifs :
// ✅ Créer un nouvel élément <p>
// ✅ Créer une liste <ul> avec plusieurs <li>
// ✅ Créer une carte produit complète
// ✅ Insérer les éléments à différentes positions
// ✅ Supprimer un élément
// Méthodes à utiliser :
// document.createElement()
// appendChild()
// insertAdjacentElement()
// remove() / removeChild()

const produitsDiv = document.getElementById("produits");

const paragraphe = document.createElement("p");
paragraphe.textContent = "Bienvenue dans notre boutique en ligne !";

produitsDiv.insertAdjacentElement("afterbegin", paragraphe);

const liste = document.createElement("ul");

const items = ["Livraison rapide", "Paiement sécurisé", "Support client"];

items.forEach(texte => {
  const li = document.createElement("li");
  li.textContent = texte;
  liste.appendChild(li);
});

produitsDiv.appendChild(liste);

const carteProduit = document.createElement("div");
carteProduit.classList.add("produit");

const nomProduit = document.createElement("h2");
nomProduit.textContent = "Casque Audio";

const prixProduit = document.createElement("p");
prixProduit.textContent = "99 €";
prixProduit.classList.add("prix");

const description = document.createElement("p");
description.textContent = "Casque sans fil avec réduction de bruit.";

const bouton = document.createElement("button");
bouton.textContent = "Ajouter au panier";

carteProduit.appendChild(nomProduit);
carteProduit.appendChild(prixProduit);
carteProduit.appendChild(description);
carteProduit.appendChild(bouton);

produitsDiv.appendChild(carteProduit);

const info = document.createElement("p");
info.textContent = "Offre spéciale";

carteProduit.insertAdjacentElement("beforebegin", info);

setTimeout(() => {
  info.remove();
}, 5000);
