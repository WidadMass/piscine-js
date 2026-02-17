'use client'

import { useState, use, useEffect } from 'react';
import { submitApplication } from '@/app/actions/submit-application';
import { evaluateQuiz } from '@/app/actions/evaluate-quiz';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';

// ==================== TYPES ====================
interface Skill {
  name: string;
  status: 'OK' | 'PARTIEL' | 'ABSENT';
  comment: string;
}
interface ExperienceObservation { text: string; type: 'positive' | 'negative'; }
interface AdvancedAnalysis {
  skills: Skill[];
  experience: { required: string; candidate: string; observations: ExperienceObservation[] } | null;
  strengths: string[];
  weaknesses: string[];
}
interface AIResult {
  score: number;
  analysis: string;
  advancedAnalysis?: AdvancedAnalysis;
  candidateId?: string;
}
interface QuizQuestion {
  id: number;
  text: string;
  type: 'multiple_choice' | 'open';
  options?: string[];
  correctAnswer: string;
}
interface QuizResult {
  quizScore: number;
  cvScore: number;
  combinedScore: number;
  mcqResults: any[];
  openResults: any[];
  mcqCorrect: number;
  mcqTotal: number;
  openScore: number | null;
}

// ==================== COMPOSANTS UI ====================
function StatusBadge({ status }: { status: string }) {
  const cfg: Record<string, { bg: string; label: string }> = {
    OK: { bg: 'bg-green-500', label: 'OK' },
    PARTIEL: { bg: 'bg-orange-500', label: 'PARTIEL' },
    ABSENT: { bg: 'bg-red-500', label: 'ABSENT' },
  };
  const c = cfg[status] || cfg.ABSENT;
  return <span className={`${c.bg} text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md`}>{c.label}</span>;
}

function SkillCard({ skill }: { skill: Skill }) {
  const border: Record<string, string> = { OK: 'border-l-green-500', PARTIEL: 'border-l-orange-500', ABSENT: 'border-l-red-500' };
  return (
    <div className={`bg-gray-800/50 border border-gray-700/50 border-l-4 ${border[skill.status] || 'border-l-red-500'} rounded-xl p-5 hover:bg-gray-800/80 transition-colors`}>
      <div className="flex justify-between items-start gap-3 mb-2">
        <h4 className="font-bold text-white text-sm leading-tight">{skill.name}</h4>
        <StatusBadge status={skill.status} />
      </div>
      <p className="text-gray-400 text-xs leading-relaxed">{skill.comment}</p>
    </div>
  );
}

