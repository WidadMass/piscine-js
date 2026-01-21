  // "exercise_062":
  //     "Créez une fonction reverseArray qui inverse l'ordre des éléments d'un tableau.",
  //     "Contrainte : Ne pas utiliser .reverse() !"

  //     "reverseArray([1, 2, 3]) → [3, 2, 1]",
  //     "reverseArray([\"a\", \"b\", \"c\"]) → [\"c\", \"b\", \"a\"]",
  //     "reverseArray([5]) → [5]"

function reverseArray(arr) {
  let reversed = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    reversed.push(arr[i]);
  }
  return reversed;
}

console.log(reverseArray([1, 2, 3])); 
console.log(reverseArray(["a", "b", "c"])); 
console.log(reverseArray([5]));