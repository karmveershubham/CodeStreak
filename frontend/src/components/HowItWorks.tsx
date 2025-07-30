import React from 'react';
import { Target, MessageSquare, TrendingUp, ChevronRight } from 'lucide-react';

interface HowItWorksProps {
  isDark?: boolean;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ isDark }) => {
  const steps = [
    {
      icon: Target,
      title: "Choose Your Goal",
      description: "Select your track: interviews, competitive programming, or college prep",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: MessageSquare,
      title: "Get Daily Challenges",
      description: "Receive curated problems via your preferred channel: WhatsApp, SMS, or Email",
      color: "from-purple-500 to-purple-600"
    },
    {
  icon: TrendingUp,
  title: "Track Your Streak",
  description: "Get AI-powered feedback, stay motivated, and monitor your progress.",
  color: "from-emerald-500 to-emerald-600"
}

  ];

  return (
    <section className={`py-20 px-4 relative overflow-hidden transition-all duration-500 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
      {/* Animated background gradient - Same as CTA but different colors */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isDark 
          ? 'bg-gradient-to-tr from-purple-500/20 via-pink-500/20 to-indigo-600/20 animate-gradient-x' 
          : 'bg-gradient-to-tr from-purple-300/30 via-pink-300/30 to-indigo-400/30 animate-gradient-x'
      }`}></div>
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            How It <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            Three simple steps to transform your coding journey
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-4">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className={`relative bg-gradient-to-br p-8 rounded-2xl shadow-lg transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl ${
                isDark ? 'from-slate-700 to-slate-600' : 'from-white to-gray-50'
              }`}>
                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className={`text-2xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {step.title}
                </h3>
                
                <p className={`text-lg leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  {step.description}
                </p>
                
                <div className="absolute top-4 right-4 text-6xl font-bold opacity-10">
                  {index + 1}
                </div>
              </div>
              
              {/* Arrow connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 z-10">
                  <ChevronRight className={`w-8 h-8 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;