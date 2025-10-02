'use client';

import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeatureHighlights from '../components/FeatureHighlights';
import HowItWorks from '../components/HowItWorks';
import PlatformPreviews from '../components/PlatformPreviews';
import Community from '../components/Community';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import { useTheme } from '../hooks/useTheme';
import AnimatedSection from '../components/AnimatedSection';
import GalaxyBackground from '../components/GalaxyBackground';

export default function HomePage() {
  const { toggleTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);
  const [completed, setCompleted] = useState(false); // ✅ Track challenge completion

  useEffect(() => {
    // Check if "dark" class is applied
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    // Watch for changes in theme
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const handleToggleTheme = () => {
    toggleTheme();
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-transparent text-gray-900 dark:text-white overflow-x-hidden relative">
      {/* Background */}
      <GalaxyBackground />

      {/* Header */}
      <Header toggleDark={handleToggleTheme} isDark={isDark} />

      {/* Hero Section */}
      <AnimatedSection id="hero" variant="fadeInDown" className="relative z-10">
        <Hero isDark={isDark} />
      </AnimatedSection>

      {/* 🔥 Today's Challenge Section */}
      <AnimatedSection
        id="today-challenge"
        variant="fadeInUp"
        className="relative z-10 mt-12"
      >
        <div className="max-w-3xl mx-auto p-6 rounded-2xl shadow-lg border border-indigo-400/50 bg-gradient-to-r from-indigo-50 to-indigo-100 dark:from-indigo-900/40 dark:to-indigo-800/30">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 text-xs font-bold text-white bg-indigo-600 rounded-full shadow-md">
              TODAY
            </span>
            <h2 className="text-xl font-semibold">Today’s Challenge</h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            🚀 Build a simple <strong>Todo App</strong> with add, delete, and
            toggle features. Keep it clean, responsive, and submit your solution
            before midnight!
          </p>

          {/* ✅ Mark Completed Button */}
          {completed ? (
            <span className="text-green-600 font-medium">✅ Completed</span>
          ) : (
            <button
              onClick={() => setCompleted(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Mark Completed
            </button>
          )}
        </div>
      </AnimatedSection>

      {/* How It Works */}
      <AnimatedSection id="howitworks" variant="fadeInUp" className="relative z-10">
        <HowItWorks isDark={isDark} />
      </AnimatedSection>

      {/* Features */}
      <AnimatedSection id="features" variant="fadeInUp" className="relative z-10">
        <FeatureHighlights isDark={isDark} />
      </AnimatedSection>

      {/* Platforms */}
      <AnimatedSection id="platforms" variant="scaleIn" className="relative z-10">
        <PlatformPreviews isDark={isDark} />
      </AnimatedSection>

      {/* Community */}
      <AnimatedSection id="community" variant="fadeInLeft" className="relative z-10">
        <Community isDark={isDark} />
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection id="testimonials" variant="fadeInRight" className="relative z-10">
        <Testimonials isDark={isDark} />
      </AnimatedSection>

      {/* Call To Action */}
      <AnimatedSection id="cta" variant="slideInUp" className="relative z-10">
        <CTA isDark={isDark} />
      </AnimatedSection>

      {/* Footer */}
      <div className="relative z-10">
        <Footer toggleDark={handleToggleTheme} isDark={isDark} />
      </div>
    </div>
  );
}
