"use client";

import { useSearchParams } from 'next/navigation';
import { Github, AlertCircle } from 'lucide-react';

export default function SignInPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const handleGitHubLogin = () => {
    // Redirect to backend passport github route
    window.location.href = 'http://localhost:8000/auth/github';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0d1117] text-slate-100" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
      <div className="max-w-md w-full p-8 bg-[#161b22] border border-slate-800 rounded-xl shadow-2xl space-y-8">

        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">Connect GitHub</h1>
          <p className="text-sm text-slate-400">Link your GitHub account to CodeStreak to track your daily commits and progress.</p>
        </div>

        {error && (
          <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-1">Authentication Failed</p>
              <p className="opacity-80 leading-relaxed">
                {error === 'OAuthSignin'
                  ? 'There is a problem with the GitHub OAuth configuration. Please ensure your Client ID and Secret are correct in the environment variables.'
                  : error === 'AccessDenied'
                    ? 'You declined the authorization request. We need access to count your commits.'
                    : 'An unknown error occurred while trying to connect.'}
              </p>
            </div>
          </div>
        )}

        <button
          onClick={handleGitHubLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#2ea043] hover:bg-[#3fb950] text-white transition-colors rounded-lg shadow-sm font-medium"
        >
          <Github className="w-5 h-5" />
          Continue with GitHub
        </button>

        <div className="text-center">
          <a href="/profile" className="text-xs text-slate-500 hover:text-slate-300 underline underline-offset-2 transition-colors">
            Cancel and return to Profile
          </a>
        </div>
      </div>
    </div>
  );
}
