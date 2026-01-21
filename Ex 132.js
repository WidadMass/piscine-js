//   "exercise_132": 
//       "Créez un quiz à choix multiples avec système de score."
//    
//     "listItems": [
//       "✅ Afficher les questions et leurs options de réponse",
//       "✅ Vérifier si la réponse est correcte",
//       "✅ Calculer et afficher le score",
//       "✅ Naviguer entre les questions",
//       "✅ Afficher le résultat final avec possibilité de recommencer",
//       "Affichage : \"Question 1/3 : Quelle est la capitale de la France ?\"",
//       "4 boutons : Paris, Londres, Berlin, Madrid",
//       "Clic sur \"Paris\" → Message \"Bonne réponse !\" + passage à la question suivante",
//       "Après la dernière question → \"Quiz terminé ! Votre score: 2/3\""
function demarrerQuiz(questions) {
    let score = 0;
    let questionIndex = 0;
    const totalQuestions = questions.length;
    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    const poserQuestion = () => {
        if (questionIndex >= totalQuestions) {
            console.log(`\nQuiz terminé ! Votre score: ${score}/${totalQuestions}`);
            readline.close();
            return;
        }
        const currentQuestion = questions[questionIndex];
        console.log(`\nQuestion ${questionIndex + 1}/${totalQuestions} : ${currentQuestion.question}`);
        currentQuestion.options.forEach((option, index) => {
            console.log(`  ${index + 1}. ${option}`);
        });
        readline.question('Votre réponse (numéro) : ', (answer) => {
            const answerIndex = parseInt(answer) - 1;
            if (currentQuestion.options[answerIndex] === currentQuestion.answer) {
                console.log("Bonne réponse !");
                score++;
            }
            else {
                console.log(`Mauvaise réponse ! La bonne réponse était : ${currentQuestion.answer}`);
            }
            questionIndex++;
            poserQuestion();
        });
    };
    poserQuestion();
}                       
const quizQuestions = [
    {
        question: "Quelle est la capitale de la France ?",      
            
        options: ["Paris", "Londres", "Berlin", "Madrid"],
        answer: "Paris"
    },
    {
        question: "Quel est le plus grand océan du monde ?",
        options: ["Atlantique", "Indien", "Arctique", "Pacifique"],
        answer: "Pacifique"
    },
    {
        question: "Qui a écrit 'Roméo et Juliette' ?",
        options: ["Victor Hugo", "William Shakespeare", "Charles Dickens", "Mark Twain"],
        answer: "William Shakespeare"
    }
];
demarrerQuiz(quizQuestions);