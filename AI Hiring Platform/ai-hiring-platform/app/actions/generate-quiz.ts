'use server'

import { xai } from '@/lib/ai';

export async function generateQuiz(jobDescription: string, numberOfQuestions: number = 5) {
  try {
    const prompt = `
      Tu es un expert en recrutement technique senior.
      Ton objectif est de créer un test technique PERTINENT et CIBLÉ pour ce poste spécifique.
      
      Analyse d'abord la description du poste pour identifier :
      1. Le niveau de séniorité attendu (Junior, Confirmé, Senior).
         - Si Junior : Questions sur les fondamentaux et la syntaxe.
         - Si Confirmé : Questions sur les bonnes pratiques, pièges courants et performance.
         - Si Senior : Questions d'architecture, scalabilité, sécurité et system design.
      2. Les technologies critiques (ex: React, Node, AWS, Python, SQL).
      
      Description du poste : 
      "${jobDescription}"
      
      Génère ${numberOfQuestions} questions techniques (mix QCM et questions ouvertes) qui vérifient la compétence réelle.
      Évite les questions triviales ("C'est quoi HTML?"). Privilégie des snippets de code à analyser ou des cas pratiques.
      
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
