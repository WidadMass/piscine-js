// "exercise_031":
//       "Créez une fonction multiplicationTable qui affiche la table de multiplication d'un nombre de 1 à 10.",
//       "Pour chaque ligne, affichez : \"n x i = résultat\""



function multiplicationTable(nombre) {
    for (let i = 1; i <= 10; i++) {
        console.log(`${nombre} x ${i} = ${nombre * i}`);
    }
    console.log('');
}

multiplicationTable(7);
multiplicationTable(5);
multiplicationTable(9);