'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark' | 'light'
type Lang = 'ja' | 'en'

interface AppContextType {
  theme: Theme
  lang: Lang
  toggleTheme: () => void
  toggleLang: () => void
}

const AppContext = createContext<AppContextType>({
  theme: 'dark',
  lang: 'ja',
  toggleTheme: () => {},
  toggleLang: () => {},
})

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [lang, setLang] = useState<Lang>('ja')

  useEffect(() => {
    const saved = localStorage.getItem('pp-theme') as Theme | null
    if (saved) setTheme(saved)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('pp-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-lang', lang)
  }, [lang])

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark')
  const toggleLang = () => setLang(l => l === 'ja' ? 'en' : 'ja')

  return (
    <AppContext.Provider value={{ theme, lang, toggleTheme, toggleLang }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
