//  "exercise_054"
//       "Affichez chaque langage du tableau avec sa position (numérotée à partir de 1).",
//       "Pour chaque élément, affichez : \"numéro. langage\"",
//       "Astuce : Utilisez i + 1 pour afficher la numérotation à partir de 1."
const languages = ["JavaScript", "Python", "Java", "C#", "Ruby"];

for (let i = 0; i < languages.length; i++) {
  console.log((i + 1) + ". " + languages[i]);
}


