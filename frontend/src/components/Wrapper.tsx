"use client";
 
import Header from '@/components/Header';
import Main from '@/components/Main';

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Particles from "@/components/ui/particles";

const LandingPage = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState("#00eaff");
 
  useEffect(() => {
    setColor(theme === "dark" ? "#00eaff" : "#00eaff");
  }, [theme]);
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-center text-white">
      <Header />
      <Particles
        className="absolute inset-0"
        quantity={150}
        ease={80}
        color={color}
        refresh
      />
      <Main />
    </div>
  );
};

export default LandingPage;
