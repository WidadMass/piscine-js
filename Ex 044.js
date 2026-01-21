//   "exercise_044"
//       "Créez une fonction reverseString qui inverse l'ordre des caractères d'une chaîne."
function reverseString(str) {
    let reserved='';
    for (let i =str.length -1; i>=0; i--){
        
        reserved += str[i];
    }
    return reserved;
}
const inputString ="Hello,World!";
const reversed = reverseString(inputString);
console.log(`La chaîne inversée est : ${reversed}`);




