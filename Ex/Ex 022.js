// "exercise_022": {
//     "exerciseNumber": "022",
//     "title": "Maximum de 3 nombres",
//     "paragraphs": [
//       "Créez une fonction max3 qui trouve le plus grand parmi trois nombres.",
//       "Vous devez utiliser l'opérateur logique ET (&&) pour vérifier qu'un nombre est plus grand que les deux autres.",
//       "Astuce : Pensez au cas où deux ou trois nombres sont égaux !"
//     ],
//     "listItems": [],
//     "headings": [
//       {
//         "level": "h2",
//         "text": "Contrainte"
//       },
//       {
//         "level": "h3",
//         "text": "Exemples de tests :"
//       }
//     ],
//     "codeExamples": [
//       "max3(1, 2, 3)      // 3\nmax3(10, 5, 8)     // 10\nmax3(-1, -5, -3)   // -1\nmax3(7, 7, 7)      // 7"
//     ],
//     "progress": "Exercice 6 / 61"
//   },

function max3(a, b, c) {
    if (a >= b && a >= c) {
        console.log(`le maximum entre ${a}, ${b} et ${c} est ${a}`);
    } else if (b >= a && b >= c) {
        console.log(`le maximum entre ${a}, ${b} et ${c} est ${b}`);
    } else {
        console.log(`le maximum entre ${a}, ${b} et ${c} est ${c}`);
    }
}

max3(1, 2, 3);      // 3
max3(10, 5, 8);     // 10
max3(-1, -5, -3);   // -1
max3(7, 7, 7);      // 7
