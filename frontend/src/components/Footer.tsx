import React from 'react';
import { Github, Code, Database, Zap, Moon, Sun } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  isDark: boolean;
  toggleDark: () => void;
}

const Footer: React.FC<FooterProps> = ({ isDark, toggleDark }) => {
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Approximate header height
      const elementPosition = element.offsetTop - headerHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`py-12 px-4 border-t transition-all duration-500 ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'}`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo isDark={isDark} size="sm" showText={true} />
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Your daily companion for coding excellence. Never break the streak.
            </p>
          </div>
          
          {/* Links */}
          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Platform
            </h4>
            <ul className="space-y-2">
              {['Home', 'How It Works','Features','Preview', 'Leaderboard', 'Testimonial'].map(link => {
                const handleClick = () => {
                  if (link === 'Home') {
                    handleHomeClick();
                  } else if (link === 'How It Works') {
                    // Scroll to HowItWorks section - it doesn't have an ID, so we'll scroll to features and offset
                    handleNavClick('howitworks');
                  } else if (link === 'Features') {
                    handleNavClick('features');
                  } else if (link === 'Preview') {
                    handleNavClick('platforms');
                  } else if (link === 'Leaderboard') {
                    handleNavClick('community');
                  } else if (link === 'Testimonial') {
                    handleNavClick('testimonials');
                  }
                };
                
                return (
                  <li key={link}>
                    <button 
                      onClick={handleClick}
                      className={`text-sm hover:text-blue-500 transition-colors cursor-pointer ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                    >
                      {link}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
          
          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Support
            </h4>
            <ul className="space-y-2">
              {['Contact', 'Help Center', 'Privacy Policy', 'Terms'].map(link => (
                <li key={link}>
                  <a 
                    href="#" 
                    className={`text-sm hover:text-blue-500 transition-colors ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Tech Stack */}
          <div>
            <h4 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Built With
            </h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Code className="w-4 h-4 text-blue-500" />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>React + TypeScript</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-green-500" />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>MongoDB</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-500" />
                <span className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>GPT-4</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className={`flex flex-col md:flex-row justify-between items-center pt-8 mt-8 border-t ${isDark ? 'border-slate-700' : 'border-gray-200'}`}>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            © 2025 CodeStreak. Built with ❤️ for coders worldwide.
          </p>
          
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <a 
              href="#" 
              className={`p-2 rounded-lg hover:bg-gray-100 transition-colors ${isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'}`}
            >
              <Github className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-gray-600'}`} />
            </a>
            
            <button
              onClick={toggleDark}
              className={`p-2 rounded-lg transition-all duration-300 hover:scale-110 ${
                isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
              }`}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-blue-400" />
              )}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;