function ScoreGauge({ score, size = 'lg' }: { score: number; size?: 'sm' | 'lg' }) {
  const color = score >= 75 ? 'text-green-400' : score >= 50 ? 'text-orange-400' : 'text-red-400';
  const strokeColor = score >= 75 ? 'stroke-green-400' : score >= 50 ? 'stroke-orange-400' : 'stroke-red-400';
  const circ = 2 * Math.PI * 54;
  const dash = circ - (score / 100) * circ;
  const dim = size === 'sm' ? 'w-24 h-24' : 'w-40 h-40';
  const textSize = size === 'sm' ? 'text-2xl' : 'text-4xl';
  return (
    <div className={`relative ${dim}`}>
      <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" fill="none" strokeWidth="8" className="stroke-gray-700/50" />
        <circle cx="60" cy="60" r="54" fill="none" strokeWidth="8" className={strokeColor} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={dash} style={{ transition: 'stroke-dashoffset 1s ease-out' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`${textSize} font-black ${color}`}>{score}</span>
        <span className="text-gray-500 text-xs font-semibold">/100</span>
      </div>
    </div>
  );
}

function StepIndicator({ current }: { current: number }) {
  const steps = [
    { num: 1, label: 'CV & Profil' },
    { num: 2, label: 'Quiz Technique' },
    { num: 3, label: 'Résultats' },
  ];
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            current === step.num ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30' :
            current > step.num ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'
          }`}>
            {current > step.num ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
            ) : (
              <span className="font-bold">{step.num}</span>
            )}
            <span className="hidden md:inline">{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`w-12 h-0.5 mx-1 rounded ${current > step.num ? 'bg-green-300' : 'bg-gray-200'}`}></div>
          )}
        </div>
      ))}
    </div>
  );
}

// ==================== PAGE PRINCIPALE ====================
export default function ApplyPage({ params }: { params: Promise<{ jobId: string }> }) {
  const { jobId } = use(params);
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [aiResult, setAiResult] = useState<AIResult | null>(null);
  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [jobDesc, setJobDesc] = useState('');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [quizLoading, setQuizLoading] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  useEffect(() => {
    async function loadQuiz() {
      const supabase = createClient();
      const { data } = await supabase.from('quizzes').select('questions').eq('job_id', jobId).single();
      if (data?.questions?.questions) setQuiz(data.questions.questions);
      const { data: job } = await supabase.from('jobs').select('description').eq('id', jobId).single();
      if (job?.description) setJobDesc(job.description);
    }
    loadQuiz();
  }, [jobId]);

  async function handleSubmitCV(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    formData.append('jobId', jobId);
    try {
      const result = await submitApplication(formData);
      if (result.success) {
        setAiResult({ score: result.score, analysis: result.analysis, advancedAnalysis: result.advancedAnalysis, candidateId: result.candidateId });
        setStep(quiz.length > 0 ? 2 : 3);
      }
    } catch (error: any) {
      alert(`Erreur : ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  function selectAnswer(questionId: number, answer: string) {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  }

  async function handleSubmitQuiz() {
    if (!aiResult?.candidateId) return;
    setQuizLoading(true);
    try {
      const quizAnswers = quiz.map(q => ({
        questionId: q.id, questionText: q.text, type: q.type,
        userAnswer: answers[q.id] || '', correctAnswer: q.correctAnswer
      }));
      const result = await evaluateQuiz(aiResult.candidateId, jobDesc, quizAnswers);
      if (result.success) setQuizResult(result as QuizResult);
      setStep(3);
    } catch (error: any) {
      alert(`Erreur évaluation : ${error.message}`);
    } finally {
      setQuizLoading(false);
    }
  }

  const answeredCount = Object.keys(answers).length;
  const isQuizComplete = answeredCount === quiz.length;

  // ===================================================================
  // STEP 3 : RÉSULTATS COMBINÉS
  // ===================================================================
  if (step === 3 && aiResult) {
    const adv = aiResult.advancedAnalysis;
    const finalScore = quizResult?.combinedScore ?? aiResult.score;
    const hasQuiz = quizResult !== null;

    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <div className="bg-gray-900 border-b border-gray-800">
          <div className="max-w-6xl mx-auto px-6 py-6">
            <StepIndicator current={3} />
            <div className="flex justify-between items-center">
              <div>
                <Link href="/dashboard/candidate" className="text-gray-500 hover:text-white text-sm transition-colors mb-2 inline-block">← Retour aux offres</Link>
                <h1 className="text-2xl font-bold">Résultat Complet</h1>
              </div>
              <ScoreGauge score={finalScore} />
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-10 space-y-10">
          
          {hasQuiz && (
            <section className="animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Score CV (40%)</p>
                  <ScoreGauge score={quizResult.cvScore} size="sm" />
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 text-center">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Score Quiz (60%)</p>
                  <ScoreGauge score={quizResult.quizScore} size="sm" />
                </div>
                <div className="bg-violet-900/30 border border-violet-700/50 rounded-2xl p-6 text-center">
                  <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-2">Score Final</p>
                  <ScoreGauge score={quizResult.combinedScore} size="sm" />
                </div>
              </div>
            </section>
          )}

          {hasQuiz && (
            <section className="animate-fade-in-up animation-delay-200">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-fuchsia-500 rounded-full"></span>
                Résultats du Quiz
              </h2>
              <div className="space-y-4">
                {quizResult.mcqResults.map((r: any, i: number) => (
                  <div key={`mcq-${i}`} className={`bg-gray-900/50 border rounded-xl p-5 ${r.isCorrect ? 'border-green-700/50' : 'border-red-700/50'}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">QCM</p>
                        <p className="text-white font-medium text-sm mb-2">{r.questionText}</p>
                        <p className="text-sm"><span className="text-gray-500">Votre réponse : </span><span className={r.isCorrect ? 'text-green-400 font-medium' : 'text-red-400 font-medium'}>{r.userAnswer}</span></p>
                        {!r.isCorrect && <p className="text-sm mt-1"><span className="text-gray-500">Bonne réponse : </span><span className="text-green-400 font-medium">{r.correctAnswer}</span></p>}
                      </div>
                      <span className={`text-2xl ${r.isCorrect ? 'text-green-400' : 'text-red-400'}`}>{r.isCorrect ? '✓' : '✗'}</span>
                    </div>
                  </div>
                ))}
                {quizResult.openResults.map((r: any, i: number) => (
                  <div key={`open-${i}`} className="bg-gray-900/50 border border-gray-700/50 rounded-xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Question Ouverte</p>
                        <p className="text-white font-medium text-sm">{r.questionText}</p>
                      </div>
                      <span className={`text-lg font-black px-3 py-1 rounded-lg ${r.score >= 7 ? 'bg-green-500/20 text-green-400' : r.score >= 4 ? 'bg-orange-500/20 text-orange-400' : 'bg-red-500/20 text-red-400'}`}>{r.score}/{r.maxScore}</span>
                    </div>
                    <p className="text-gray-400 text-xs mb-2"><span className="text-gray-500 font-semibold">Votre réponse :</span> {r.userAnswer}</p>
                    <p className="text-violet-300 text-xs italic bg-violet-500/10 p-3 rounded-lg">{r.feedback}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 animate-fade-in-up animation-delay-200">
            <div className="flex items-start gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 ${finalScore >= 70 ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'}`}>
                {finalScore >= 70 ? '✓' : '⚠'}
              </div>
              <div>
                <h2 className="text-xl font-bold mb-1">Synthèse Analyse CV</h2>
                <p className="text-gray-400 leading-relaxed">{aiResult.analysis}</p>
              </div>
            </div>
            {adv && (
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-black text-green-400">{adv.skills.filter(s => s.status === 'OK').length}</p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">Compétences OK</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-black text-orange-400">{adv.skills.filter(s => s.status === 'PARTIEL').length}</p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">Partielles</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 text-center">
                  <p className="text-3xl font-black text-red-400">{adv.skills.filter(s => s.status === 'ABSENT').length}</p>
                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mt-1">Absentes</p>
                </div>
              </div>
            )}
          </section>

          {adv && adv.skills.length > 0 && (
            <section className="animate-fade-in-up animation-delay-400">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-3"><span className="w-1.5 h-6 bg-violet-500 rounded-full"></span>Adéquation des compétences</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {adv.skills.map((skill, i) => <SkillCard key={i} skill={skill} />)}
              </div>
            </section>
          )}

          {adv?.experience && (
            <section className="animate-fade-in-up animation-delay-400">
              <h2 className="text-lg font-bold mb-6 flex items-center gap-3"><span className="w-1.5 h-6 bg-violet-500 rounded-full"></span>Expérience</h2>
              <div className="bg-gray-900/50 border border-gray-800 rounded-2xl overflow-hidden">
                <div className="grid grid-cols-2 divide-x divide-gray-800">
                  <div className="p-6"><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Requis</p><p className="text-2xl font-black text-white">{adv.experience.required}</p></div>
                  <div className="p-6"><p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Candidat</p><p className="text-2xl font-black text-white">{adv.experience.candidate}</p></div>
                </div>
                {adv.experience.observations?.length > 0 && (
                  <div className="border-t border-gray-800 p-6 space-y-3">
                    {adv.experience.observations.map((obs, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span className={`mt-1 w-2 h-2 rounded-full shrink-0 ${obs.type === 'positive' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        <p className={`text-sm ${obs.type === 'positive' ? 'text-gray-300' : 'text-gray-400'}`}>{obs.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {adv && (adv.strengths.length > 0 || adv.weaknesses.length > 0) && (
            <section className="animate-fade-in-up animation-delay-600">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-green-400 font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                    Points forts
                  </h3>
                  <div className="space-y-3">{adv.strengths.map((s, i) => (
                    <div key={i} className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0"></span><p className="text-gray-300 text-sm">{s}</p></div>
                  ))}</div>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                  <h3 className="text-red-400 font-bold text-sm uppercase tracking-wider mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path></svg>
                    Points faibles
                  </h3>
                  <div className="space-y-3">{adv.weaknesses.map((w, i) => (
                    <div key={i} className="flex items-start gap-3"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"></span><p className="text-gray-300 text-sm">{w}</p></div>
                  ))}</div>
                </div>
              </div>
            </section>
          )}

          <div className="text-center pt-4 pb-8">
            <Link href="/dashboard/candidate" className="inline-block bg-white text-gray-900 px-10 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-lg">Retourner aux offres</Link>
          </div>
        </div>
      </div>
    );
  }

  // ===================================================================
  // STEP 2 : QUIZ INTERACTIF
  // ===================================================================
  if (step === 2 && quiz.length > 0) {
    const question = quiz[currentQ];
    const progress = ((currentQ + 1) / quiz.length) * 100;

    return (
      <div className="min-h-screen bg-gray-950 text-white">
        <div className="bg-gray-900 border-b border-gray-800">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <StepIndicator current={2} />
            <div className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-2xl font-bold">Quiz Technique</h1>
                <p className="text-gray-400 text-sm mt-1">Répondez aux questions pour compléter votre évaluation</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-black text-violet-400">{answeredCount}<span className="text-gray-600 text-lg">/{quiz.length}</span></p>
                <p className="text-xs text-gray-500 font-medium">répondu{answeredCount > 1 ? 'es' : ''}</p>
              </div>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
              <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-full rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 py-10">
          <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 mb-8 animate-fade-in-up">
            <div className="flex items-start justify-between mb-6">
              <span className={`text-xs px-3 py-1 rounded-full font-bold ${question.type === 'multiple_choice' ? 'bg-violet-500/20 text-violet-400' : 'bg-fuchsia-500/20 text-fuchsia-400'}`}>
                {question.type === 'multiple_choice' ? 'Choix Multiple' : 'Question Ouverte'}
              </span>
              <span className="text-sm font-bold text-gray-500">Question {currentQ + 1}/{quiz.length}</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-8 leading-relaxed">{question.text}</h2>

            {question.type === 'multiple_choice' && question.options ? (
              <div className="space-y-3">
                {question.options.map((opt, idx) => (
                  <button key={idx} onClick={() => selectAnswer(question.id, opt)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all ${answers[question.id] === opt ? 'border-violet-500 bg-violet-500/10 text-white' : 'border-gray-700 bg-gray-800/30 text-gray-300 hover:border-gray-600 hover:bg-gray-800/50'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 ${answers[question.id] === opt ? 'border-violet-500 bg-violet-500' : 'border-gray-600'}`}>
                        {answers[question.id] === opt && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                      </div>
                      <span className="font-medium">{opt}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <textarea value={answers[question.id] || ''} onChange={(e) => selectAnswer(question.id, e.target.value)}
                className="w-full h-40 bg-gray-800/50 border border-gray-700 rounded-xl p-4 text-white placeholder-gray-500 focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none resize-none transition-all"
                placeholder="Rédigez votre réponse ici..." />
            )}
          </div>

          <div className="flex items-center justify-between">
            <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0}
              className="px-6 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white border border-gray-700 hover:border-gray-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed">← Précédente</button>
            <div className="flex gap-2">
              {quiz.map((_, i) => (
                <button key={i} onClick={() => setCurrentQ(i)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-all ${i === currentQ ? 'bg-violet-600 text-white scale-110' : answers[quiz[i].id] !== undefined ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-800 text-gray-500 border border-gray-700'}`}>{i + 1}</button>
              ))}
            </div>
            {currentQ < quiz.length - 1 ? (
              <button onClick={() => setCurrentQ(currentQ + 1)} className="px-6 py-3 rounded-xl text-sm font-medium bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 transition-colors">Suivante →</button>
            ) : (
              <button onClick={handleSubmitQuiz} disabled={!isQuizComplete || quizLoading}
                className="px-8 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
                {quizLoading ? (
                  <><svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Évaluation...</>
                ) : 'Terminer le Quiz'}
              </button>
            )}
          </div>
          {!isQuizComplete && <p className="text-center text-gray-500 text-sm mt-8">Répondez à toutes les questions pour pouvoir soumettre. <span className="text-violet-400 font-medium">{quiz.length - answeredCount} restante{quiz.length - answeredCount > 1 ? 's' : ''}</span></p>}
        </div>
      </div>
    );
  }

  // ===================================================================
  // STEP 1 : FORMULAIRE CV
  // ===================================================================
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <StepIndicator current={1} />
      </div>
      <div className="min-h-[calc(100vh-120px)] flex flex-col md:flex-row">
        <div className="md:w-1/2 bg-gray-900 p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-violet-600/30 rounded-full mix-blend-screen filter blur-[80px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/30 rounded-full mix-blend-screen filter blur-[80px]"></div>
          <div className="relative z-10">
            <Link href="/dashboard/candidate" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-12">← Retour</Link>
            <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">Analysez votre profil <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">instantanément.</span></h1>
            <p className="opacity-80 text-xl leading-relaxed max-w-md">Notre IA analyse votre CV, puis vous passez un quiz technique pour un scoring complet et objectif.</p>
          </div>
          <div className="relative z-10 space-y-4 opacity-70 mt-12">
            <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">📄</div><p>Étape 1 : Analyse IA de votre CV</p></div>
            <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">🧠</div><p>Étape 2 : Quiz technique personnalisé</p></div>
            <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">📊</div><p>Étape 3 : Score combiné CV + Quiz</p></div>
          </div>
        </div>
        <div className="md:w-1/2 bg-white flex items-center justify-center p-8 md:p-12">
          <div className="w-full max-w-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Postuler à l'offre</h2>
            <p className="text-gray-500 mb-8">{quiz.length > 0 ? `Votre CV sera analysé, puis vous passerez un quiz de ${quiz.length} questions.` : 'Votre CV sera analysé par notre IA pour évaluer votre profil.'}</p>
            <form onSubmit={handleSubmitCV} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Nom complet</label>
                <input name="name" required type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:bg-white outline-none text-gray-900 transition-all font-medium" placeholder="Votre Prénom et Nom" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email professionnel</label>
                <input name="email" required type="email" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-500 focus:bg-white outline-none text-gray-900 transition-all font-medium" placeholder="vous@exemple.com" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">CV (PDF)</label>
                <div className={`relative group border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer overflow-hidden ${fileName ? 'border-violet-500 bg-violet-50' : 'border-gray-300 hover:border-violet-400 hover:bg-gray-50'}`}>
                  <input name="resume" required type="file" accept=".pdf" onChange={(e) => setFileName(e.target.files?.[0]?.name || null)} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                  <div className="relative z-10 flex flex-col items-center pointer-events-none">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${fileName ? 'bg-violet-100 text-violet-600' : 'bg-gray-100 text-gray-400'}`}>
                      {fileName ? <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      : <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>}
                    </div>
                    {fileName ? <><p className="text-sm font-bold text-violet-900 break-all px-4">{fileName}</p><p className="text-xs text-violet-500 mt-1">Cliquez pour changer</p></>
                    : <><p className="text-sm font-bold text-gray-700">Cliquez pour uploader</p><p className="text-xs text-gray-400 mt-1">PDF uniquement (max 5MB)</p></>}
                  </div>
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-gray-900 hover:bg-black text-white font-bold py-4 px-6 rounded-xl transition-all hover:scale-[1.02] shadow-xl flex items-center justify-center disabled:opacity-50 disabled:scale-100 mt-6">
                {loading ? (
                  <><svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>Analyse IA en cours...</>
                ) : quiz.length > 0 ? 'Analyser mon CV & Passer au Quiz' : 'Lancer l\'analyse & Postuler'}
              </button>
            </form>
            <p className="text-xs text-center text-gray-400 mt-6">En postulant, vous acceptez que votre CV soit traité par notre IA.</p>
          </div>
        </div>
      </div>
    </div>
  );
}