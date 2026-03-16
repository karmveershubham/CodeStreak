"use client";

import { useEffect, useState } from "react";
import { Github, Loader2, CheckCircle2 } from "lucide-react";

export default function GithubConnect() {
  const [isLinking, setIsLinking] = useState(false);
  const [linked, setLinked] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is linked by fetching profile from the backend
    const checkLinkedStatus = async () => {
      try {
        const localTokenStr = localStorage.getItem("token") || 
                              document.cookie.split('; ').find(row => row.startsWith('access_token='))?.split('=')[1];
                              
        if (!localTokenStr) return;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/user/profile`, {
          headers: {
            "Authorization": `Bearer ${localTokenStr}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          if (data.user?.githubUsername) {
            setLinked(true);
            setUsername(data.user.githubUsername);
          }
        }
      } catch (error) {
        console.error("Error checking GitHub account status:", error);
      }
    };

    checkLinkedStatus();
  }, []);

  const handleConnect = () => {
    // Redirect to backend passport github route
    window.location.href = 'http://localhost:8000/auth/github';
  };

  const handleDisconnect = async () => {
     // TODO: Implement disconnect logic on backend if needed
     console.log("Disconnecting GitHub...");
  };

  if (isLinking) {
    return (
      <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-md opacity-70 cursor-not-allowed">
        <Loader2 className="w-4 h-4 animate-spin" />
        Connecting GitHub...
      </button>
    );
  }

  if (linked) {
    return (
        <div className="flex items-center gap-3 px-4 py-2 bg-green-50 text-green-700 border border-green-200 rounded-md">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <div className="flex flex-col">
               <span className="font-semibold text-sm">GitHub Connected</span>
               <span className="text-xs opacity-80">@{username || "Linked"}</span>
            </div>
            <button 
              onClick={handleDisconnect}
              className="ml-auto text-xs underline opacity-70 hover:opacity-100"
            >
              Disconnect
            </button>
        </div>
    );
  }

  return (
    <button
      onClick={handleConnect}
      className="flex items-center gap-2 px-4 py-2 bg-[#24292e] hover:bg-[#2f363d] text-white transition-colors rounded-md shadow-sm font-medium"
    >
      <Github className="w-5 h-5" />
      Connect GitHub
    </button>
  );
}
