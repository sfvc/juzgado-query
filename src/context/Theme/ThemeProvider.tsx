import { useEffect, useState } from 'react'
import { ThemeContext } from './ThemeContext'

interface Props {
  children: JSX.Element | JSX.Element[]
}

const THEME_KEY = 'theme'

// Lee el tema guardado. Si el almacenamiento no esta disponible usa el claro.
const getSavedTheme = (): string => {
  try {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light'
  } catch {
    return 'light'
  }
}

export const ThemeProvider = ({ children }: Props) => {
  // Se lee al crear el estado para que no arranque en claro y despues cambie
  const [theme, setTheme] = useState<string>(getSavedTheme)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)

    try {
      localStorage.setItem(THEME_KEY, newTheme)
    } catch {
      // Sin almacenamiento el cambio vale solo para esta sesion
    }
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
