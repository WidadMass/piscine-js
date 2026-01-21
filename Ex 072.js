//  "exercise_072": {
//     "exerciseNumber": "072",
//     "title": "Template literals (ES6)",
//     "paragraphs": [
//       "Réécrivez ces concaténations de chaînes en utilisant les template literals (backticks `).",
//       "Objectif : Utiliser la syntaxe moderne ${variable} avec des backticks."
//     ],
//     "listItems": [],
//     "headings": [
//       {
//         "level": "h2",
//         "text": "Code à convertir :"
//       },
//       {
//         "level": "h3",
//         "text": "Résultat attendu :"
//       }
//     ],
//     "codeExamples": [
//       "let nom = \"Marie\";\nlet age = 25;\nlet ville = \"Paris\";\n\nlet phrase = \"Je m'appelle \" + nom + \", j'ai \" + age + \" ans et j'habite à \" + ville + \".\";\nconsole.log(phrase);",
//       "Je m'appelle Marie, j'ai 25 ans et j'habite à Paris."
//     ],
//     "progress": "Exercice 27 / 61"
//   },


let nom = "Marie";
let age = 25;
let ville = "Paris";

let phrase = `Je m'appelle ${nom}, j'ai ${age} ans et j'habite à ${ville}.`;
console.log(phrase);