import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-50">
      <main className="text-center max-w-2xl bg-white p-12 rounded-2xl shadow-xl">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-fuchsia-600">
          AI Hiring Platform
        </h1>
        <p className="text-gray-600 mb-8 text-lg">
          La plateforme de recrutement intelligente.<br/>Créez des tests techniques sur mesure et analysez les candidats automatiquement.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <Link 
            href="/dashboard/recruiter"
            className="group flex flex-col items-center p-6 border-2 border-transparent hover:border-violet-100 bg-violet-50 rounded-xl transition-all hover:bg-violet-100 hover:scale-[1.02] cursor-pointer"
          >
            <span className="text-4xl mb-3">👔</span>
            <span className="font-bold text-violet-900 text-lg group-hover:text-violet-700">Je suis Recruteur</span>
            <span className="text-sm text-violet-600 mt-1 opacity-80">Créer des offres & voir les candidats</span>
          </Link>

          <Link 
            href="/dashboard/candidate"
            className="group flex flex-col items-center p-6 border-2 border-transparent hover:border-fuchsia-100 bg-fuchsia-50 rounded-xl transition-all hover:bg-fuchsia-100 hover:scale-[1.02] cursor-pointer"
          >
            <span className="text-4xl mb-3">👋</span>
            <span className="font-bold text-fuchsia-900 text-lg group-hover:text-fuchsia-700">Je suis Candidat</span>
            <span className="text-sm text-fuchsia-600 mt-1 opacity-80">Voir les offres & postuler</span>
          </Link>
        </div>
      </main>
      
      <footer className="mt-12 text-gray-400 text-sm font-medium">
        Atelier Piscine JS — AI Hiring Platform
      </footer>
    </div>
  );
}
