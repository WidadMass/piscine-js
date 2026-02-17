import { createClient } from '@/lib/supabase-server';
import Link from 'next/link';

export const revalidate = 0; // Données toujours fraîches

export default async function RecruiterDashboard() {
  const supabase = await createClient();

  // Récupérer les offres
  const { data: jobs } = await supabase
    .from('jobs')
    .select('*, candidates(count)')
    .order('created_at', { ascending: false });

  // Récupérer les derniers candidats
  const { data: recentCandidates } = await supabase
    .from('candidates')
    .select('*, jobs(title)')
    .order('created_at', { ascending: false })
    .limit(5);

  const totalCandidates = jobs?.reduce((acc, job) => acc + (job.candidates?.[0]?.count || 0), 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* En-tête + Bouton Création */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Tableau de Bord</h1>
            <p className="text-gray-500 mt-1">Gérez vos recrutements et analysez les talents.</p>
          </div>
          <Link 
            href="/dashboard/recruiter/create-job" 
            className="bg-violet-600 hover:bg-violet-700 text-white px-5 py-2.5 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2"
          >
            <span>+ Nouvelle Offre</span>
          </Link>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm font-medium text-gray-500 mb-1">Candidats Total</p>
            <p className="text-3xl font-bold text-gray-900">{totalCandidates}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm font-medium text-gray-500 mb-1">Offres Actives</p>
            <p className="text-3xl font-bold text-violet-600">{jobs?.length || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-sm font-medium text-gray-500 mb-1">Score Moyen IA</p>
            <p className="text-3xl font-bold text-green-600">
               {recentCandidates?.length 
                 ? Math.round(recentCandidates.reduce((acc, c) => acc + (c.score || 0), 0) / recentCandidates.length) 
                 : '-'}%
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Liste des Offres */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Vos Offres</h2>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {!jobs?.length ? (
                <div className="p-8 text-center text-gray-500">Aucune offre créée pour le moment.</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {jobs.map((job) => (
                    <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{job.title}</h3>
                        <p className="text-sm text-gray-500 line-clamp-1 mt-1">{job.description}</p>
                        <div className="mt-2 flex items-center text-xs text-gray-400 gap-3">
                          <span>Publié le {new Date(job.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-block bg-violet-50 text-violet-700 font-bold px-3 py-1 rounded-full text-sm">
                          {job.candidates?.[0]?.count || 0} candidats
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Candidats Récents (Flux d'activité) */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-800">Derniers Candidats</h2>
            <div className="space-y-4">
              {!recentCandidates?.length ? (
                <p className="text-gray-500 text-sm">Aucune candidature récente.</p>
              ) : (
                recentCandidates.map((candidate) => (
                  <div key={candidate.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-gray-900">{candidate.name}</p>
                        <p className="text-xs text-gray-500">{candidate.jobs?.title}</p>
                      </div>
                      <span className={`text-sm font-bold px-2 py-1 rounded ${
                        (candidate.score || 0) >= 70 ? 'bg-green-100 text-green-700' : 
                        (candidate.score || 0) >= 40 ? 'bg-orange-100 text-orange-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {candidate.score || 0}%
                      </span>
                    </div>
                    {/* On pourrait afficher un extrait de l'analyse IA stockée ici si on ajoutait la colonne */}
                    <div className="text-xs text-gray-400 mt-2 flex justify-between items-center">
                      <span>{new Date(candidate.created_at).toLocaleDateString()}</span>
                      <button className="text-violet-600 hover:text-violet-800 font-medium">Voir le profil</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
