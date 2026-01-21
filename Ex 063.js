  // "exercise_063": 
  //     "Créez une fonction filterEven qui retourne un nouveau tableau contenant uniquement les nombres pairs.",
  //     "Un nombre est pair si nombre % 2 === 0"
  //   "listItems": [
  //     "filterEven([1, 2, 3, 4, 5, 6]) → [2, 4, 6]",
  //     "filterEven([1, 3, 5, 7]) → []",
  //     "filterEven([10, 15, 20, 25]) → [10, 20]"
function filterEven(numbers) {
  return numbers.filter(function(number) {
    return number % 2 === 0;
  });
}

console.log(filterEven([1, 2, 3, 4, 5, 6]));
console.log(filterEven([1, 3, 5, 7]));
console.log(filterEven([10, 15, 20, 25]));
