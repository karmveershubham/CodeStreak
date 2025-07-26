"use client";
 
import Header from '@/components/Header';
import Main from '@/components/Main';
import ClientOnly from '@/components/ClientOnly';

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {Particles} from "@/components/magicui/particles";

const LandingPage = () => {
  const { theme } = useTheme();
  const [color, setColor] = useState("#00eaff");
  const [mounted, setMounted] = useState(false);
 
  useEffect(() => {
    setMounted(true);
    setColor(theme === "dark" ? "#00eaff" : "#00eaff");
  }, [theme]);

  // Prevent hydration mismatch by not rendering particles until mounted
  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-center text-white">
        <ClientOnly>
          <Header />
        </ClientOnly>
        <ClientOnly>
          <Main />
        </ClientOnly>
      </div>
    );
  }
 
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-center text-white">
      <ClientOnly>
        <Header />
      </ClientOnly>
      <Particles
        className="absolute inset-0"
        quantity={150}
        ease={80}
        color={color}
        refresh
      />
      <ClientOnly>
        <Main />
      </ClientOnly>
    </div>
  );
};

export default LandingPage;
