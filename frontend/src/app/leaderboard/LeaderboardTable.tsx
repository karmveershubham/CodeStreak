import { Star } from 'lucide-react'
import clsx from 'clsx'

interface Entry {
  rank: number
  username: string
  overallScore: number
}

export default function LeaderboardTable({ entries }: { entries: Entry[] }) {
  const getMedal = (rank: number) => {
    if (rank === 1) return '🥇'
    if (rank === 2) return '🥈'
    if (rank === 3) return '🥉'
    return `${rank}`
  }

  const getStars = (score: number) => {
    const totalStars = 5
    const maxScore = 4000
    const stars = Math.round((score / maxScore) * totalStars)
    return [...Array(totalStars)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={clsx(
          'transition-transform',
          i < stars ? 'text-yellow-400' : 'text-gray-400 dark:text-gray-600'
        )}
        fill={i < stars ? '#facc15' : 'none'}
      />
    ))
  }

  return (
    <div className="space-y-6">
      {entries.map((entry) => (
        <div
          key={entry.rank}
          className={clsx(
            'relative overflow-hidden rounded-xl p-[1px]',
            'bg-gradient-to-tr from-purple-500 to-blue-500',
            'shadow-[0_0_20px_rgba(147,51,234,0.6)]' // Always glowing
          )}
        >
          <div className="flex items-center justify-between bg-slate-900 rounded-[10px] p-4">
            {/* Rank & Medal */}
            <div className="text-2xl font-bold text-white w-10 text-center">
              {getMedal(entry.rank)}
            </div>

            {/* Username */}
            <div className="text-white text-lg font-medium flex-1 text-left px-4">
              {entry.username}
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 px-4">{getStars(entry.overallScore)}</div>

            {/* Score */}
            <div className="text-white font-bold text-right w-16">
              {entry.overallScore}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
