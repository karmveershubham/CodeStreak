import React from 'react';
import { Crown, Users, Flame, Award } from 'lucide-react';

interface CommunityProps {
  isDark: boolean;
}

const Community: React.FC<CommunityProps> = ({ isDark }) => {
  const leaderboard = [
    { name: "IIT Bombay", score: 15420, members: 2341, badge: "🏆" },
    { name: "NIT Trichy", score: 14890, members: 1876, badge: "🥈" },
    { name: "VIT Chennai", score: 14201, members: 2109, badge: "🥉" },
    { name: "BITS Pilani", score: 13456, members: 1654, badge: "🏅" },
    { name: "DTU", score: 12789, members: 1432, badge: "⭐" }
  ];

  const topCoders = [
    { name: "Arjun K.", college: "IIT Bombay", streak: 47, avatar: "A" },
    { name: "Priya S.", college: "NIT Trichy", streak: 42, avatar: "P" },
    { name: "Rahul M.", college: "VIT Chennai", streak: 38, avatar: "R" }
  ];

  return (
    <section id="community" className={`py-20 px-4 relative overflow-hidden transition-all duration-500 bg-transparent`}>
      {/* Animated background gradient - Same as CTA but different colors */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-tr from-emerald-500/20 via-yellow-500/20 to-orange-600/20 animate-gradient-x' 
          : 'bg-gradient-to-tr from-emerald-300/30 via-yellow-300/30 to-orange-400/30 animate-gradient-x'
      }`}></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Community & <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Leaderboards</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Compete with your college and climb the rankings
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* College Leaderboard */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800/90' : 'bg-white/95'} shadow-lg backdrop-blur-sm`}>
            <div className="flex items-center gap-3 mb-8">
              <Crown className="w-8 h-8 text-yellow-500" />
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                College Rankings
              </h3>
            </div>
            
            <div className="space-y-4">
              {leaderboard.map((college, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                    index === 0 
                      ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20' 
                      : isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-2xl">{college.badge}</span>
                    <div>
                      <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        {college.name}
                      </div>
                      <div className={`text-sm flex items-center gap-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        <Users className="w-4 h-4" />
                        {college.members.toLocaleString()} members
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold text-lg ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                      {college.score.toLocaleString()}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      points
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Top Coders */}
          <div className={`p-6 rounded-xl ${isDark ? 'bg-slate-800/90' : 'bg-white/95'} shadow-lg backdrop-blur-sm`}>
            <div className="flex items-center gap-3 mb-8">
              <Flame className="w-8 h-8 text-orange-500" />
              <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Top Streaks This Week
              </h3>
            </div>
            
            <div className="space-y-6">
              {topCoders.map((coder, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                    isDark ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg`}>
                    {coder.avatar}
                  </div>
                  <div className="flex-1">
                    <div className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {coder.name}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      {coder.college}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-orange-500" />
                    <span className={`font-bold text-lg ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                      {coder.streak}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Room Battle Preview */}
            <div className={`mt-6 p-4 rounded-lg border border-dashed ${isDark ? 'border-purple-500/20 bg-purple-500/5' : 'border-purple-500/20 bg-purple-50/50'}`}>
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-6 h-6 text-purple-500" />
                <span className={`font-semibold ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>
                  Room Battle: DSA Masters
                </span>
              </div>
              <div className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                5 friends competing • 3 days left
              </div>
              <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white py-2 px-4 rounded-lg font-semibold transition-all duration-200 hover:scale-[1.02]">
                Join Battle
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;