import { createContext, useContext, useState, useEffect } from 'react'

export const EGG_THEMES = ['blade-runner', 'pulp-fiction'] as const
export type EggTheme = (typeof EGG_THEMES)[number]
export type Theme = 'light' | 'dark' | EggTheme

const ALL_THEMES: Theme[] = ['light', 'dark', ...EGG_THEMES]

interface ThemeContextValue {
  theme: Theme
  toggleTheme: () => void
  setEggTheme: (t: EggTheme) => void
  exitEggTheme: () => void
  isEggTheme: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getInitialTheme(): Theme {
  const stored = localStorage.getItem('theme') as Theme | null
  if (stored && ALL_THEMES.includes(stored)) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function getInitialRegularTheme(): 'light' | 'dark' {
  const stored = localStorage.getItem('theme-regular') as 'light' | 'dark' | null
  if (stored === 'light' || stored === 'dark') return stored
  const initial = getInitialTheme()
  if (initial === 'light' || initial === 'dark') return initial
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const [regularTheme, setRegularTheme] = useState<'light' | 'dark'>(getInitialRegularTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
    if (theme === 'light' || theme === 'dark') {
      setRegularTheme(theme)
      localStorage.setItem('theme-regular', theme)
    }
  }, [theme])

  const toggleTheme = () =>
    setTheme(prev => (prev === 'dark' ? 'light' : prev === 'light' ? 'dark' : prev))

  const setEggTheme = (t: EggTheme) => setTheme(t)
  const exitEggTheme = () => setTheme(regularTheme)
  const isEggTheme = theme === 'blade-runner' || theme === 'pulp-fiction'

  return (
    <ThemeContext.Provider
      value={{ theme, toggleTheme, setEggTheme, exitEggTheme, isEggTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
