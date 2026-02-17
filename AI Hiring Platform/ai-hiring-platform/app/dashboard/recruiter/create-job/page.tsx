'use client'

import { useState } from 'react';
import { generateQuiz } from '@/app/actions/generate-quiz';
import { saveJobAndQuiz } from '@/app/actions/save-job';
import { useRouter } from 'next/navigation';

export default function CreateJobPage() {
  const router = useRouter();
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleGenerate = async () => {
    if (!jobDescription) return;
    setLoading(true);
    try {
      const result = await generateQuiz(jobDescription);
      setQuiz(result);
    } catch (error) {
      alert("Erreur lors de la génération. Veuillez vérifier votre clé API.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
     if (!jobTitle || !quiz) {
       alert("Veuillez remplir le titre et générer un quiz");
       return;
     }

     setSaving(true);
     try {
       await saveJobAndQuiz(jobTitle, jobDescription, quiz);
       router.push('/dashboard/recruiter');
     } catch(err) {
       alert("Erreur lors de la sauvegarde");
     } finally {
       setSaving(false);
     }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Créer une offre d'emploi</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Décrivez le poste et laissez l'IA générer le test technique pour vos candidats.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Colonne Gauche : Formulaire */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Détails du poste</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titre du poste</label>
                  <input
                    type="text"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                    placeholder="Ex: Développeur Fullstack React/Node.js"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description & Compétences requises</label>
                  <textarea
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg h-48 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors resize-none"
                    placeholder="Listez les compétences clés, les années d'expérience, et les technologies maîtrisées (ex: React, TypeScript, SQL...)"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                  />
                  <p className="text-xs text-gray-400 mt-1">Plus la description est précise, plus le quiz sera pertinent.</p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleGenerate}
                    disabled={loading || !jobDescription}
                    className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/30"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span>Génération en cours avec Grok...</span>
                      </>
                    ) : (
                      <>
                        <span>Générer le Quiz IA</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne Droite : Aperçu */}
          <div className="space-y-6">
            {!quiz && !loading && (
              <div className="bg-gray-100 dark:bg-gray-800/50 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12 text-center h-full min-h-[400px] flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl font-bold">?</span>
                </div>
                <h3 className="text-lg font-medium mb-1">En attente de génération</h3>
                <p className="text-sm">Remplissez la description à gauche pour voir apparaître le quiz ici.</p>
              </div>
            )}

            {loading && !quiz && (
              <div className="space-y-4 animate-pulse">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 h-32"></div>
                ))}
              </div>
            )}

            {quiz && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Aperçu du Quiz ({quiz.questions?.length || 0} questions)</h2>
                  <button className="text-sm text-violet-600 hover:underline">Modifier manuellement</button>
                </div>

                <div className="space-y-4">
                  {quiz.questions?.map((q: any, i: number) => (
                    <div key={i} className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <span className="font-bold text-gray-500 dark:text-gray-400 text-sm">Question {i + 1}</span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          q.type === 'multiple_choice' 
                            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300' 
                            : 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                        }`}>
                          {q.type === 'multiple_choice' ? 'Choix Multiple' : 'Question Ouverte'}
                        </span>
                      </div>
                      
                      <p className="font-medium text-lg mb-4 text-gray-900 dark:text-white">{q.text}</p>
                      
                      {q.type === 'multiple_choice' && (
                        <div className="grid grid-cols-1 gap-2 pl-2">
                          {q.options.map((opt: string, idx: number) => (
                            <div key={idx} className={`flex items-center p-2 rounded-lg text-sm ${
                              opt === q.correctAnswer 
                                ? "bg-green-50 border border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-300 font-medium" 
                                : "bg-gray-50 text-gray-600 dark:bg-gray-700/50 dark:text-gray-400"
                            }`}>
                              <div className={`w-4 h-4 rounded-full border mr-3 flex items-center justify-center ${
                                opt === q.correctAnswer ? "border-green-500 bg-green-500" : "border-gray-400"
                              }`}>
                                {opt === q.correctAnswer && <span className="text-white text-[10px]"></span>}
                              </div>
                              {opt}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {q.type === 'open' && (
                        <div className="bg-fuchsia-50 dark:bg-fuchsia-900/20 p-3 rounded-lg border border-fuchsia-100 dark:border-fuchsia-800">
                          <p className="text-xs font-bold text-fuchsia-800 dark:text-fuchsia-300 mb-1">RÉPONSE ATTENDUE PAR L'IA</p>
                          <p className="text-sm text-fuchsia-900 dark:text-fuchsia-200 italic">"{q.correctAnswer}"</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="sticky bottom-6 pt-4 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent dark:from-gray-900 dark:via-gray-900 pb-2">
                  <button 
                    onClick={handleSave}
                    disabled={saving}
                    className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition-transform hover:scale-[1.02] flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <span>{saving ? 'Sauvegarde en cours...' : "Sauvegarder et Publier l'Offre"}</span>
                  </button>
                </div>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
