import { useCallback } from 'react';

export const useTheme = () => {
  const toggleTheme = useCallback(() => {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    
    // Add transition class for smooth theme switching
    html.classList.add('theme-transitioning');
    
    // Use requestAnimationFrame for smoother theme transitions
    requestAnimationFrame(() => {
      if (isDark) {
        html.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        html.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
      
      // Remove transition class after animation completes
      setTimeout(() => {
        html.classList.remove('theme-transitioning');
      }, 300);
    });
  }, []);

  return {
    toggleTheme,
  };
};
