'use server'

import { xai } from '@/lib/ai';

export async function generateQuiz(jobDescription: string) {
  try {
    const prompt = `
      Tu es un expert en recrutement technique. Génère un quiz d'évaluation pour un candidat basé sur la description de poste suivante.
      
      Description du poste : "${jobDescription}"
      
      Génère 5 questions techniques variées (QCM et questions ouvertes).
      Le format de sortie DOIT être un objet JSON valide, sans markdown, avec la structure suivante :
      {
        "questions": [
          {
            "id": 1,
            "text": "Intitulé de la question",
            "type": "multiple_choice" | "open",
            "options": ["Option A", "Option B", "Option C", "Option D"], // Uniquement pour QCM
            "correctAnswer": "La bonne réponse ou l'explication attendue"
          }
        ]
      }
    `;

    const completion = await xai.chat.completions.create({
      model: "grok-4-latest",
      messages: [
        { role: "system", content: "You are a helpful assistant that outputs strictly JSON." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" } // Force le JSON si supporté, sinon le prompt aide
    });

    const content = completion.choices[0].message.content;
    
    if (!content) {
      throw new Error("Aucune réponse de l'IA");
    }

    return JSON.parse(content);

  } catch (error) {
    console.error("Erreur génération quiz:", error);
    throw new Error("Impossible de générer le quiz");
  }
}
