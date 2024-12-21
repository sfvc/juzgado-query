import { ThemeInterface } from '../../context/Theme/ThemeContext'
import {icons} from '../../shared'

export const ThemeButton = ({theme, toggleTheme}: ThemeInterface) => {
  return (
    <div>
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
        aria-label="Toggle Theme"
      >
        {
          theme === 'light' 
            ? <icons.Light />
            : <icons.Moon />
        }
      </button>
    </div>
  )
}
