//  "exercise_003": {
//     "exerciseNumber": "003",
//     "title": "Calculatrice simple",
//     "paragraphs": [
//       "Créez une fonction calculator qui effectue des opérations mathématiques de base.",
//       "La fonction doit accepter 3 paramètres :",
//       "La fonction doit retourner le résultat du calcul.",
//       "Si l'opérateur est invalide, retournez le message : \"Opérateur invalide\""
//     ],
//     "listItems": [
//       "num1 : premier nombre",
//       "operator : opérateur (+, -, *, /)",
//       "num2 : deuxième nombre"

//      "Exemples de tests :"
//     
//     "codeExamples": 
//       "calculator(10, '+', 5)  // 15\ncalculator(10, '-', 5)  // 5\ncalculator(10, '*', 5)  // 50\ncalculator(10, '/', 5)  // 2\ncalculator(10, '%', 3)  // \"Opérateur invalide\""
//   

function calculator(num1, operator, num2) {
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            return num1 / num2;
        default:
            return "Opérateur invalide";
    }
}

// Tests
console.log(calculator(10, '+', 5));  // 15
console.log(calculator(10, '-', 5));  // 5
console.log(calculator(10, '*', 5));  // 50
console.log(calculator(10, '/', 5));  // 2
console.log(calculator(10, '%', 3));  // "Opérateur invalide"