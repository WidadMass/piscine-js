//   "exercise_043": {
//       "Créez une fonction countVowels qui compte le nombre de voyelles dans une chaîne de caractères.",
//       "Voyelles : a, e, i, o, u (minuscules et majuscules)"
//avec un  console pour taper la phrase et voir le resultat
function countVowels(str) {
    const vowels = 'aeiouAEIOU';
    let count = 0;
    for (let char of str) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    return count;
}
const inputString = "Bonjour, comment ça va ?";
const vowelCount = countVowels(inputString);
console.log(`Le nombre de voyelles dans la chaîne est : ${vowelCount}`);