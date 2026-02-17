'use client'

import { createClient } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CandidateDashboard() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
        const supabase = createClient();
        const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
        if (data) setJobs(data);
        setLoading(false);
    }
    fetchJobs();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-violet-200 border-t-violet-600"></div>
        <p className="text-gray-500 font-medium">Chargement des offres...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        
        <header className="text-center max-w-2xl mx-auto animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900 tracking-tight">
              Trouvez votre prochain <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">défi.</span>
            </h1>
            <p className="text-gray-500 text-lg">
              Explorez les opportunités et laissez notre IA mettre en avant votre potentiel unique.
            </p>
        </header>

        {jobs.length === 0 ? (
          <div className="col-span-full py-20 text-center bg-white rounded-3xl shadow-sm border border-gray-100 animate-fade-in-up animation-delay-200">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">🔍</div>
              <p className="text-gray-900 font-bold text-xl mb-2">Aucune offre disponible</p>
              <p className="text-gray-500">Nos recruteurs préparent de nouvelles opportunités.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up animation-delay-200">
              {jobs.map((job, index) => (
                  <div 
                    key={job.id} 
                    className="group bg-white p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col justify-between h-full hover:-translate-y-2 duration-300"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                      <div>
                          <div className="flex justify-between items-start mb-4">
                             <span className="inline-block px-3 py-1 bg-violet-50 text-violet-700 text-[10px] font-bold uppercase tracking-wider rounded-full">
                                CDI / Full-time
                             </span>
                             <span className="text-xs text-gray-400 font-medium">{new Date(job.created_at).toLocaleDateString()}</span>
                          </div>
                          <h2 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-violet-700 transition-colors lineHeight-snug">{job.title}</h2>
                          <div className="w-12 h-1 bg-gray-100 rounded-full mb-4 group-hover:bg-violet-200 transition-colors"></div>
                          <p className="text-gray-500 mb-8 line-clamp-3 text-sm leading-relaxed">{job.description}</p>
                      </div>
                      
                      <Link 
                          href={`/dashboard/candidate/${job.id}`}
                          className="w-full text-center bg-gray-900 text-white px-6 py-4 rounded-xl hover:bg-violet-600 font-bold transition-all shadow-lg hover:shadow-violet-500/30 flex items-center justify-center gap-2 group-hover:gap-3"
                      >
                          <span>Postuler avec l'IA</span>
                          <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                      </Link>
                  </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
