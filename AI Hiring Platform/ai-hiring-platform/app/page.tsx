import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50 relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-fuchsia-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-violet-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <main className="text-center w-full max-w-4xl z-10">
        <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/50 border border-gray-200 backdrop-blur-sm text-sm font-medium text-gray-600 shadow-sm animate-fade-in-up">
           <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
           Now powered by Grok AI 2.0
        </div>

        <h1 className="text-6xl font-extrabold mb-6 tracking-tight leading-tight animate-fade-in-up md:text-7xl">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">Recruit smarter,</span><br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">with AI.</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
          Transformez votre processus de recrutement. Créez des tests techniques sur mesure en un clic et analysez les candidats instantanément avec notre IA avancée.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
          <Link 
            href="/dashboard/recruiter"
            className="group relative overflow-hidden bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-violet-200 hover:-translate-y-1 block text-left"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-24 h-24 text-violet-600 transform group-hover:rotate-12 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform duration-300">
                👔
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-violet-700 transition-colors">Espace Recruteur</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">Générez des offres, créez des quiz IA et suivez vos candidats.</p>
              <div className="flex items-center text-violet-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Accéder au Dashboard <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
            </div>
          </Link>

          <Link 
            href="/dashboard/candidate"
            className="group relative overflow-hidden bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-fuchsia-200 hover:-translate-y-1 block text-left"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
               <svg className="w-24 h-24 text-fuchsia-600 transform group-hover:-rotate-12 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 bg-fuchsia-100 rounded-xl flex items-center justify-center mb-4 text-2xl group-hover:scale-110 transition-transform duration-300">
                👋
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-fuchsia-700 transition-colors">Espace Candidat</h3>
              <p className="text-gray-500 text-sm mb-4 line-clamp-2">Parcourez les offres, postulez et recevez un feedback immédiat.</p>
              <div className="flex items-center text-fuchsia-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                Voir les offres <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              </div>
            </div>
          </Link>
        </div>
      </main>
      
      <footer className="mt-20 text-gray-400 text-sm font-medium animate-fade-in-up animation-delay-600">
        <div className="flex items-center space-x-4">
          <span>© 2026 AI Hiring Platform</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>Terms</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span>Privacy</span>
        </div>
      </footer>
    </div>
  );
}
