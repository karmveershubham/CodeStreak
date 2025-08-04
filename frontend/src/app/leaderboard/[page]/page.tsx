'use client'

import { use } from 'react'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import LeaderboardTable from '../LeaderboardTable'
import clsx from 'clsx'

type Entry = {
  rank: number
  username: string
  overallScore: number
}

export default function LeaderboardPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = use(params)
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(true)
  const pageNumber = parseInt(page || '1', 10)

  useEffect(() => {
  // ✅ Actual fetch logic for real backend (commented out until API/database is ready)
  /*
  const fetchLeaderboard = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/leaderboard?page=${pageNumber}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setEntries(data.entries || [])
    } catch (err) {
      console.error('Failed to fetch leaderboard:', err)
      setEntries([])
    } finally {
      setLoading(false)
    }
  }
  fetchLeaderboard()
  */

  // ✅ Temporary dummy data for UI development
  const dummyLeaderboard = [
    { rank: 1, username: 'ruhi', overallScore: 1200 },
    { rank: 2, username: 'jack', overallScore: 1100 },
    { rank: 3, username: 'bob', overallScore: 1050 },
    { rank: 4, username: 'nick', overallScore: 1000 },
    { rank: 5, username: 'lita', overallScore: 900 },
    { rank: 6, username: 'rita', overallScore: 805 },
  ]
  setEntries(dummyLeaderboard)
  setLoading(false)
}, [pageNumber])


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-10 animate-fadeIn">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          🏆 CodeStreak Leaderboard
        </h1>

        {loading ? (
          <p className="text-center text-lg">Loading...</p>
        ) : (
          <>
            <div className="space-y-6">
              {entries.map((entry) => (
                <div
                  key={entry.rank}
                  className={clsx(
                    'relative p-[2px] rounded-xl overflow-hidden group',
                    'bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500',
                    'shadow-[0_0_20px_rgba(147,51,234,0.6)] animate-pulse-slow'
                  )}
                >
                  <div className="flex items-center justify-between bg-slate-900 rounded-[10px] p-5 transition-all duration-300 group-hover:scale-[1.02]">
                    {/* Rank in glowing circle */}
                    <div className="flex items-center justify-center w-7 h-7 rounded-full text-xl font-bold text-white border-2 border-purple-400 shadow-md bg-gradient-to-br from-purple-700 to-pink-600 animate-glow">
                      {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : entry.rank}

                    </div>

                    {/* Username */}
                    <div className="text-lg font-medium flex-1 text-left px-4">
                      {entry.username}
                    </div>

                    {/* Score */}
                    <div className="text-xl font-bold text-pink-400">
                      {entry.overallScore}
                    </div>
                  </div>
                </div>
                
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-between mt-10 text-sm text-gray-400">
              {pageNumber > 1 ? (
                <Link href={`/leaderboard/${pageNumber - 1}`} className="hover:underline">
                  ← Previous
                </Link>
              ) : <div />}
              <Link href={`/leaderboard/${pageNumber + 1}`} className="hover:underline">
                Next →
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
