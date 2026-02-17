'use server'

import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';

export async function saveJobAndQuiz(jobTitle: string, jobDescription: string, quizData: any) {
  try {
    const supabase = await createClient();

    // 1. Créer l'offre d'emploi
    // Note: Si vous n'avez pas désactivé RLS ou configuré de politiques, cela peut échouer.
    console.log("Tentative d'insertion dans jobs:", { title: jobTitle });
    
    // Essai d'insertion sans 'requirements' pour voir si c'est la colonne qui manque
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .insert([
        { title: jobTitle, description: jobDescription }
      ])
      .select()
      .single();

    if (jobError) {
      console.error('Erreur sauvegarde job:', jobError);
      throw new Error(`Impossible de créer l'offre: ${jobError.message}`);
    }

    // 2. Sauvegarder le quiz associé
    const { error: quizError } = await supabase
      .from('quizzes')
      .insert([
        { 
          job_id: job.id, 
          questions: quizData 
        }
      ]);

    if (quizError) {
      console.error('Erreur sauvegarde quiz:', quizError);
      // Idéalement on devrait supprimer le job créé si le quiz échoue, mais restons simple pour l'atelier
      throw new Error(`Impossible de sauvegarder le quiz: ${quizError.message}`);
    }

    return { success: true, jobId: job.id };
  } catch (error: any) {
    console.error("Erreur générale saveJobAndQuiz:", error);
    throw new Error(error.message || "Erreur serveur inconnue");
  }
}

