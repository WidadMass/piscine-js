import { createClient } from '@/lib/supabase-server';
import Link from 'next/link';

export const revalidate = 0;

function scoreColor(score: number) {
  if (score >= 75) return { text: 'text-green-500', bg: 'bg-green-500', badge: 'bg-green-100 text-green-700' };
  if (score >= 50) return { text: 'text-orange-500', bg: 'bg-orange-500', badge: 'bg-orange-100 text-orange-700' };
  return { text: 'text-red-500', bg: 'bg-red-500', badge: 'bg-red-100 text-red-700' };
}

function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { bg: string; label: string }> = {
    OK: { bg: 'bg-green-500', label: 'VALIDÉE' },
    PARTIEL: { bg: 'bg-orange-500', label: 'PARTIELLE' },
    ABSENT: { bg: 'bg-red-500', label: 'ABSENTE' },
  };
  const c = cfg[status] || cfg.ABSENT;
  return <span className={`${c.bg} text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md`}>{c.label}</span>;
}

function ScoreGauge({ score }: { score: number }) {
  const color = score >= 75 ? 'text-green-500' : score >= 50 ? 'text-orange-500' : 'text-red-500';
  const stroke = score >= 75 ? '#22c55e' : score >= 50 ? '#f97316' : '#ef4444';
  const circ = 2 * Math.PI * 54;
  const dash = circ - (score / 100) * circ;
  return (
    <div className="relative w-44 h-44">
      <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" strokeWidth="8" stroke="#e5e7eb" />
        <circle cx="60" cy="60" r="54" fill="none" strokeWidth="8" stroke={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={dash} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-5xl font-black ${color}`}>{score}</span>
        <span className="text-gray-400 text-xs font-semibold">/100</span>
      </div>
    </div>
  );
}

export default async function CandidateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: candidate } = await supabase
    .from('candidates')
    .select('*, jobs(title, description)')
    .eq('id', id)
    .single();

  if (!candidate) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Candidat introuvable</h1>
          <Link href="/dashboard/recruiter" className="text-violet-600 hover:underline">← Retour au dashboard</Link>
        </div>
      </div>
    );
  }

  const analysis = candidate.analysis_data;
  const sc = scoreColor(candidate.score || 0);
  const job = candidate.jobs;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <Link href={`/dashboard/recruiter/jobs/${candidate.job_id}`} className="text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4 inline-flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
            Retour au classement
          </Link>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mt-4">
            <div className="flex items-center gap-5">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black ${sc.badge}`}>
                {candidate.name?.charAt(0)?.toUpperCase() || '?'}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{candidate.name}</h1>
                <p className="text-gray-500">{candidate.email}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-gray-400">
                    Postulé le {new Date(candidate.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                  {job && (
                    <>
                      <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                      <span className="text-xs text-violet-600 font-medium">Pour : {job.title}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <ScoreGauge score={candidate.score || 0} />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">

        {/* Résumé + Stats */}
        {analysis ? (
          <>
            {/* Synthèse */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 animate-fade-in-up">
              <div className="flex items-start gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${(candidate.score || 0) >= 70 ? 'bg-green-50 text-green-500' : 'bg-orange-50 text-orange-500'}`}>
                  {(candidate.score || 0) >= 70 ? '✓' : '⚠'}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">Synthèse de l'analyse IA</h2>
                  <p className="text-gray-600 leading-relaxed">{analysis.summary}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-black text-green-600">{analysis.skills?.filter((s: any) => s.status === 'OK').length || 0}</p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">Compétences OK</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-black text-orange-600">{analysis.skills?.filter((s: any) => s.status === 'PARTIEL').length || 0}</p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">Partielles</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-black text-red-600">{analysis.skills?.filter((s: any) => s.status === 'ABSENT').length || 0}</p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">Absentes</p>
                </div>
              </div>
            </section>

            {/* Compétences */}
            {analysis.skills && analysis.skills.length > 0 && (
              <section className="animate-fade-in-up animation-delay-200">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-violet-500 rounded-full"></span>
                  Adéquation des compétences
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {analysis.skills.map((skill: any, i: number) => (
                    <div key={i} className={`bg-white border border-gray-100 shadow-sm border-l-4 ${
                      skill.status === 'OK' ? 'border-l-green-500' : skill.status === 'PARTIEL' ? 'border-l-orange-500' : 'border-l-red-500'
                    } rounded-xl p-5 hover:shadow-md transition-shadow`}>
                      <div className="flex justify-between items-start gap-3 mb-2">
                        <h4 className="font-bold text-gray-900 text-sm leading-tight">{skill.name}</h4>
                        <StatusBadge status={skill.status} />
                      </div>
                      <p className="text-gray-500 text-xs leading-relaxed">{skill.comment}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Expérience */}
            {analysis.experience && (
              <section className="animate-fade-in-up animation-delay-400">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-violet-500 rounded-full"></span>
                  Expérience
                </h2>
                <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="grid grid-cols-2 divide-x divide-gray-100">
                    <div className="p-6">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Requis</p>
                      <p className="text-2xl font-black text-gray-900">{analysis.experience.required}</p>
                    </div>
                    <div className="p-6">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Candidat</p>
                      <p className="text-2xl font-black text-gray-900">{analysis.experience.candidate}</p>
                    </div>
                  </div>
                  {analysis.experience.observations?.length > 0 && (
                    <div className="border-t border-gray-100 p-6 space-y-3">
                      {analysis.experience.observations.map((obs: any, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className={`mt-1 w-2.5 h-2.5 rounded-full shrink-0 ${obs.type === 'positive' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                          <p className={`text-sm ${obs.type === 'positive' ? 'text-gray-700' : 'text-gray-500'}`}>{obs.text}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Points forts / faibles */}
            {(analysis.strengths?.length > 0 || analysis.weaknesses?.length > 0) && (
              <section className="animate-fade-in-up animation-delay-600">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
                    <h3 className="text-green-600 font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                      Points forts
                    </h3>
                    <div className="space-y-3">
                      {(analysis.strengths || []).map((s: string, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span>
                          <p className="text-gray-700 text-sm">{s}</p>
                        </div>
                      ))}
                      {(!analysis.strengths || analysis.strengths.length === 0) && (
                        <p className="text-gray-400 text-sm italic">Aucun point fort identifié.</p>
                      )}
                    </div>
                  </div>
                  <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
                    <h3 className="text-red-600 font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                      Points faibles
                    </h3>
                    <div className="space-y-3">
                      {(analysis.weaknesses || []).map((w: string, i: number) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span>
                          <p className="text-gray-700 text-sm">{w}</p>
                        </div>
                      ))}
                      {(!analysis.weaknesses || analysis.weaknesses.length === 0) && (
                        <p className="text-gray-400 text-sm italic">Aucun point faible identifié.</p>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🤷</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Analyse non disponible</h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Ce candidat a postulé avant l'activation de l'analyse détaillée. Seul le score global ({candidate.score || 0}/100) est disponible.
            </p>
          </section>
        )}

        {/* Texte brut du CV */}
        {candidate.resume_text && candidate.resume_text.length > 20 && (
          <section className="animate-fade-in-up animation-delay-600">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-gray-400 rounded-full"></span>
              Texte brut du CV
            </h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
              <pre className="text-gray-600 text-xs leading-relaxed whitespace-pre-wrap font-mono max-h-96 overflow-y-auto">
                {candidate.resume_text}
              </pre>
            </div>
          </section>
        )}

        <div className="text-center pt-4 pb-8">
          <Link href={`/dashboard/recruiter/jobs/${candidate.job_id}`} className="inline-block bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-colors shadow-lg">
            ← Retour au classement
          </Link>
        </div>
      </div>
    </div>
  );
}
