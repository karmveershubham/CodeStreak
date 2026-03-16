"use client";

import React, { useEffect, useState } from 'react';
import GithubConnect from '@/components/GithubConnect';
import { ActivityCalendar } from 'react-activity-calendar';
import { Loader2, GitCommit, Flame, Trophy, RefreshCw, Github } from 'lucide-react';

const theme = {
    light: ['#1a1f2e', '#0e3320', '#0d5c35', '#1a8a4a', '#22c55e'],
    dark: ['#1a1f2e', '#0e3320', '#0d5c35', '#1a8a4a', '#22c55e'],
};

const ProfilePage = () => {
    const [profileData, setProfileData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [githubSyncing, setGithubSyncing] = useState(false);

    useEffect(() => {
        const mockFetchData = () => {
            setTimeout(() => {
                setProfileData({
                    name: "User",
                    dailyCommitCount: 0,
                    githubUsername: null,
                    activity: generateMockActivity(),
                });
                setLoading(false);
            }, 1000);
        };
        mockFetchData();
    }, []);

    const handleManualSync = async () => {
        setGithubSyncing(true);
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/api/user/github/sync`,
                { method: 'POST' }
            );
            if (response.ok) {
                const data = await response.json();
                setProfileData((prev: any) => ({ ...prev, dailyCommitCount: data.dailyCommitCount }));
            }
        } catch (error) {
            console.error("Error syncing GitHub:", error);
        } finally {
            setGithubSyncing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#0d1117]">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
                    <span className="text-sm text-slate-500 tracking-widest uppercase font-mono">Loading profile</span>
                </div>
            </div>
        );
    }

    const stats = [
        {
            label: 'Commits Today',
            value: profileData.dailyCommitCount,
            icon: <GitCommit className="w-4 h-4" />,
            accent: 'text-emerald-400',
            border: 'border-emerald-500/20',
            glow: 'shadow-emerald-500/5',
            bg: 'bg-emerald-500/10',
        },
        {
            label: 'Current Streak',
            value: '--',
            icon: <Flame className="w-4 h-4" />,
            accent: 'text-orange-400',
            border: 'border-orange-500/20',
            glow: 'shadow-orange-500/5',
            bg: 'bg-orange-500/10',
        },
        {
            label: 'Total Solved',
            value: '--',
            icon: <Trophy className="w-4 h-4" />,
            accent: 'text-sky-400',
            border: 'border-sky-500/20',
            glow: 'shadow-sky-500/5',
            bg: 'bg-sky-500/10',
        },
    ];

    return (
        <div
            className="min-h-screen bg-[#0d1117] text-slate-100"
            style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
        >
            {/* Top header bar */}
            <div className="border-b border-slate-800 bg-[#0d1117]/80 backdrop-blur-sm sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs text-slate-400 tracking-widest uppercase">User Profile</span>
                    </div>
                    <div className="text-xs text-slate-600 tracking-wider">CodeStreak Dashboard</div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto py-10 px-6 space-y-6">

                {/* GitHub Integration Card */}
                <div
                    className="relative rounded-xl border border-slate-800 bg-[#161b22] overflow-hidden"
                    style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.05)' }}
                >
                    {/* Subtle green top accent line */}
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

                    <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                        <div className="flex items-start gap-4">
                            <div className="mt-1 p-2.5 rounded-lg bg-slate-800 border border-slate-700">
                                <Github className="w-5 h-5 text-slate-300" />
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-slate-100 tracking-wide">GitHub Integration</h2>
                                <p className="text-xs text-slate-500 mt-1 leading-relaxed max-w-sm">
                                    Connect your GitHub account to automatically track daily commits towards your CodeStreak.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <GithubConnect />
                            {profileData?.githubUsername && (
                                <button
                                    onClick={handleManualSync}
                                    disabled={githubSyncing}
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-slate-800 border border-slate-700 text-slate-300 hover:border-emerald-500/40 hover:text-emerald-400 transition-all disabled:opacity-40"
                                >
                                    <RefreshCw className={`w-3 h-3 ${githubSyncing ? 'animate-spin' : ''}`} />
                                    Sync Now
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className={`relative rounded-xl border ${stat.border} bg-[#161b22] p-6 overflow-hidden group hover:border-opacity-50 transition-all duration-300`}
                            style={{ boxShadow: `0 0 20px ${stat.glow}` }}
                        >
                            <div className={`absolute top-0 right-0 w-20 h-20 rounded-full ${stat.bg} blur-2xl opacity-30 group-hover:opacity-60 transition-opacity`} />
                            <div className="relative">
                                <div className={`inline-flex items-center gap-1.5 text-xs ${stat.accent} ${stat.bg} px-2 py-1 rounded-md mb-4`}>
                                    {stat.icon}
                                    <span className="tracking-wider">{stat.label}</span>
                                </div>
                                <p className={`text-4xl font-bold tracking-tight ${stat.accent}`}>
                                    {stat.value}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Activity Heatmap */}
                <div
                    className="rounded-xl border border-slate-800 bg-[#161b22] overflow-hidden"
                    style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.03), inset 0 1px 0 rgba(255,255,255,0.05)' }}
                >
                    <div className="h-px w-full bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

                    <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-sm font-semibold text-slate-100 tracking-wide">Activity Heatmap</h2>
                                <p className="text-xs text-slate-500 mt-0.5">Contribution history over the last 6 months</p>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                                <span>Less</span>
                                <div className="flex gap-1">
                                    {['bg-[#1a1f2e]', 'bg-[#0e3320]', 'bg-[#0d5c35]', 'bg-[#1a8a4a]', 'bg-emerald-400'].map((c, i) => (
                                        <div key={i} className={`w-3 h-3 rounded-sm ${c} border border-white/5`} />
                                    ))}
                                </div>
                                <span>More</span>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <div className="min-w-[680px]">
                                <ActivityCalendar
                                    data={profileData.activity}
                                    theme={theme}
                                    colorScheme="dark"
                                    style={{ color: '#64748b', fontSize: '11px' }}
                                    labels={{
                                        totalCount: `{{count}} contributions in the last half year`,
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

function generateMockActivity() {
    const data = [];
    const now = new Date();
    for (let i = 180; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        data.push({
            date: d.toISOString().split('T')[0],
            count: Math.random() > 0.7 ? Math.floor(Math.random() * 5) + 1 : 0,
            level: Math.random() > 0.7 ? Math.floor(Math.random() * 4) + 1 : 0,
        });
    }
    return data;
}

export default ProfilePage;