'use server'

import { createClient } from '@/lib/supabase-server';
import { xai } from '@/lib/ai';
import * as pdfParseModule from 'pdf-parse';
// @ts-ignore
const pdf = pdfParseModule.default || pdfParseModule;

export async function submitApplication(formData: FormData) {
  const supabase = await createClient();

  const jobId = formData.get('jobId') as string;
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const file = formData.get('resume') as File;

  if (!file || !jobId || !name || !email) {
    throw new Error("Champs manquants");
  }

  // 1. Lire le contenu du PDF
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  let resumeText = "";

  try {
    const data = await pdf(buffer);
    resumeText = data.text;
  } catch (error) {
    console.error("Erreur lecture PDF:", error);
    throw new Error("Impossible de lire le fichier PDF");
  }

  // 2. Récupérer les détails du poste pour l'IA
  const { data: job } = await supabase.from('jobs').select('*').eq('id', jobId).single();
  
  if (!job) {
     throw new Error("Offre non trouvée");
  }

  // 3. Analyser le CV avec l'IA (Grok) pour avoir un score
  let score = 0;
  let analysis = "";

  try {
    const prompt = `
      Tu es un recruteur expert. Analyse ce CV par rapport à la description du poste.
      
      Poste : ${job.title}
      Description : ${job.description}
      
      Contenu du CV :
      "${resumeText.substring(0, 3000)}" // On limite pour éviter de dépasser les tokens
      
      Tâche :
      1. Donne un score de pertinence de 0 à 100.
      2. Explique brièvement pourquoi en 2 phrases.
      
      Format de réponse attendu (JSON uniquement) :
      {
        "score": 85,
        "reason": "Le candidat possède les compétences clés React et Node.js..."
      }
    `;

    const completion = await xai.chat.completions.create({
      model: "grok-beta",
      messages: [
        { role: "system", content: "You extract data and score candidates in JSON format only." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(completion.choices[0].message.content || "{}");
    score = result.score || 0;
    analysis = result.reason || "";

  } catch (error) {
    console.error("Erreur IA Analysis:", error);
    // On continue même si l'IA échoue, on mettra score 0
  }

  // 4. Sauvegarder le candidat en base (avec l'analyse IA si possible, sinon juste le texte)
  // Note: J'ai ajouté une colonne resume_text, on pourrait stocker l'analyse dans une colonne 'ai_feedback' si elle existait, 
  // pour l'instant on va juste sauver le score.
  
  const { error: saveError } = await supabase.from('candidates').insert([
    {
      job_id: jobId,
      name,
      email,
      resume_text: resumeText, // On garde le texte brut du CV
      score: score
    }
  ]);

  if (saveError) {
    console.error("Erreur sauvegarde candidat:", saveError);
    throw new Error("Erreur lors de l'enregistrement de la candidature");
  }

  return { success: true, score, analysis };
}
