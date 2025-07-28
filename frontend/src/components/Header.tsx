'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import logo from "@/../../public/images/codestreaklogo.webp";
import { Moon, Sun } from "lucide-react";

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [color, setColor] = useState("#ff4d4d"); // default red
  const [mounted, setMounted] = useState(false);

  // Sync theme on initial load
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
    setMounted(true);
  }, []);

  // Set color based on theme
  useEffect(() => {
    if (!mounted) return;
    setColor(isDark ? "#00eaff" : "#221212ff"); // dark = blue, light = red
  }, [isDark, mounted]);

  // Toggle theme
  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <header className="absolute top-0 left-0 right-0 flex justify-between items-center p-6">
      <div className="flex items-center space-x-2">
        <div className="p-2">
          <Image
            src={logo}
            alt="CodeStreak Logo"
            width={40}
            height={40}
            suppressHydrationWarning={true}
          />
        </div>
        <span className="font-bold text-lg">CodeStreak</span>
      </div>

      <nav className="flex space-x-4 items-center">
        <a href="#" className="mt-2 hover:underline">About</a>
        <a href="#" className="mt-2 hover:underline">Features</a>
        <a
          href="/login"
          className="px-4 py-2 mt-1 text-white rounded shadow transition"
          style={{ backgroundColor: color }}
        >
          Get Started
        </a>

        {/* 🌙 Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white hover:scale-105 transition"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>
    </header>
  );
};

export default Header;
