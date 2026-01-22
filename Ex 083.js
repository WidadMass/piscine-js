// "exercise_083": {
//     "exerciseNumber": "083",
//     "title": "Spread operator avec tableaux",
//     "paragraphs": [
//       "Utilisez l'opérateur spread ... pour manipuler des tableaux de manière élégante."
//     ],
//     "listItems": [
//       "✅ Copier un tableau sans référence",
//       "✅ Fusionner plusieurs tableaux",
//       "✅ Ajouter des éléments facilement",
//       "✅ Passer des arguments à une fonction"
//     ],
//     "headings": [
//       {
//         "level": "h2",
//         "text": "Objectifs :"
//       },
//       {
//         "level": "h3",
//         "text": "Exemples à réaliser :"
//       }
//     ],
//     "codeExamples": [
//       "// 1. Copier un tableau\nlet original = [1, 2, 3];\n// Créer une copie indépendante\n\n// 2. Fusionner des tableaux\nlet tableau1 = [1, 2, 3];\nlet tableau2 = [4, 5, 6];\n// Créer un tableau contenant tous les éléments\n\n// 3. Trouver le maximum\nlet nombres = [5, 10, 15, 3, 8];\n// Utiliser Math.max() avec spread"
//     ],
//     "progress": "Exercice 32 / 61"
//   },
  
const original = [1, 2, 3];
const copie = [...original];

copie.push(4);

console.log(original);
console.log(copie);

const tableau1 = [1, 2, 3];
const tableau2 = [4, 5, 6];

const fusion = [...tableau1, ...tableau2];

console.log(fusion);

const tableau = [2, 3, 4];

const nouveauTableau = [1, ...tableau, 5];

console.log(nouveauTableau);


const nombres = [5, 10, 15, 3, 8];

const max = Math.max(...nombres);

console.log(max);
