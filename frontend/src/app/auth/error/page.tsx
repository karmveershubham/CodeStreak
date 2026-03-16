"use client";

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d1117] text-white" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
      <div className="max-w-md w-full p-8 bg-[#161b22] border border-slate-800 rounded-xl shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          
          <h1 className="text-2xl font-bold tracking-tight text-red-400">Authentication Error</h1>
          
          <p className="text-slate-400 text-sm leading-relaxed">
            {error === 'Configuration' 
              ? "There is a problem with the server configuration. Please ensure your GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET are set correctly in your environment variables." 
              : error === 'AccessDenied'
              ? "Access was denied. You must authorize the application to connect your account."
              : "An unknown authentication error occurred. Please try again or contact support."}
          </p>
          
          <div className="pt-4">
              <Link 
                href="/profile" 
                className="inline-flex items-center justify-center px-4 py-2 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 hover:text-emerald-300 border border-emerald-500/20 rounded-lg transition-colors text-sm font-medium w-full"
              >
                Return to Dashboard
              </Link>
          </div>
      </div>
    </div>
  );
}
