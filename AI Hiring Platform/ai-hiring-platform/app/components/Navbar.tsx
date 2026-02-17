'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  
  // Don't show navbar on landing page
  if (pathname === '/') return null;

  const isRecruiter = pathname.startsWith('/dashboard/recruiter');
  const isCandidate = pathname.startsWith('/dashboard/candidate');

  return (
    <nav className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:shadow-violet-500/40 transition-shadow">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="font-bold text-gray-900 text-sm tracking-tight">AI Hiring <span className="text-violet-600">Platform</span></span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {isRecruiter && (
              <>
                <Link href="/dashboard/recruiter" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/dashboard/recruiter' ? 'bg-violet-50 text-violet-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                  Dashboard
                </Link>
                <Link href="/dashboard/recruiter/create-job" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/dashboard/recruiter/create-job' ? 'bg-violet-50 text-violet-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                  Nouvelle Offre
                </Link>
              </>
            )}
            {isCandidate && (
              <>
                <Link href="/dashboard/candidate" className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${pathname === '/dashboard/candidate' ? 'bg-fuchsia-50 text-fuchsia-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`}>
                  Offres
                </Link>
              </>
            )}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isRecruiter && (
              <Link href="/dashboard/candidate" className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors px-3 py-1.5 rounded-full border border-gray-200 hover:border-gray-300">
                Vue Candidat →
              </Link>
            )}
            {isCandidate && (
              <Link href="/dashboard/recruiter" className="text-xs font-medium text-gray-500 hover:text-gray-900 transition-colors px-3 py-1.5 rounded-full border border-gray-200 hover:border-gray-300">
                Vue Recruteur →
              </Link>
            )}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
              U
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
