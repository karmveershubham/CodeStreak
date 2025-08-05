'use client'
import React, { useState } from 'react';
import { Moon, Sun, X, Menu } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Logo from './Logo';

interface HeaderProps {
  toggleDark: () => void;
  isDark?: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleDark, isDark }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleGetStarted = () => {
    router.push('/login');
  };

  const handleNavClick = (sectionId: string) => {
    const isInternalRoute = sectionId.startsWith('/');
    const isHomePage = window.location.pathname === '/';

    if (isInternalRoute) {
      // Go to full page like /leaderboard/1
      router.push(sectionId);
      return;
    }

    if (!isHomePage) {
      // Go to homepage, then scroll after small delay
      router.push('/');

      setTimeout(() => {
        scrollToSection(sectionId);
      }, 300);
    } else {
      // Already on homepage, just scroll
      scrollToSection(sectionId);
    }

    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        const headerHeight = 80;
        const offset = element.offsetTop - headerHeight;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }
  };


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 border-b border-gray-200/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="cursor-pointer">
            <Logo size="md" showText={true} isDark={isDark} />
          </div>

          {/* Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center gap-1 p-1 rounded-2xl bg-gray-100/50 dark:bg-slate-800/50">
              {['Home', 'How It Works', 'Features', 'Preview', 'Leaderboard', 'Testimonial'].map((item) => {
                const getSectionId = (itemName: string) => {
                  const sectionMap: Record<string, string> = {
                    'Home': 'home',
                    'How It Works': 'howitworks',
                    'Features': 'features',
                    'Preview': 'platforms',
                    'Leaderboard': '/leaderboard/1',
                    'Testimonial': 'testimonials'
                  };
                  return sectionMap[itemName] || itemName.toLowerCase().replace(/\s+/g, '-');
                };

                return (
                  <button
                    key={item}
                    onClick={() => handleNavClick(getSectionId(item))}
                    className="relative px-3 py-2 rounded-xl font-medium text-sm group whitespace-nowrap text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/80 dark:hover:bg-slate-700/50 transition-transform duration-200 ease-in-out transform hover:scale-105"
                  >
                    {item}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-3">
            {/* Get Started Button - Mobile */}
            <button
              onClick={handleGetStarted}
              className="lg:hidden p-3 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 text-white font-semibold text-xs transition-transform duration-300 transform hover:scale-110 shadow-lg">
              <span className="whitespace-nowrap">Get Started</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleDark}
              className="relative p-3 rounded-2xl transition-transform duration-300 ease-in-out hover:scale-110 group overflow-hidden bg-gray-100/50 dark:bg-slate-800/50 hover:bg-gray-200/50 dark:hover:bg-slate-700/50 border border-gray-200/50 dark:border-slate-700/50"
              aria-label="Toggle theme"
            >
              <div className="relative w-5 h-5">
                <Sun className="absolute inset-0 w-5 h-5 transition-all duration-300 ease-in-out dark:opacity-100 dark:rotate-0 dark:scale-100 opacity-0 -rotate-90 scale-0 text-yellow-500" />
                <Moon className="absolute inset-0 w-5 h-5 transition-all duration-300 ease-in-out opacity-100 rotate-0 scale-100 dark:opacity-0 dark:rotate-90 dark:scale-0 text-blue-400" />
              </div>

              <div className="absolute inset-0 rounded-2xl transition-shadow duration-300 group-hover:shadow-lg group-hover:shadow-blue-400/20 dark:group-hover:shadow-yellow-400/20"></div>
            </button>

            {/* Get Started Button - Desktop */}
            <button
              onClick={handleGetStarted}
              className="group relative hidden lg:flex items-center gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 text-white px-4 py-2.5 rounded-2xl font-semibold text-sm transition-transform duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl overflow-hidden">

              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-3 rounded-2xl transition-transform ease-in-out duration-300 hover:scale-110 bg-gray-100/50 dark:bg-slate-800/50 text-gray-900 dark:text-white hover:bg-gray-200/50 dark:hover:bg-slate-700/50"
              aria-label="Toggle mobile menu"
            >
              <div className="w-5 h-5 relative">
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 transition-transform duration-300" />
                ) : (
                  <Menu className="w-5 h-5 transition-transform duration-300" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 transition-opacity duration-300 border-t bg-white/95 dark:bg-slate-900/95 border-gray-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <nav className="flex flex-col space-y-2">
              {['Home', 'How It Works', 'Features', 'Preview', 'Leaderboard', 'Testimonial'].map((item) => {
                const getSectionId = (itemName: string) => {
                  const sectionMap: Record<string, string> = {
                    'Home': 'home',
                    'How It Works': 'how-it-works',
                    'Features': 'features',
                    'Preview': 'platforms',
                    'Leaderboard': '/leaderboard/1',
                    'Testimonial': 'testimonials'
                  };
                  return sectionMap[itemName] || itemName.toLowerCase().replace(/\s+/g, '-');
                };

                return (
                  <button
                    key={item}
                    onClick={() => handleNavClick(getSectionId(item))}
                    className="text-left px-4 py-3 rounded-xl font-medium text-base transition-transform duration-200 ease-in-out transform hover:scale-105 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-slate-800/50"
                  >
                    {item}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;