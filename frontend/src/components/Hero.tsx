'use client'

import React, { useState, useEffect } from 'react';
import { Play, ArrowRight, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Hero: React.FC = () => {
  const router = useRouter();
  const [typewriterText, setTypewriterText] = useState('');
  const phrases = ['Daily LeetCode', 'Crack Amazon', 'Codeforces Reminders', 'Build Streaks'];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleGetStarted = () => {
    router.push('/login');
  };

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typewriterText.length < currentPhrase.length) {
          setTypewriterText(currentPhrase.substring(0, typewriterText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (typewriterText.length > 0) {
          setTypewriterText(typewriterText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [typewriterText, isDeleting, currentPhraseIndex, phrases]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 pt-20 relative overflow-hidden bg-gray-50 dark:bg-slate-900">
      {/* Static background gradient - Removed heavy animation */}
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-300/20 via-blue-300/20 to-violet-400/20 dark:from-cyan-500/10 dark:via-blue-500/10 dark:to-violet-600/10"></div>
      
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Content */}
        <div className="text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
            <Zap className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              AI-Powered Coding Streaks
            </span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white">
            ⚡ Your Daily Dose of{' '}
            <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Code
            </span>, Delivered
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl">
            Stay sharp with AI-powered challenges via WhatsApp, Email, or SMS.
          </p>
          
          <div className="text-lg font-mono text-emerald-600 dark:text-emerald-400 h-8">
            <span className="opacity-60">→ </span>
            {typewriterText}
            <span className="animate-pulse">|</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button 
              onClick={handleGetStarted}
              className="group relative bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <span className="flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity blur"></div>
            </button>
            
            <button className="group flex items-center justify-center gap-2 px-8 py-4 rounded-lg font-semibold border-2 border-purple-500 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105">
              <Play className="w-5 h-5" />
              See How It Works
            </button>
          </div>
        </div>
        
        {/* Right Content - Phone Mockup */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative animate-float">
            <div className="w-80 h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-4 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="w-full h-full bg-black rounded-2xl p-6 flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">CS</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">CodeStreak</div>
                    <div className="text-green-400 text-xs">Online</div>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <div className="bg-gray-800 rounded-lg p-4">
                    <div className="text-green-400 text-sm mb-2">🔥 Day 15 Streak!</div>
                    <div className="text-white text-sm mb-3">
                      Today's Challenge: Two Sum Problem
                    </div>
                    <div className="text-gray-300 text-xs">
                      Given an array of integers, return indices of two numbers that add up to a target...
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded text-sm">
                      Solve Now
                    </button>
                    <button className="flex-1 bg-gray-700 text-white py-2 px-4 rounded text-sm">
                      Skip
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              🔥 15
            </div>
            <div className="absolute -bottom-4 -left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              AI Powered
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;