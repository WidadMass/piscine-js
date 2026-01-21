// exercise_023
// Notes scolaires

// Créez une fonction getGrade qui convertit une note numérique (0-100) en lettre selon le barème américain."

//       "A : 90-100",
//       "B : 80-89",
//       "C : 70-79",
//       "D : 60-69",
//       "F : 0-59 (échec)"
   
//       "Barème de notation"
   
//     "Exemples de tests :"
   
//     "codeExamples": 
//       "getGrade(95)   // \"A\"
//       // getGrade(85)   // \"B\"
//       // getGrade(75)   // \"C\"
//       // getGrade(65)   // \"D\"
//       // getGrade(55)   // \"F\"
//       // getGrade(100)  // \"A\""
    
 

function getGrade(note) {
    if (note >= 90 && note <= 100) {
        return console.log(`La note numérique de ${note} est A`);
    } else if (note >= 80 && note < 90) {
       return console.log(`La note numérique de ${note} est B`);
    } else if (note >= 70 && note < 80) {
        return console.log(`La note numérique de ${note} est C`);
    } else if (note >= 60 && note < 70) {
        return console.log(`La note numérique de ${note} est D`);
    } else {
        return console.log(`La note numérique de ${note} est F`);
    }
}

getGrade(95);   // "A"
getGrade(85);   // "B"
getGrade(75);   // "C"
getGrade(65);   // "D"
getGrade(55);   // "F"
getGrade(100);  // "A"