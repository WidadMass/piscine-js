// "exercise_082": {
//     "exerciseNumber": "082",
//     "title": "Destructuring d'objets",
//     "paragraphs": [
//       "Utilisez la déstructuration pour extraire des propriétés d'un objet.",
//       "Utiliser la syntaxe de destructuration pour extraire les propriétés en une seule ligne."
//     ],
//     "listItems": [],
//     "headings": [
//       {
//         "level": "h2",
//         "text": "Méthode classique (à éviter) :"
//       },
//       {
//         "level": "h2",
//         "text": "Objectif :"
//       },
//       {
//         "level": "h3",
//         "text": "Résultat attendu :"
//       }
//     ],
//     "codeExamples": [
//       "let personne = {\n    nom: \"Dupont\",\n    prenom: \"Marie\",\n    age: 28,\n    ville: \"Paris\"\n};\n\nlet nom = personne.nom;\nlet prenom = personne.prenom;\nlet age = personne.age;\nlet ville = personne.ville;",
//       "console.log(nom);     // \"Dupont\"\nconsole.log(prenom);  // \"Marie\"\nconsole.log(age);     // 28\nconsole.log(ville);   // \"Paris\""
//     ],
//     "progress": "Exercice 31 / 61"
//   },

const personne = {
    nom: "Dupont",
    prenom: "Marie",
    age: 28,
    ville: "Paris"
};

const {nom, prenom, age, ville} = personne;

console.log(nom);     // "Dupont"
console.log(prenom);  // "Marie"
console.log(age);     // 28
console.log(ville);   // "Paris"