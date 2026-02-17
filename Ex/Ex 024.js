// "exercise_024": 
// "Année bissextile",

// "Créez une fonction isLeapYear qui détermine si une année est bissextile.",
// "Une année est bissextile si :",
// "En résumé :"

// "Elle est divisible par 4 ET non divisible par 100",
// "OU elle est divisible par 400",
// "Tous les 4 ans → bissextile",
// "SAUF tous les 100 ans → PAS bissextile",
// "SAUF tous les 400 ans → bissextile"

// "Règles d'une année bissextile"
// Exemples de tests :
 
// codeExamples: 
// isLeapYear(2024)  // true (divisible par 4, pas par 100)
// isLeapYear(2023)  // false (pas divisible par 4)
// isLeapYear(2000)  // true (divisible par 400)
// isLeapYear(1900)  // false (divisible par 100 mais pas par 400)"


function isLeapYear(year) {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    console.log(`${year} est true`);
  }
  else (
    console.log(`${year} est false`)
);
}


isLeapYear(2024); // true
isLeapYear(2023); // false
isLeapYear(2000); // true
isLeapYear(1900); // false 