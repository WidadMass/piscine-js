//  "exercise_084": {
//     "exerciseNumber": "084",
//     "title": "Spread operator avec objets",
//     "paragraphs": [
//       "Utilisez l'opérateur spread ... pour manipuler des objets de manière élégante."
//     ],
//     "listItems": [
//       "✅ Copier un objet sans référence",
//       "✅ Fusionner plusieurs objets",
//       "✅ Modifier une propriété sans mutation",
//       "✅ Ajouter de nouvelles propriétés"
//     ],
//     "headings": [
//       {
//         "level": "h2",
//         "text": "Objectifs :"
//       },
//       {
//         "level": "h3",
//         "text": "Exemples à réaliser :"
//       }
//     ],
//     "codeExamples": [
//       "// 1. Copier un objet\nlet personne = { nom: \"Dupont\", age: 30 };\n// Créer une copie indépendante\n\n// 2. Fusionner des objets\nlet infos = { nom: \"Martin\", age: 25 };\nlet contact = { email: \"martin@email.com\", tel: \"0612345678\" };\n// Créer un objet avec toutes les propriétés\n\n// 3. Modifier une propriété\nlet user = { nom: \"Dupont\", age: 30, ville: \"Paris\" };\n// Créer un nouvel objet avec age = 31"
//     ],
//     "progress": "Exercice 33 / 61"
//   },


// 1. Copier un objet
const personne = { nom: "Dupont", age: 30 };
// Créer une copie indépendante
const copiePersonne = {...personne};

console.log(personne);
console.log(copiePersonne);


// 2. Fusionner des objets
const infos = { nom: "Martin", age: 25 };
const contact = { email: "martin@email.com", tel: "0612345678" };
// Créer un objet avec toutes les propriétés
const fusion = {...infos, ...contact};

console.log(fusion);

// 3. Modifier une propriété
const user = { nom: "Dupont", age: 30, ville: "Paris" };
// Créer un nouvel objet avec age = 31
const nouvelUser = {...user, age: 31};

console.log(nouvelUser);