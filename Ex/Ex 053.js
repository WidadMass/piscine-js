//   "exercise_053"
//       "Manipulez un tableau de langages en utilisant les méthodes push(), pop() et unshift()."

//       "Créez un tableau avec 3 langages",
//       "Affichez le tableau initial",
//       "Ajoutez un langage à la fin avec push()",
//       "Affichez le tableau après push()",
//       "Enlevez le dernier élément avec pop()",
//       "Affichez le tableau après pop()",
//       "Ajoutez un langage au début avec unshift()",
//       "Affichez le tableau final"

const programmingLanguages = ["JavaScript", "Python", "Java" ];
console.log("Tableau initial :", programmingLanguages);
programmingLanguages.push("C++");
console.log("Après push() :", programmingLanguages);
programmingLanguages.pop();
console.log("Après pop() :", programmingLanguages);
programmingLanguages.unshift("Ruby");
console.log("Tableau final :", programmingLanguages);


