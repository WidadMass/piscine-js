// "exercise_074": {
//     "exerciseNumber": "074",
//     "title": "Arrow functions avec méthodes de tableau",
//     "paragraphs": [
//       "Convertissez ces utilisations de fonctions classiques en arrow functions avec les méthodes de tableau."
//     ],
//     "listItems": [
//       "✅ Remplacer les fonctions anonymes par des arrow functions",
//       "✅ Utiliser la syntaxe courte quand possible",
//       "✅ Comprendre le chaînage de méthodes"
//     ],
//     "headings": [
//       {
//         "level": "h2",
//         "text": "Code à convertir :"
//       },
//       {
//         "level": "h2",
//         "text": "Objectifs :"
//       },
//       {
//         "level": "h3",
//         "text": "Résultats attendus :"
//       }
//     ],
//     "codeExamples": [
//       "let nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n// Avec des fonctions classiques\nlet pairs = nombres.filter(function(n) {\n    return n % 2 === 0;\n});\n\nlet doubles = nombres.map(function(n) {\n    return n * 2;\n});",
//       "pairs   // [2, 4, 6, 8, 10]\ndoubles // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]"
//     ],
//     "progress": "Exercice 29 / 61"
//   },


const nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const pairs = nombres.filter(n => n % 2 === 0);
const doubles = nombres.map(n => n * 2);

console.log(pairs);   
console.log(doubles); 
