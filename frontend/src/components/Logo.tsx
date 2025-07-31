import React from 'react';
import { Code, Zap, Star } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
  isDark?: boolean;
}

const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  isDark = false
}) => {
  const sizeClasses = {
    sm: {
      container: 'w-8 h-8',
      icon: 'w-4 h-4',
      text: 'text-lg',
      subtitle: 'text-xs'
    },
    md: {
      container: 'w-11 h-11',
      icon: 'w-6 h-6',
      text: 'text-2xl',
      subtitle: 'text-xs'
    },
    lg: {
      container: 'w-16 h-16',
      icon: 'w-8 h-8',
      text: 'text-4xl',
      subtitle: 'text-sm'
    }
  };

  const currentSize = sizeClasses[size];

  return (
    <div className={`flex items-center gap-3 ${className} group cursor-pointer`}>
      {/* Animated Logo Icon with subtle pop and tilt hover effect */}
      <div className={`${currentSize.container} bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-md hover:shadow-xl relative overflow-hidden transition-all duration-500 ease-out transform group-hover:scale-110 group-hover:-rotate-3`}>
        <Code className={`${currentSize.icon} text-white transition-transform duration-300 ease-in-out`} />
        
        {/* Animated Background Elements */}
        <Star className={`absolute -top-1 -right-1 w-3 h-3 ${isDark ? 'text-yellow-200' : 'text-yellow-300'} opacity-70 animate-sparkle`} style={{ animationDelay: '0s' }} />
        <Star className={`absolute top-1 -left-1 w-2 h-2 ${isDark ? 'text-yellow-100' : 'text-yellow-200'} opacity-70 animate-sparkle`} style={{ animationDelay: '1s' }} />
        <Zap className={`absolute w-3 h-3 ${isDark ? 'text-yellow-200' : 'text-yellow-300'} opacity-70 animate-orbit`} />
        <div className="absolute inset-0">
          <div className="absolute top-2 right-2 w-1 h-1 bg-yellow-300 rounded-full opacity-50 animate-float-particles" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1 left-2 w-1 h-1 bg-blue-200 rounded-full opacity-50 animate-float-particles" style={{ animationDelay: '1.5s' }}></div>
        </div>
      </div>

      {/* Text Logo with static gradient for 'Code' and hover effect for 'Streak' */}
      {showText && (
        <div className="flex flex-col">
          <span className={`${currentSize.text} font-bold text-gray-900 dark:text-white`}>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Code
            </span>
            <span className="relative ml-1 text-gray-900 dark:text-white group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300">
              Streak
              <span className="absolute -bottom-1 left-0 block h-1 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300 ease-in-out w-0 group-hover:w-full origin-left"></span>
            </span>
          </span>
          <span className={`${currentSize.subtitle} font-medium text-blue-600 dark:text-blue-400`}>
            AI Powered
          </span>
        </div>
      )}
    </div>
  );
};

export default Logo;
