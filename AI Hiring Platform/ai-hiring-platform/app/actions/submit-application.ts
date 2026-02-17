'use server'

import { createClient } from '@/lib/supabase-server';
import { xai } from '@/lib/ai';

// --- Extraction PDF avec pdf-parse 1.1.1 ---
async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const pdfParse = (await import('pdf-parse')).default;
  const data = await pdfParse(buffer);
  return (data.text || '').trim();
}

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
    resumeText = await extractTextFromPDF(buffer);
    console.log(`[DEBUG] PDF Text extracted: ${resumeText.length} chars`);
    if (!resumeText || resumeText.trim().length < 20) {
      console.warn("[DEBUG] PDF text too short or empty!");
    }
  } catch (error: any) {
    console.error("Erreur lecture PDF:", error);
    throw new Error(`Impossible de lire le fichier PDF: ${error.message}`);
  }

  // 2. Récupérer les détails du poste pour l'IA
  const { data: job } = await supabase.from('jobs').select('*').eq('id', jobId).single();
  
  if (!job) {
     throw new Error("Offre non trouvée");
  }

  // 3. Analyser le CV avec l'IA (Grok) - Analyse avancée structurée
  let score = 0;
  let analysis = "";
  let advancedAnalysis: any = null;

  try {
    const prompt = `
Tu es un expert ATS (Applicant Tracking System) senior. Effectue une analyse DÉTAILLÉE et STRUCTURÉE de ce CV par rapport au poste.

IMPORTANT : Le texte du CV a été extrait automatiquement d'un PDF. Il peut contenir des espaces en trop, des caractères spéciaux ou un formatage étrange — c'est NORMAL. Concentre-toi sur le CONTENU et le SENS, pas sur la mise en forme.

=== POSTE ===
Titre : ${job.title}
Description : "${job.description}"

=== CV DU CANDIDAT (texte brut extrait du PDF) ===
"${resumeText.substring(0, 12000)}"

=== INSTRUCTIONS ===

Étape 1 : Identifie 5 à 8 compétences clés exigées par le poste (techniques ET soft skills).
Étape 2 : Pour chaque compétence, vérifie si elle est présente dans le CV. Attribue un statut :
  - "OK" = Compétence clairement démontrée dans le CV
  - "PARTIEL" = Compétence partiellement présente ou dans un contexte différent
  - "ABSENT" = Aucune trace de cette compétence dans le CV
Étape 3 : Compare l'expérience requise (en années) avec celle du candidat.
Étape 4 : Liste les points forts et les points faibles du candidat par rapport au poste.
Étape 5 : Calcule un score global de 0 à 100 qui reflète l'adéquation RÉELLE du candidat :
  - 80-100 = Excellent match, candidat idéal
  - 60-79 = Bon profil, quelques lacunes mineures
  - 40-59 = Profil moyen, lacunes significatives
  - 20-39 = Faible adéquation, beaucoup de compétences manquantes
  - 0-19 = Aucune adéquation avec le poste

Le score DOIT refléter le contenu réel du CV. Un profil qui correspond bien doit avoir un score élevé (60+). Un profil hors sujet doit avoir un score bas (<30).

=== FORMAT DE RÉPONSE (JSON strict, pas de markdown) ===
{
  "score": 72,
  "summary": "Résumé en 2-3 phrases de l'adéquation globale du profil.",
  "skills": [
    {
      "name": "Nom de la compétence",
      "status": "OK",
      "comment": "Explication courte de pourquoi ce statut"
    }
  ],
  "experience": {
    "required": "3 ans",
    "candidate": "5 ans",
    "observations": [
      { "text": "Observation positive sur l'expérience", "type": "positive" },
      { "text": "Observation négative ou manque", "type": "negative" }
    ]
  },
  "strengths": [
    "Point fort 1",
    "Point fort 2"
  ],
  "weaknesses": [
    "Point faible 1",
    "Point faible 2"
  ]
}
`;

    const completion = await xai.chat.completions.create({
      model: "grok-2-latest",
      messages: [
        { role: "system", content: "Tu es un expert en recrutement. Tu analyses des CV et tu réponds UNIQUEMENT en JSON valide, sans aucun markdown ni texte supplémentaire." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    console.log("[DEBUG] AI Raw Response:", completion.choices[0].message.content?.substring(0, 200));
    
    const rawContent = completion.choices[0].message.content || "{}";
    let result;
    try {
        result = JSON.parse(rawContent);
    } catch (e) {
        console.error("[DEBUG] JSON Parse error:", e);
        const cleanContent = rawContent.replace(/```json/g, "").replace(/```/g, "").trim();
        try {
            result = JSON.parse(cleanContent);
        } catch (e2) {
             console.error("[DEBUG] Second JSON Parse failed:", e2);
             result = {};
        }
    }

    score = Number(result.score) || 0;
    // Garde-fou : si le score vaut 0 mais qu'il y a des skills OK, recalculer
    if (score === 0 && result.skills && result.skills.length > 0) {
      const skillsOK = result.skills.filter((s: any) => s.status === 'OK').length;
      const skillsPartiel = result.skills.filter((s: any) => s.status === 'PARTIEL').length;
      const totalSkills = result.skills.length;
      if (totalSkills > 0) {
        score = Math.round(((skillsOK * 1.0 + skillsPartiel * 0.5) / totalSkills) * 100);
        console.log(`[DEBUG] Score recalculé depuis skills: ${score} (${skillsOK} OK, ${skillsPartiel} PARTIEL sur ${totalSkills})`);
      }
    }
    // Borner entre 0 et 100
    score = Math.max(0, Math.min(100, score));
    
    analysis = result.summary || "Analyse indisponible";
    advancedAnalysis = {
      skills: result.skills || [],
      experience: result.experience || null,
      strengths: result.strengths || [],
      weaknesses: result.weaknesses || []
    };

    console.log(`[DEBUG] Score: ${score}, Skills found: ${advancedAnalysis.skills.length}`);

  } catch (error) {
    console.error("Erreur IA Analysis:", error);
  }

  // 4. Sauvegarder le candidat en base (avec analyse complète)
  const { data: savedCandidate, error: saveError } = await supabase.from('candidates').insert([
    {
      job_id: jobId,
      name,
      email,
      resume_text: resumeText,
      score: score,
      analysis_data: {
        summary: analysis,
        skills: advancedAnalysis?.skills || [],
        experience: advancedAnalysis?.experience || null,
        strengths: advancedAnalysis?.strengths || [],
        weaknesses: advancedAnalysis?.weaknesses || []
      }
    }
  ]).select().single();

  if (saveError) {
    console.error("Erreur sauvegarde candidat:", saveError);
    throw new Error("Erreur lors de l'enregistrement de la candidature");
  }

  return { success: true, score, analysis, advancedAnalysis, candidateId: savedCandidate?.id || null };
}
