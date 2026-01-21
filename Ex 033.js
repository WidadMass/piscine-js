// "exercise_033": {
//     "exerciseNumber": "033",
//     "title": "Factorielle",
//     "paragraphs": [
//       "Créez une fonction factorial qui calcule la factorielle d'un nombre.",
//       "n! = n × (n-1) × (n-2) × ... × 2 × 1",
//       "Par convention : 0! = 1 et 1! = 1"
//     ],
//     "listItems": [
//       "factorial(5) = 5 × 4 × 3 × 2 × 1 = 120",
//       "factorial(0) = 1",
//       "factorial(1) = 1",
//       "factorial(7) = 7 × 6 × 5 × 4 × 3 × 2 × 1 = 5040"
//     ],
//     "headings": [
//       {
//         "level": "h2",
//         "text": "Définition mathématique"
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
//       "factorial(5)   // 120
//       factorial(0)   // 1
//       factorial(7)   // 5040"
//

function factorial(nombre) {
    if (nombre === 0) return 1;
    let result = 1;
    for (let i = 1; i <= nombre; i++) {
        result *= i;
    }
    return result;
}

console.log(`La factorielle de 5 est : ${factorial(5)}`);
console.log(`La factorielle de 0 est : ${factorial(0)}`);
console.log(`La factorielle de 7 est : ${factorial(7)}`);