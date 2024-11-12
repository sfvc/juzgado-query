import { useContext, useEffect, useState } from 'react'
import { DarkThemeToggle, Dropdown, Flowbite, Tooltip } from 'flowbite-react'
import { AuthContext } from '../../context/Auth/AuthContext'
import { icons } from '../../shared'

export const DropdownHeader = () => {
  const { user, logoutUser } = useContext(AuthContext)

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedDarkMode = localStorage.getItem('darkMode')
    return savedDarkMode ? JSON.parse(savedDarkMode) : false
  })

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode))
  }

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  return (
    <div className='hidden md:flex md:justify-normal gap-2'>
      <Flowbite>
        <Tooltip content='Cambiar Tema'>
          <DarkThemeToggle darkmode={darkMode.toString()} onClick={toggleDarkMode} />
        </Tooltip>
      </Flowbite>

      <Dropdown
        label='Label'
        dismissOnClick={false}
        renderTrigger={() => (
          <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-user hover:cursor-pointer dark:text-white mt-2' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0' />
            <path d='M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2' />
          </svg>
        )}
      >
        <Dropdown.Header>
          <span className='block text-sm'>Usuario</span>
          <span className='block truncate text-sm font-medium'>{user?.nombre}</span>
        </Dropdown.Header>
        <Dropdown.Item onClick={logoutUser}>
          <icons.Logout />
          Cerrar Sesión
        </Dropdown.Item>
      </Dropdown>
    </div>
  )
}