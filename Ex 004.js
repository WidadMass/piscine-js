// "exercise_004": {

//     "title": "Calculateur de TVA",
//     "paragraphs": [
//       "Écrivez un programme qui calcule le prix TTC (Toutes Taxes Comprises) à partir d'un prix HT (Hors Taxes).",
//       "Formule : Prix TTC = Prix HT + (Prix HT × Taux TVA)"
//     ],
//     "listItems": [
//       "TVA : 20%",
//       "Prix HT : 100€",
//       "Calculez le montant de la TVA",
//       "Calculez le prix TTC",
//       "Affichez les trois valeurs : Prix HT, Montant TVA, Prix TTC"
//        ],
//         "Calculs à effectuer"
//      "Exemple de sortie attendue :"
//     
//     "codeExamples": 
//       "Prix HT: 100€\nMontant TVA: 20€\nPrix TTC: 120€"


const prixHT = 100;
const tauxTVA = 0.20;


const montantTVA = prixHT * tauxTVA;
const prixTTC = prixHT + montantTVA;


console.log(`Prix HT : ${prixHT} €`); //100€    
console.log(`Montant TVA : ${montantTVA} €`); //20€
console.log(`Prix TTC : ${prixTTC} €`); //120€
