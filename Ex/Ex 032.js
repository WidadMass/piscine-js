// "exercise_032": {
//     "exerciseNumber": "032",
//     "title": "Somme de 1 à N",
//     "paragraphs": [
//       "Créez une fonction sumUpTo qui calcule la somme de tous les nombres entiers de 1 à n.",
//       "somme(n) = 1 + 2 + 3 + ... + n"
//     ],
//     "listItems": [
//       "sumUpTo(5) = 1 + 2 + 3 + 4 + 5 = 15",
//       "sumUpTo(10) = 1 + 2 + 3 + ... + 10 = 55",
//       "sumUpTo(100) = 1 + 2 + 3 + ... + 100 = 5050"
//     ],
//     "headings": [
//       {
//         "level": "h2",
//         "text": "Formule"
//       },
//       {
//         "level": "h3",
//         "text": "Exemples :"
//       },
//       {
//         "level": "h3",
//         "text": "Exemples de tests :"
//       }
//     ],
//     "codeExamples": [
//       "sumUpTo(5)    // 15\nsumUpTo(10)   // 55\nsumUpTo(100)  // 5050"
//     ],
//     "progress": "Exercice 10 / 61"
//   },

function sumUpTo(n) {
  return (n * (n + 1)) / 2;
}

console.log(`La somme de tout les nombres de 1 à 5 est : ${sumUpTo(5)}`);    // 15
console.log(`La somme de tout les nombres de 1 à 10 est : ${sumUpTo(10)}`);   // 55
console.log(`La somme de tout les nombres de 1 à 100 est : ${sumUpTo(100)}`);  // 5050
