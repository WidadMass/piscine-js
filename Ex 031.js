// "exercise_031": {
//     "exerciseNumber": "031",
//     "title": "Table de multiplication",
//     "paragraphs": [
//       "Créez une fonction multiplicationTable qui affiche la table de multiplication d'un nombre de 1 à 10.",
//       "Pour chaque ligne, affichez : \"n x i = résultat\""
//     ],
//     "listItems": [],
//     "headings": [
//       {
//         "level": "h2",
//         "text": "Format attendu"
//       },
//       {
//         "level": "h3",
//         "text": "Exemple pour n=7 :"
//       },
//       {
//         "level": "h3",
//         "text": "Exemples de tests :"
//       }
//     ],
//     "codeExamples": 
//       7 x 1 = 7
//       7 x 2 = 14
//       7 x 3 = 21
//       ...
//       7 x 10 = 70",
//       multiplicationTable(5)  // Affiche la table de 5
//       multiplicationTable(9)  // Affiche la table de 9"


function multiplicationTable(nombre) {
    for (let i = 1; i <= 10; i++) {
        console.log(`${nombre} x ${i} = ${nombre * i}`);
    }
    console.log('');
}

multiplicationTable(7);
multiplicationTable(5);
multiplicationTable(9);