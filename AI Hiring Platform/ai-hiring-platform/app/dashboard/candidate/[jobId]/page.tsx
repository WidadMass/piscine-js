'use client'

import { useState, use } from 'react';
import { submitApplication } from '@/app/actions/submit-application';

export default function ApplyPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<{ score: number, analysis: string } | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    
    const formData = new FormData(event.currentTarget);
    formData.append('jobId', jobId); // On ajoute l'ID du job depuis l'URL

    try {
      const result = await submitApplication(formData);
      if (result.success) {
        setSuccess(true);
        setAiResult({ score: result.score, analysis: result.analysis });
      }
    } catch (error: any) {
      console.error(error);
      alert(`Erreur lors de l'envoi : ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Candidature envoyée !</h2>
          <p className="text-gray-600 mb-6">Votre CV a été analysé par notre IA.</p>
          
          {aiResult && (
            <div className="bg-violet-50 p-4 rounded-lg mb-6 text-left">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-violet-800">Score de pertinence IA</span>
                <span className="bg-violet-200 text-violet-800 text-xs font-bold px-2 py-1 rounded">{aiResult.score}/100</span>
              </div>
              <p className="text-sm text-violet-700 italic">{aiResult.analysis}</p>
            </div>
          )}

          <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 w-full">
            Retour aux offres
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-2xl w-full flex flex-col md:flex-row">
        
        {/* Partie Gauche : Info */}
        <div className="bg-violet-700 p-8 text-white md:w-2/5 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">Postuler</h1>
          <p className="opacity-90 mb-6">Envoyez votre CV pour que notre IA analyse votre profil en temps réel.</p>
          <div className="flex items-center space-x-2 text-sm opacity-75">
            <span>Powered by Grok AI</span>
          </div>
        </div>

        {/* Partie Droite : Formulaire */}
        <div className="p-8 md:w-3/5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
              <input name="name" required type="text" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none text-gray-900" placeholder="Jean Dupont" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input name="email" required type="email" className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-violet-500 outline-none text-gray-900" placeholder="jean@example.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CV (PDF uniquement)</label>
              <div className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer relative ${fileName ? 'border-violet-500 bg-violet-50' : 'border-gray-300 hover:bg-gray-50'}`}>
                <input 
                  name="resume" 
                  required 
                  type="file" 
                  accept=".pdf" 
                  onChange={(e) => setFileName(e.target.files?.[0]?.name || null)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                />
                <div className="text-gray-500">
                  {fileName ? (
                    <>
                      <p className="text-sm font-bold text-violet-700">{fileName}</p>
                      <p className="text-xs text-violet-500">Fichier sélectionné</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium">Cliquez pour uploader</p>
                      <p className="text-xs">Format PDF uniquement (max 5MB)</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50 mt-4"
            >
              {loading ? 'Analyse en cours...' : 'Envoyer ma candidature'}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
