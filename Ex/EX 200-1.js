// Implémentez une fonction qui combine deux chaînes de caractères avec un espace entre elles.

// Objectifs :
// ✅ Utiliser l'opérateur de concaténation +
// ✅ Comprendre les template literals
// ✅ Découvrir la méthode concat()
// ✅ Maîtriser l'assemblage de chaînes
// Exemples :
// concatStrings("Hello", "World") // "Hello World"
// concatStrings("Bonjour", "JS")   // "Bonjour JS"
// concatStrings("", "Test")        // " Test"
function concatStrings(str1, str2) {
   
    const resultPlus = str1 + " " + str2;
    const resultTemplate = `${str1} ${str2}`;
    const resultConcat = str1.concat(" ", str2);

    console.log("Résultat avec + :", resultPlus);
    console.log("Résultat avec template literals :", resultTemplate);
    console.log("Résultat avec concat() :", resultConcat);      
    return resultPlus; 
}

// Tests
console.log(concatStrings("Hello", "World")); 
console.log(concatStrings("Bonjour", "JS"));   
console.log(concatStrings("", "Test"));       