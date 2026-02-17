// "exercise_042":
//   "Simulez un jeu où un programme cherche un nombre secret en incrémentant une tentative jusqu'à le trouver."
//   "Définissez un nombre secret (par exemple 42)",
//   "Utilisez une boucle while pour compter les tentatives",
//   "Le programme \"devine\" en incrémentant de 1 à chaque essai",
//   "Affichez le nombre d'essais nécessaires pour trouver le nombre"

function findSecretNumber() {
    const secretNumber = 42;
    let attempt = 0;
    while (true) {
        attempt++;
        if (attempt === secretNumber) {
            console.log(`Nombre secret ${secretNumber} trouvé en ${attempt} tentatives.`);
            break;
        }
    }
}
findSecretNumber();
