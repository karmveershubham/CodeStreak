'use client'

import { ReactNode } from 'react'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function LeaderboardLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <Header toggleDark={() => {}} isDark={false} />
      <main className="min-h-screen pt-20">{children}</main>
      <Footer isDark={false} toggleDark={() => {}} />
    </ThemeProvider>
  )
}
