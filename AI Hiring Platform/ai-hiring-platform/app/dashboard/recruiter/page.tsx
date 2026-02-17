import { createClient } from '@/lib/supabase-server';
import Link from 'next/link';

export const revalidate = 0; // Données toujours fraîches

export default async function RecruiterDashboard() {
  const supabase = await createClient();

  // Récupérer les offres avec count
  const { data: jobs, error } = await supabase
    .from('jobs')
    .select('*, candidates(count)')
    .order('created_at', { ascending: false });

  if (error) {
      console.error("Error fetching jobs", error);
  }

  // Récupérer les derniers candidats
  const { data: recentCandidates } = await supabase
    .from('candidates')
    .select('*, jobs(title)')
    .order('created_at', { ascending: false })
    .limit(5);

  const totalCandidates = jobs?.reduce((acc: any, job: any) => acc + (job.candidates?.[0]?.count || 0), 0) || 0;
  const avgScore = recentCandidates?.length 
                 ? Math.round(recentCandidates.reduce((acc: any, c: any) => acc + (c.score || 0), 0) / recentCandidates.length) 
                 : 0;

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-12 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* En-tête + Bouton Création */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-gray-200 pb-8">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Tableau de Bord</h1>
            <p className="text-gray-500 mt-2 text-lg">Vue d'ensemble de vos recrutements et analyses IA.</p>
          </div>
          <Link 
            href="/dashboard/recruiter/create-job" 
            className="group bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-medium shadow-lg transition-all transform hover:scale-[1.02] flex items-center gap-3"
          >
            <span className="text-xl font-light">+</span>
            <span>Nouvelle Offre</span>
          </Link>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 relative z-10">Candidats Total</p>
            <p className="text-5xl font-extrabold text-gray-900 relative z-10">{totalCandidates}</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-violet-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 relative z-10">Offres Actives</p>
            <p className="text-5xl font-extrabold text-violet-600 relative z-10">{jobs?.length || 0}</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 ${avgScore > 70 ? 'bg-green-50' : 'bg-orange-50'}`}></div>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 relative z-10">Qualité Moyenne</p>
            <div className="flex items-baseline gap-2 relative z-10">
                <p className={`text-5xl font-extrabold ${avgScore > 70 ? 'text-green-600' : 'text-orange-500'}`}>
                {avgScore}%
                </p>
                <span className="text-sm text-gray-400 font-medium">Score IA</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up animation-delay-200">
          
          {/* Liste des Offres */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Offres Récentes</h2>
                <button className="text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">Tout voir</button>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {!jobs?.length ? (
                <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl text-gray-400">📭</div>
                    <p className="text-gray-500">Aucune offre créée pour le moment.</p>
                    <Link href="/dashboard/recruiter/create-job" className="text-violet-600 font-medium mt-2 inline-block hover:underline">Créer ma première offre</Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {jobs.map((job: any) => (
                    <Link key={job.id} href={`/dashboard/recruiter/jobs/${job.id}`} className="block p-6 hover:bg-gray-50/50 transition-colors group flex items-center justify-between">
                      <div className="flex-1 min-w-0 pr-6">
                        <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-bold text-gray-900 text-lg group-hover:text-violet-700 transition-colors truncate">{job.title}</h3>
                            {/* Chip statut (simulé) */}
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wide">Actif</span>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2">{job.description}</p>
                        <div className="mt-3 flex items-center text-xs text-gray-400 font-medium gap-4">
                          <span className="flex items-center gap-1">
                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                             {new Date(job.created_at).toLocaleDateString()}
                          </span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <span>ID: {job.id.substring(0,8)}</span>
                        </div>
                      </div>
                      
                      <div className="text-right pl-4 border-l border-gray-100">
                        <div className="text-2xl font-bold text-gray-900 mb-1">{job.candidates?.[0]?.count || 0}</div>
                        <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">Candidats</div>
                        <span className="text-xs text-violet-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">Voir détails →</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Candidats Récents (Flux d'activité) */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Candidatures en direct</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit">
              {!recentCandidates?.length ? (
                <p className="text-gray-500 text-center py-8">Aucune activité récente.</p>
              ) : (
                <div className="space-y-6">
                {recentCandidates.map((candidate: any) => (
                    <div key={candidate.id} className="flex gap-4 items-start">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow-sm shrink-0 
                            ${(candidate.score || 0) >= 80 ? 'bg-green-100 text-green-700' : 
                              (candidate.score || 0) >= 50 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                            {candidate.score || 0}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-gray-900 truncate">{candidate.name}</p>
                            <p className="text-xs text-gray-500 truncate mb-1">Pour: {candidate.jobs?.title || 'Offre supprimée'}</p>
                            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                                <div 
                                    className={`h-full rounded-full ${(candidate.score || 0) >= 80 ? 'bg-green-500' : (candidate.score || 0) >= 50 ? 'bg-orange-500' : 'bg-red-500'}`} 
                                    style={{ width: `${candidate.score || 0}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
              )}
              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                  {jobs && jobs.length > 0 && (
                    <Link href={`/dashboard/recruiter/jobs/${jobs[0].id}`} className="text-sm font-semibold text-violet-600 hover:text-violet-800 transition-colors">Voir tous les candidats →</Link>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
