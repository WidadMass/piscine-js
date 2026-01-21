  // "exercise_055": {
  //     "Calculez la somme de tous les nombres contenus dans un tableau.",
  //     "Résultat attendu : 75 (5 + 10 + 15 + 20 + 25)"
const numbers = [5, 10, 15, 20, 25];
let sum = 0;
for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}
console.log("La somme des nombres est : " + sum);

