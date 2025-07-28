"use client";

import { useEffect, useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import { motion, AnimatePresence } from "framer-motion";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 shadow-md fixed right-4 top-4 z-50 md:right-6 md:top-6 transition-colors duration-300"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {theme === "light" ? (
            <MoonIcon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
          ) : (
            <SunIcon className="h-6 w-6 text-yellow-400" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;