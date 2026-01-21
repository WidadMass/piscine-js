// Mini TODO List
// Créez une TODO list basique : ajouter et supprimer des tâches dynamiquement.

// HTML fourni :
// <!DOCTYPE html>
// <html lang="fr">
// <head>
//     <meta charset="UTF-8">
//     <title>TODO List</title>
//     <style>
//         body {
//             font-family: Arial, sans-serif;
//             max-width: 600px;
//             margin: 50px auto;
//             padding: 20px;
//         }
//         #nouveauTodo {
//             width: 70%;
//             padding: 10px;
//             font-size: 16px;
//         }
//         #ajouter {
//             padding: 10px 20px;
//             font-size: 16px;
//             background: #007bff;
//             color: white;
//             border: none;
//             cursor: pointer;
//         }
//         .todo-item {
//             padding: 10px;
//             margin: 5px 0;
//             background: #f0f0f0;
//             display: flex;
//             justify-content: space-between;
//             align-items: center;
//             border-radius: 5px;
//         }
//         .delete-btn {
//             background: #dc3545;
//             color: white;
//             border: none;
//             padding: 5px 10px;
//             cursor: pointer;
//             border-radius: 3px;
//         }
//         .delete-btn:hover {
//             background: #c82333;
//         }
//     </style>
// </head>
// <body>
//     <h1>Ma TODO List</h1>
//     <input type="text" id="nouveauTodo" placeholder="Nouvelle tâche...">
//     <button id="ajouter">Ajouter</button>
//     <ul id="listeTodos"></ul>

//     <script src="113_A.js"></script>
// </body>
// </html>

// Objectifs :
// ✅ Ajouter une tâche en cliquant sur le bouton
// ✅ Ajouter une tâche en appuyant sur Enter
// ✅ Supprimer une tâche avec le bouton "Supprimer"
// ✅ Vider le champ après ajout
// ✅ Vérifier que le champ n'est pas vide
// Méthodes à utiliser :
// createElement(), appendChild()


const inputTodo = document.getElementById("nouveauTodo");
const boutonAjouter = document.getElementById("ajouter");
const listeTodos = document.getElementById("listeTodos");

const ajouterTodo = () => {
  const texte = inputTodo.value.trim();

  if (texte === "") {
    return;
  }
  const li = document.createElement("li");
  li.classList.add("todo-item");

  const span = document.createElement("span");
  span.textContent = texte;

  const boutonSupprimer = document.createElement("button");
  boutonSupprimer.textContent = "Supprimer";
  boutonSupprimer.classList.add("delete-btn");

  boutonSupprimer.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(span);
  li.appendChild(boutonSupprimer);


  listeTodos.appendChild(li);

  inputTodo.value = "";
  inputTodo.focus();
};


boutonAjouter.addEventListener("click", ajouterTodo);

inputTodo.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    ajouterTodo();
  }
});
