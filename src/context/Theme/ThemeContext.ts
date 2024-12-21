import { createContext } from 'react'

export interface ThemeInterface {
  theme: string,
  toggleTheme: () => void,
}

const initialState: ThemeInterface = {
  theme: 'light',
  toggleTheme: () => {}
}

export const ThemeContext = createContext<ThemeInterface>(initialState)
