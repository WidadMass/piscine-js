'use server'

import { xai } from '@/lib/ai';
import { createClient } from '@/lib/supabase-server';

interface QuizAnswer {
  questionId: number;
  questionText: string;
  type: 'multiple_choice' | 'open';
  userAnswer: string;
  correctAnswer: string;
}

export async function evaluateQuiz(
  candidateId: string,
  jobDescription: string,
  answers: QuizAnswer[]
) {
  try {
    // Évaluer les QCM directement
    let mcqCorrect = 0;
    let mcqTotal = 0;
    const openQuestions: QuizAnswer[] = [];

    for (const answer of answers) {
      if (answer.type === 'multiple_choice') {
        mcqTotal++;
        if (answer.userAnswer.trim() === answer.correctAnswer.trim()) {
          mcqCorrect++;
        }
      } else {
        openQuestions.push(answer);
      }
    }

    // Évaluer les questions ouvertes avec l'IA
    let openScore = 0;
    let openTotal = openQuestions.length;
    let detailedResults: any[] = [];

    if (openQuestions.length > 0) {
      const prompt = `
Tu es un expert technique en recrutement. Évalue les réponses du candidat aux questions ouvertes.

=== CONTEXTE DU POSTE ===
"${jobDescription}"

=== QUESTIONS ET RÉPONSES ===
${openQuestions.map((q, i) => `
Question ${i + 1}: "${q.questionText}"
Réponse attendue: "${q.correctAnswer}"
Réponse du candidat: "${q.userAnswer}"
`).join('\n')}

=== INSTRUCTIONS ===
Pour chaque question, attribue un score de 0 à 10 :
- 0 : Réponse vide, hors-sujet ou totalement fausse
- 3-4 : Quelques éléments corrects mais insuffisants
- 5-6 : Réponse partielle, concepts principaux compris
- 7-8 : Bonne réponse, quelques détails manquants
- 9-10 : Réponse excellente, complète et précise

=== FORMAT DE RÉPONSE (JSON strict) ===
{
  "evaluations": [
    {
      "questionIndex": 0,
      "score": 7,
      "maxScore": 10,
      "feedback": "Explication courte du score"
    }
  ]
}
`;

      const completion = await xai.chat.completions.create({
        model: "grok-2-latest",
        messages: [
          { role: "system", content: "Tu es un évaluateur technique. Réponds UNIQUEMENT en JSON valide." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      });

      const rawContent = completion.choices[0].message.content || "{}";
      let result;
      try {
        result = JSON.parse(rawContent);
      } catch (e) {
        const cleanContent = rawContent.replace(/```json/g, "").replace(/```/g, "").trim();
        result = JSON.parse(cleanContent);
      }

      if (result.evaluations) {
        for (const evaluation of result.evaluations) {
          openScore += evaluation.score || 0;
          detailedResults.push({
            questionText: openQuestions[evaluation.questionIndex]?.questionText,
            userAnswer: openQuestions[evaluation.questionIndex]?.userAnswer,
            score: evaluation.score,
            maxScore: evaluation.maxScore || 10,
            feedback: evaluation.feedback
          });
        }
      }
    }

    // Calculer le score total du quiz
    const mcqScore = mcqTotal > 0 ? (mcqCorrect / mcqTotal) * 100 : 0;
    const openScorePct = openTotal > 0 ? (openScore / (openTotal * 10)) * 100 : 0;
    
    let quizScore: number;
    if (mcqTotal > 0 && openTotal > 0) {
      quizScore = Math.round(mcqScore * 0.4 + openScorePct * 0.6);
    } else if (mcqTotal > 0) {
      quizScore = Math.round(mcqScore);
    } else {
      quizScore = Math.round(openScorePct);
    }

    // Construire les résultats QCM
    const mcqResults = answers
      .filter(a => a.type === 'multiple_choice')
      .map(a => ({
        questionText: a.questionText,
        userAnswer: a.userAnswer,
        correctAnswer: a.correctAnswer,
        isCorrect: a.userAnswer.trim() === a.correctAnswer.trim()
      }));

    // Mettre à jour le candidat avec un score combiné
    // Score final = 40% CV + 60% Quiz
    const supabase = await createClient();
    
    const { data: candidate } = await supabase
      .from('candidates')
      .select('score')
      .eq('id', candidateId)
      .single();

    const cvScore = candidate?.score || 0;
    const combinedScore = Math.round(cvScore * 0.4 + quizScore * 0.6);

    // Update le score dans la base
    await supabase
      .from('candidates')
      .update({ score: combinedScore })
      .eq('id', candidateId);

    return {
      success: true,
      quizScore,
      cvScore,
      combinedScore,
      mcqResults,
      openResults: detailedResults,
      mcqCorrect,
      mcqTotal,
      openScore: openTotal > 0 ? Math.round(openScorePct) : null,
    };

  } catch (error: any) {
    console.error("Erreur évaluation quiz:", error);
    return {
      success: false,
      quizScore: 0,
      cvScore: 0,
      combinedScore: 0,
      mcqResults: [],
      openResults: [],
      mcqCorrect: 0,
      mcqTotal: 0,
      openScore: null,
      error: error.message
    };
  }
}
