import React from 'react';
import { Brain, Bell, Trophy, Users, GraduationCap, MessageCircle } from 'lucide-react';

interface FeatureHighlightsProps {
  isDark?: boolean;
}

const FeatureHighlights: React.FC<FeatureHighlightsProps> = ({ isDark }) => {
  const features = [
    {
      icon: Brain,
      title: "AI-Curated Paths",
      description: "Personalized learning tracks adapted to your skill level and goals",
      gradient: "from-blue-500 to-purple-600"
    },
    {
      icon: Bell,
      title: "Daily Notifications",
      description: "Never miss a day with smart reminders across all platforms",
      gradient: "from-purple-500 to-pink-600"
    },
    {
      icon: Trophy,
      title: "Contest Alerts",
      description: "Stay updated with upcoming contests from CodeChef, Codeforces & more",
      gradient: "from-emerald-500 to-blue-600"
    },
    {
      icon: Users,
      title: "Room Battles",
      description: "Compete with friends in private coding challenges and leaderboards",
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: GraduationCap,
      title: "College Leaderboards",
      description: "Represent your college and climb the competitive rankings",
      gradient: "from-teal-500 to-green-600"
    },
    {
      icon: MessageCircle,
      title: "Personalized Feedback",
      description: "Get AI-powered insights and tips to improve your coding skills",
      gradient: "from-indigo-500 to-purple-600"
    }
  ];

  return (
    <section id="features" className={`py-20 px-4 relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
      {/* Lightweight background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full"></div>
        <div className="absolute top-20 right-20 w-3 h-3 bg-purple-400 rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-emerald-400 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-1 h-1 bg-pink-400 rounded-full"></div>
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Powerful <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Features</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Everything you need to build and maintain your coding streak
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-2xl transition-all duration-500 hover:scale-105 cursor-pointer ${
                isDark 
                  ? 'bg-slate-700 hover:bg-slate-600 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10' 
                  : 'bg-gray-50 hover:bg-white shadow-lg hover:shadow-2xl hover:shadow-blue-500/10'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h3>
              
              <p className={`leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {feature.description}
              </p>
              
              {/* Hover glow effect */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;