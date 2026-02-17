// "exercise_071": {
//"Défi : Palindrome",
//"Créez une fonction isPalindrome qui vérifie si un mot est un palindrome (se lit de la même manière dans les deux sens).",
//"Un palindrome est un mot qui se lit identiquement de gauche à droite et de droite à gauche.",
//"Astuce : Pensez à gérer les majuscules/minuscules !"
//"listItems": 
//"\"radar\" ✓",
//"\"kayak\" ✓",
//"\"level\" ✓",
//"\"noon\" ✓",
//"\"civic\" ✓"

//"Qu'est-ce qu'un palindrome ?"
//"Exemples de palindromes :"
//"Exemples de tests :"
// 
//"codeExamples"
// "isPalindrome(\"radar\")   // true
// isPalindrome(\"hello\")   // false
// isPalindrome(\"Kayak\")   // true (insensible à la casse)
// isPalindrome(\"Level\")   // true
// isPalindrome(\"abc\")     // false"

function isPalindrome(word) {
  const normal = word.toLowerCase();
  const retourner = normal.split('').reverse().join('');
  if (normal === retourner){
    return true;
  } else {
    return false;
  }
}

console.log(isPalindrome("radar"));
console.log(isPalindrome("hello"));
console.log(isPalindrome("Kayak"));
console.log(isPalindrome("Level"));
console.log(isPalindrome("abc"));
