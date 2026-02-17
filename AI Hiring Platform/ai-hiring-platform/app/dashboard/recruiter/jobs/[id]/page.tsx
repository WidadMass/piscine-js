import { createClient } from '@/lib/supabase-server';
import Link from 'next/link';

export const revalidate = 0;

// Helper pour couleur de score
function scoreColor(score: number) {
  if (score >= 75) return { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', bar: 'bg-green-500', badge: 'bg-green-100 text-green-700' };
  if (score >= 50) return { text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', bar: 'bg-orange-500', badge: 'bg-orange-100 text-orange-700' };
  return { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', bar: 'bg-red-500', badge: 'bg-red-100 text-red-700' };
}

function getRank(score: number): string {
  if (score >= 85) return 'A+';
  if (score >= 75) return 'A';
  if (score >= 65) return 'B+';
  if (score >= 50) return 'B';
  if (score >= 35) return 'C';
  return 'D';
}

export default async function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  // Récupérer l'offre
  const { data: job } = await supabase
    .from('jobs')
    .select('*')
    .eq('id', id)
    .single();

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Offre introuvable</h1>
          <Link href="/dashboard/recruiter" className="text-violet-600 hover:underline">← Retour au dashboard</Link>
        </div>
      </div>
    );
  }

  // Récupérer le quiz associé
  const { data: quiz } = await supabase
    .from('quizzes')
    .select('*')
    .eq('job_id', id)
    .single();

  // Récupérer tous les candidats pour cette offre, triés par score
  const { data: candidates } = await supabase
    .from('candidates')
    .select('*')
    .eq('job_id', id)
    .order('score', { ascending: false });

  const totalCandidates = candidates?.length || 0;
  const avgScore = totalCandidates > 0 
    ? Math.round((candidates?.reduce((acc: number, c: any) => acc + (c.score || 0), 0) || 0) / totalCandidates)
    : 0;
  const topScore = candidates?.[0]?.score || 0;
  const qualified = candidates?.filter((c: any) => (c.score || 0) >= 60).length || 0;
  const questionsCount = quiz?.questions?.questions?.length || 0;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Hero Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Link href="/dashboard/recruiter" className="text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4 inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            Retour au dashboard
          </Link>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mt-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wide">Actif</span>
                <span className="text-xs text-gray-400">{new Date(job.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{job.title}</h1>
              <p className="text-gray-500 mt-2 max-w-2xl line-clamp-2">{job.description}</p>
            </div>
            
            <div className="flex gap-3 shrink-0">
              {quiz && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-violet-50 text-violet-700 text-sm font-medium border border-violet-100">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>
                  Quiz: {questionsCount} questions
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in-up">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Total Candidats</p>
            <p className="text-4xl font-black text-gray-900">{totalCandidates}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Score Moyen</p>
            <p className={`text-4xl font-black ${scoreColor(avgScore).text}`}>{avgScore}%</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Meilleur Score</p>
            <p className="text-4xl font-black text-violet-600">{topScore}%</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Qualifiés (≥60%)</p>
            <p className="text-4xl font-black text-green-600">{qualified}</p>
          </div>
        </div>

        {/* Classement des candidats */}
        <section className="animate-fade-in-up animation-delay-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Classement des Candidats</h2>
            <span className="text-sm text-gray-400 font-medium">{totalCandidates} candidat{totalCandidates > 1 ? 's' : ''}</span>
          </div>

          {totalCandidates === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">📭</div>
              <p className="text-gray-900 font-bold text-lg mb-1">Aucun candidat pour le moment</p>
              <p className="text-gray-500 text-sm">Les candidatures apparaîtront ici avec leur score IA.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <div className="col-span-1">#</div>
                <div className="col-span-3">Candidat</div>
                <div className="col-span-2">Email</div>
                <div className="col-span-2 text-center">Score IA</div>
                <div className="col-span-2 text-center">Rang</div>
                <div className="col-span-2 text-center">Date</div>
              </div>

              {/* Rows */}
              {candidates?.map((candidate: any, index: number) => {
                const sc = scoreColor(candidate.score || 0);
                const rank = getRank(candidate.score || 0);
                const isTop3 = index < 3;
                const medalEmoji = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '';

                return (
                  <Link
                    href={`/dashboard/recruiter/candidates/${candidate.id}`}
                    key={candidate.id}
                    className={`grid grid-cols-12 gap-4 px-6 py-5 items-center border-b border-gray-50 hover:bg-violet-50/50 transition-colors cursor-pointer ${isTop3 ? 'bg-gradient-to-r from-transparent' : ''}`}
                  >
                    {/* Rang */}
                    <div className="col-span-1">
                      <span className="text-sm font-bold text-gray-400">
                        {isTop3 ? medalEmoji : index + 1}
                      </span>
                    </div>

                    {/* Nom */}
                    <div className="col-span-3 flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${sc.badge}`}>
                        {candidate.name?.charAt(0)?.toUpperCase() || '?'}
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-gray-900 truncate">{candidate.name}</p>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="col-span-2">
                      <p className="text-sm text-gray-500 truncate">{candidate.email}</p>
                    </div>

                    {/* Score */}
                    <div className="col-span-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-20 bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div className={`h-full rounded-full ${sc.bar}`} style={{ width: `${candidate.score || 0}%` }}></div>
                        </div>
                        <span className={`text-sm font-black ${sc.text}`}>{candidate.score || 0}</span>
                      </div>
                    </div>

                    {/* Rang lettre */}
                    <div className="col-span-2 text-center">
                      <span className={`inline-block px-3 py-1 rounded-lg text-xs font-black ${sc.badge}`}>
                        {rank}
                      </span>
                    </div>

                    {/* Date */}
                    <div className="col-span-2 text-center">
                      <p className="text-xs text-gray-400">
                        {new Date(candidate.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' })}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Distribution des scores */}
        {totalCandidates > 0 && (
          <section className="animate-fade-in-up animation-delay-400">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Distribution des Scores</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <div className="grid grid-cols-4 gap-6">
                {[
                  { label: 'Excellent (75-100)', min: 75, max: 100, color: 'bg-green-500' },
                  { label: 'Bon (50-74)', min: 50, max: 74, color: 'bg-orange-500' },
                  { label: 'Moyen (25-49)', min: 25, max: 49, color: 'bg-yellow-500' },
                  { label: 'Faible (0-24)', min: 0, max: 24, color: 'bg-red-500' },
                ].map((bucket) => {
                  const count = candidates?.filter((c: any) => (c.score || 0) >= bucket.min && (c.score || 0) <= bucket.max).length || 0;
                  const pct = totalCandidates > 0 ? Math.round((count / totalCandidates) * 100) : 0;
                  return (
                    <div key={bucket.label} className="text-center">
                      <div className="relative mx-auto w-20 h-20 mb-3">
                        <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 36 36">
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none" stroke="#f3f4f6" strokeWidth="3" />
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none" stroke={bucket.color === 'bg-green-500' ? '#22c55e' : bucket.color === 'bg-orange-500' ? '#f97316' : bucket.color === 'bg-yellow-500' ? '#eab308' : '#ef4444'}
                            strokeWidth="3" strokeDasharray={`${pct}, 100`} strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-lg font-black text-gray-900">{count}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 font-medium">{bucket.label}</p>
                      <p className="text-lg font-bold text-gray-900">{pct}%</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Description complète */}
        <section className="animate-fade-in-up animation-delay-600">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Description du Poste</h2>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{job.description}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
