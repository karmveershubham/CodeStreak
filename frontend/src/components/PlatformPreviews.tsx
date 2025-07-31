import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Smartphone, Mail, MessageSquare } from 'lucide-react';

interface PlatformPreviewsProps {
  isDark: boolean;
}

const PlatformPreviews: React.FC<PlatformPreviewsProps> = ({ isDark }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const previews = [
    {
      platform: "WhatsApp",
      icon: MessageSquare,
      color: "from-green-500 to-green-600",
      content: (
        <div className="bg-green-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">CS</span>
            </div>
            <span className="font-semibold text-green-800">CodeStreak</span>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-green-600 text-sm mb-2">🔥 Streak Day 7!</div>
            <div className="text-gray-800 font-medium mb-2">Binary Search Challenge</div>
            <div className="text-gray-600 text-sm">Find the target in a sorted array...</div>
          </div>
        </div>
      )
    },
    {
      platform: "Email",
      icon: Mail,
      color: "from-blue-500 to-blue-600",
      content: (
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="border-b border-blue-200 pb-3 mb-3">
            <div className="font-semibold text-blue-800">Daily Coding Challenge - Day 12</div>
            <div className="text-blue-600 text-sm">from: challenges@codestreak.com</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-blue-600 font-medium mb-2">Two Pointers Technique</div>
            <div className="text-gray-600 text-sm">Master this essential algorithm pattern...</div>
          </div>
        </div>
      )
    },
    {
      platform: "Contest Alert",
      icon: Smartphone,
      color: "from-purple-500 to-purple-600",
      content: (
        <div className="bg-purple-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🏆</span>
            </div>
            <span className="font-semibold text-purple-800">Contest Reminder</span>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-purple-600 font-medium mb-2">Codeforces Round #850</div>
            <div className="text-gray-600 text-sm">Starts in 2 hours - Don&apos;t miss it!</div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % previews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [previews.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % previews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + previews.length) % previews.length);
  };

  return (
    <section id="platforms" className={`py-20 px-4 transition-all duration-500 relative overflow-hidden bg-transparent`}>
      {/* Animated Background - Fixed Positions */}
      <div className="absolute inset-0">
        {/* Floating circles animation - Fixed positions */}
        <div className="absolute w-2 h-2 rounded-full animate-bounce opacity-20 bg-gradient-to-r from-blue-400 to-purple-400" style={{ left: '10%', top: '15%', animationDelay: '0s', animationDuration: '4s' }} />
        <div className="absolute w-3 h-3 rounded-full animate-bounce opacity-20 bg-gradient-to-r from-blue-400 to-purple-400" style={{ left: '25%', top: '25%', animationDelay: '1s', animationDuration: '5s' }} />
        <div className="absolute w-2 h-2 rounded-full animate-bounce opacity-20 bg-gradient-to-r from-blue-400 to-purple-400" style={{ left: '40%', top: '10%', animationDelay: '2s', animationDuration: '3s' }} />
        <div className="absolute w-4 h-4 rounded-full animate-bounce opacity-20 bg-gradient-to-r from-blue-400 to-purple-400" style={{ left: '55%', top: '30%', animationDelay: '0.5s', animationDuration: '6s' }} />
        <div className="absolute w-2 h-2 rounded-full animate-bounce opacity-20 bg-gradient-to-r from-blue-400 to-purple-400" style={{ left: '70%', top: '20%', animationDelay: '3s', animationDuration: '4s' }} />
        <div className="absolute w-3 h-3 rounded-full animate-bounce opacity-20 bg-gradient-to-r from-blue-400 to-purple-400" style={{ left: '85%', top: '35%', animationDelay: '1.5s', animationDuration: '5s' }} />
        <div className="absolute w-2 h-2 rounded-full animate-bounce opacity-20 bg-gradient-to-r from-blue-400 to-purple-400" style={{ left: '15%', top: '50%', animationDelay: '2.5s', animationDuration: '3.5s' }} />
        <div className="absolute w-3 h-3 rounded-full animate-bounce opacity-20 bg-gradient-to-r from-blue-400 to-purple-400" style={{ left: '30%', top: '65%', animationDelay: '4s', animationDuration: '4.5s' }} />
        <div className="absolute w-2 h-2 rounded-full animate-bounce opacity-20 bg-gradient-to-r from-blue-400 to-purple-400" style={{ left: '45%', top: '55%', animationDelay: '0.8s', animationDuration: '5.5s' }} />
        <div className="absolute w-4 h-4 rounded-full animate-bounce opacity-20 bg-gradient-to-r from-blue-400 to-purple-400" style={{ left: '60%', top: '70%', animationDelay: '3.5s', animationDuration: '4s' }} />
        <div className="absolute w-2 h-2 rounded-full animate-bounce opacity-20 bg-gradient-to-r from-blue-400 to-purple-400" style={{ left: '75%', top: '60%', animationDelay: '1.8s', animationDuration: '3s' }} />
        <div className="absolute w-3 h-3 rounded-full animate-bounce opacity-20 bg-gradient-to-r from-blue-400 to-purple-400" style={{ left: '90%', top: '75%', animationDelay: '2.8s', animationDuration: '6s' }} />
        <div className="absolute w-2 h-2 rounded-full animate-bounce opacity-20 bg-gradient-to-r from-blue-400 to-purple-400" style={{ left: '5%', top: '80%', animationDelay: '4.5s', animationDuration: '4.5s' }} />
        <div className="absolute w-3 h-3 rounded-full animate-bounce opacity-20 bg-gradient-to-r from-blue-400 to-purple-400" style={{ left: '20%', top: '85%', animationDelay: '0.3s', animationDuration: '5s' }} />
        <div className="absolute w-2 h-2 rounded-full animate-bounce opacity-20 bg-gradient-to-r from-blue-400 to-purple-400" style={{ left: '35%', top: '90%', animationDelay: '3.8s', animationDuration: '3.5s' }} />
        
        {/* Floating squares - Fixed positions */}
        <div className="absolute w-3 h-3 animate-pulse opacity-15 bg-emerald-400" style={{ left: '12%', top: '40%', animationDelay: '0s', animationDuration: '3s', transform: 'rotate(45deg)' }} />
        <div className="absolute w-3 h-3 animate-pulse opacity-15 bg-emerald-400" style={{ left: '28%', top: '45%', animationDelay: '1s', animationDuration: '4s', transform: 'rotate(90deg)' }} />
        <div className="absolute w-3 h-3 animate-pulse opacity-15 bg-emerald-400" style={{ left: '50%', top: '35%', animationDelay: '2s', animationDuration: '2.5s', transform: 'rotate(135deg)' }} />
        <div className="absolute w-3 h-3 animate-pulse opacity-15 bg-emerald-400" style={{ left: '65%', top: '45%', animationDelay: '1.5s', animationDuration: '3.5s', transform: 'rotate(180deg)' }} />
        <div className="absolute w-3 h-3 animate-pulse opacity-15 bg-emerald-400" style={{ left: '80%', top: '50%', animationDelay: '3s', animationDuration: '4s', transform: 'rotate(225deg)' }} />
        <div className="absolute w-3 h-3 animate-pulse opacity-15 bg-emerald-400" style={{ left: '18%', top: '75%', animationDelay: '2.5s', animationDuration: '3s', transform: 'rotate(270deg)' }} />
        <div className="absolute w-3 h-3 animate-pulse opacity-15 bg-emerald-400" style={{ left: '38%', top: '80%', animationDelay: '4s', animationDuration: '2.5s', transform: 'rotate(315deg)' }} />
        <div className="absolute w-3 h-3 animate-pulse opacity-15 bg-emerald-400" style={{ left: '58%', top: '85%', animationDelay: '0.5s', animationDuration: '4.5s', transform: 'rotate(0deg)' }} />
        <div className="absolute w-3 h-3 animate-pulse opacity-15 bg-emerald-400" style={{ left: '78%', top: '82%', animationDelay: '3.5s', animationDuration: '3s', transform: 'rotate(60deg)' }} />
        
        {/* Moving gradient orbs - Fixed positions */}
        <div className="absolute w-12 h-12 rounded-full blur-xl animate-float opacity-10 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400" style={{ left: '8%', top: '25%', animationDelay: '0s', animationDuration: '8s' }} />
        <div className="absolute w-12 h-12 rounded-full blur-xl animate-float opacity-10 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400" style={{ left: '22%', top: '60%', animationDelay: '2s', animationDuration: '10s' }} />
        <div className="absolute w-12 h-12 rounded-full blur-xl animate-float opacity-10 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400" style={{ left: '42%', top: '75%', animationDelay: '4s', animationDuration: '9s' }} />
        <div className="absolute w-12 h-12 rounded-full blur-xl animate-float opacity-10 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400" style={{ left: '65%', top: '15%', animationDelay: '1s', animationDuration: '7s' }} />
        <div className="absolute w-12 h-12 rounded-full blur-xl animate-float opacity-10 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400" style={{ left: '82%', top: '65%', animationDelay: '6s', animationDuration: '11s' }} />
        <div className="absolute w-12 h-12 rounded-full blur-xl animate-float opacity-10 bg-gradient-to-br from-pink-400 via-purple-400 to-indigo-400" style={{ left: '92%', top: '40%', animationDelay: '3s', animationDuration: '8.5s' }} />
      </div>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Platform <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">Previews</span>
          </h2>
          <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-2xl mx-auto`}>
            See how CodeStreak delivers challenges across all your favorite platforms
          </p>
        </div>
        
        <div className="relative">
          {/* Desktop Layout with Side Arrows */}
          <div className="hidden md:flex items-center justify-center">
            <button
              onClick={prevSlide}
              className={`absolute left-0 z-10 p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-white hover:bg-gray-50 text-gray-800'
              } shadow-lg`}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="max-w-2xl mx-auto">
              <div className="relative overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {previews.map((preview, index) => (
                    <div key={index} className="w-full flex-shrink-0 p-8">
                      <div className="text-center mb-6">
                        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${preview.color} text-white font-semibold`}>
                          <preview.icon className="w-5 h-5" />
                          {preview.platform}
                        </div>
                      </div>
                      <div className="transform hover:scale-105 transition-transform duration-300">
                        {preview.content}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <button
              onClick={nextSlide}
              className={`absolute right-0 z-10 p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-white hover:bg-gray-50 text-gray-800'
              } shadow-lg`}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          
          {/* Mobile Layout with Top/Bottom Arrows */}
          <div className="md:hidden">
            {/* Mobile Navigation Arrows */}
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={prevSlide}
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-white hover:bg-gray-50 text-gray-800'
                } shadow-lg`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className={`p-3 rounded-full transition-all duration-300 hover:scale-110 ${
                  isDark ? 'bg-slate-700 hover:bg-slate-600 text-white' : 'bg-white hover:bg-gray-50 text-gray-800'
                } shadow-lg`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            {/* Mobile Content */}
            <div className="relative overflow-hidden rounded-2xl mx-4">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {previews.map((preview, index) => (
                  <div key={index} className="w-full flex-shrink-0 p-4">
                    <div className="text-center mb-4">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${preview.color} text-white font-semibold text-sm`}>
                        <preview.icon className="w-4 h-4" />
                        {preview.platform}
                      </div>
                    </div>
                    <div className="transform hover:scale-105 transition-transform duration-300">
                      {preview.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Slide indicators */}
          <div className="flex justify-center mt-8 gap-2">
            {previews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-blue-500 w-8' 
                    : isDark ? 'bg-slate-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformPreviews;