//  "exercise_064": 
//       "Créez une fonction calculateAverage qui calcule la moyenne des nombres d'un tableau.",
//       "Moyenne = Somme des éléments / Nombre d'éléments"
//       "calculateAverage([10, 20, 30]) → 20",
//       "calculateAverage([12, 15, 18, 14, 16]) → 15",
//       "calculateAverage([5, 5, 5, 5]) → 5"
function calculateAverage(numbers)
{
  const sum = numbers.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  }, 0);  
  return sum / numbers.length;

}
console.log(calculateAverage([10, 20, 30]));
console.log(calculateAverage([12, 15, 18, 14, 16]));
console.log(calculateAverage([5, 5, 5, 5]));

