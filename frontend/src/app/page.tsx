'use client'

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

export default function HomePage() {
  const { toggleTheme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  const handleToggleTheme = () => {
    toggleTheme();
    setIsDark(!isDark);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white overflow-x-hidden">
      <Header toggleDark={handleToggleTheme} isDark={isDark} />
      
      <AnimatedSection id="hero" variant="fadeInDown">
        <Hero isDark={isDark} />
      </AnimatedSection>
      
      <AnimatedSection id="howitworks" variant="fadeInUp">
        <HowItWorks isDark={isDark} />
      </AnimatedSection>
      
      <AnimatedSection id="features" variant="fadeInUp">
        <FeatureHighlights isDark={isDark} />
      </AnimatedSection>
      
      <AnimatedSection id="platforms" variant="scaleIn">
        <PlatformPreviews isDark={isDark} />
      </AnimatedSection>
      
      <AnimatedSection id="community" variant="fadeInLeft">
        <Community isDark={isDark} />
      </AnimatedSection>
      
      <AnimatedSection id="testimonials" variant="fadeInRight">
        <Testimonials isDark={isDark} />
      </AnimatedSection>
      
      <AnimatedSection id="cta" variant="slideInUp">
        <CTA isDark={isDark} />
      </AnimatedSection>
      
      <Footer toggleDark={handleToggleTheme} isDark={isDark} />
    </div>
  );
}
