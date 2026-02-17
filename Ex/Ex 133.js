const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let nombreMagique = Math.floor(Math.random() * 100) + 1;
let tentatives = 0;

console.log("=== JEU : DEVINEZ LE NOMBRE (1-100) ===");
console.log("J'ai choisi un nombre entre 1 et 100. A vous de jouer !");

const poserQuestion = () => {
    rl.question(`\nTentative #${tentatives + 1} > Entrez un nombre : `, (reponse) => {
        const valeur = parseInt(reponse);

        if (isNaN(valeur)) {
            console.log("Ce n'est pas un nombre valide.");
            poserQuestion();
            return;
        }

        tentatives++;

        if (valeur === nombreMagique) {
            console.log(`\nBRAVO ! Vous avez trouve le nombre ${nombreMagique} en ${tentatives} tentatives !`);
            rl.close();
        } else if (valeur < nombreMagique) {
            console.log("C'est PLUS grand !");
            poserQuestion();
        } else {
            console.log("C'est MOINS grand !");
            poserQuestion();
        }
    });
};

poserQuestion();



