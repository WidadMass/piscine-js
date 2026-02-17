// "exercise_021": {
//     "exerciseNumber": "021",
//     "title": "Pair ou impair",
//     "paragraphs": [
//       "Créez une fonction evenOrOdd qui détermine si un nombre est pair ou impair.",
//       "La fonction doit retourner :",
//       "Rappel : Un nombre est pair si le reste de sa division par 2 est égal à 0."
//     ],
//     "listItems": [
//       "La chaîne \"pair\" si le nombre est pair",
//       "La chaîne \"impair\" si le nombre est impair"
//     ],
//     "headings": [
//       {
//         "level": "h2",
//         "text": "Retour attendu"
//       },
//       {
//         "level": "h3",
//         "text": "Exemples de tests :"
//       }
//     ],
//     "codeExamples": [
//       "evenOrOdd(4)   // \"pair\"\nevenOrOdd(7)   // \"impair\"\nevenOrOdd(0)   // \"pair\"\nevenOrOdd(-2)  // \"pair\""
//     ],
//     "progress": "Exercice 5 / 61"
//   },

function evenOrOdd(number) {
    if (number % 2 === 0) {
        console.log(`${number} est pair`);
    } else {
        console.log(`${number} est impair`);
    }
}

evenOrOdd(4);  // "pair"
evenOrOdd(7);  // "impair"
evenOrOdd(0);  // "pair"
evenOrOdd(-2); // "pair"
