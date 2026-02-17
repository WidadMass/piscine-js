// "exercise_081": {
//     "exerciseNumber": "081",
//     "title": "Destructuring de tableaux",
//     "paragraphs": [
//       "Utilisez la déstructuration pour extraire des valeurs d'un tableau de manière élégante.",
//       "Utiliser la syntaxe de destructuration pour extraire les valeurs en une seule ligne."
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
//       "let couleurs = [\"rouge\", \"vert\", \"bleu\"];\nlet premiere = couleurs[0];\nlet deuxieme = couleurs[1];\nlet troisieme = couleurs[2];",
//       "console.log(premiere);   // \"rouge\"\nconsole.log(deuxieme);   // \"vert\"\nconsole.log(troisieme);  // \"bleu\""
//     ],
//     "progress": "Exercice 30 / 61"
//   },


const couleurs = ["rouge", "vert", "bleu"];


const [premiere, deuxieme, troisieme] = couleurs;

console.log(premiere);   // "rouge"
console.log(deuxieme);   // "vert"
console.log(troisieme);  // "bleu"

// const afficherCouleurs = (couleurs) => {
//     const [premiere, deuxieme, troisieme] = couleurs;
//     console.log(premiere);   // "rouge"
//     console.log(deuxieme);   // "vert"
//     console.log(troisieme);  // "bleu"
// }

// afficherCouleurs(couleurs);
