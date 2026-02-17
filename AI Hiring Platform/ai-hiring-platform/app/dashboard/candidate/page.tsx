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
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Offres disponibles</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map(job => (
                <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col justify-between h-full">
                    <div>
                        <h2 className="text-xl font-bold mb-2 text-gray-800">{job.title}</h2>
                        <p className="text-gray-600 mb-6 line-clamp-3 text-sm">{job.description}</p>
                    </div>
                    <Link 
                        href={`/dashboard/candidate/${job.id}`}
                        className="w-full text-center bg-violet-600 text-white px-4 py-3 rounded-lg hover:bg-violet-700 font-medium transition-colors"
                    >
                        Postuler & Analyser CV
                    </Link>
                </div>
            ))}
            
            {jobs.length === 0 && (
                <div className="col-span-full py-20 text-center">
                    <p className="text-gray-500 text-lg">Aucune offre disponible pour le moment.</p>
                    <p className="text-gray-400 text-sm mt-2">Revenez plus tard !</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
