import { useCallback } from 'react';

export const useTheme = () => {
  const toggleTheme = useCallback(() => {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    
    // Optimized theme switching with reduced reflows
    html.classList.add('theme-transitioning');
    
    // Use double requestAnimationFrame for smoother transitions
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Batch DOM updates for better performance
        if (isDark) {
          html.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        } else {
          html.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        }
        
        // Remove transition class after optimized duration
        setTimeout(() => {
          html.classList.remove('theme-transitioning');
        }, 200); // Reduced from 300ms for snappier feel
      });
    });
  }, []);

  return {
    toggleTheme,
  };
};
