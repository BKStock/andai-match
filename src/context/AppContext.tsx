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
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'dark'
    const saved = localStorage.getItem('pp-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'ja'
    const saved = localStorage.getItem('pp-lang')
    return saved === 'en' || saved === 'ja' ? saved : 'ja'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('pp-theme', theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.setAttribute('data-lang', lang)
    document.documentElement.lang = lang
    localStorage.setItem('pp-lang', lang)
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
