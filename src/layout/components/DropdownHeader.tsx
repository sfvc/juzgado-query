import { useContext, useEffect, useState } from 'react'
import { DarkThemeToggle, Dropdown, Flowbite, Tooltip } from 'flowbite-react'
import { AuthContext } from '../../context/Auth/AuthContext'
import { icons } from '../../shared'
import { useNavigate } from 'react-router-dom'

export const DropdownHeader = () => {
  const { user, logoutUser } = useContext(AuthContext)
  const navigate = useNavigate()

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
    <div className='flex justify-between md:justify-normal gap-2'>
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
        <Dropdown.Item
          disabled
          style={{
            pointerEvents: 'none',
            cursor: 'default',
            backgroundColor: 'transparent',
            color: 'inherit'
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='icon icon-tabler icons-tabler-outline icon-tabler-brand-apple-podcast mr-2'><path stroke='none' d='M0 0h24v24H0z' fill='none' /><path d='M18.364 18.364a9 9 0 1 0 -12.728 0' /><path d='M11.766 22h.468a2 2 0 0 0 1.985 -1.752l.5 -4a2 2 0 0 0 -1.985 -2.248h-1.468a2 2 0 0 0 -1.985 2.248l.5 4a2 2 0 0 0 1.985 1.752z' /><path d='M12 9m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' /></svg>
          {user?.nombre}
        </Dropdown.Item>
        <Dropdown.Item
          disabled
          style={{
            pointerEvents: 'none',
            cursor: 'default',
            backgroundColor: 'transparent',
            color: 'inherit'
          }}
        >
          <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='currentColor' className='icon icon-tabler icons-tabler-filled icon-tabler-rosette mr-2'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M12.01 2.011a3.2 3.2 0 0 1 2.113 .797l.154 .145l.698 .698a1.2 1.2 0 0 0 .71 .341l.135 .008h1a3.2 3.2 0 0 1 3.195 3.018l.005 .182v1c0 .27 .092 .533 .258 .743l.09 .1l.697 .698a3.2 3.2 0 0 1 .147 4.382l-.145 .154l-.698 .698a1.2 1.2 0 0 0 -.341 .71l-.008 .135v1a3.2 3.2 0 0 1 -3.018 3.195l-.182 .005h-1a1.2 1.2 0 0 0 -.743 .258l-.1 .09l-.698 .697a3.2 3.2 0 0 1 -4.382 .147l-.154 -.145l-.698 -.698a1.2 1.2 0 0 0 -.71 -.341l-.135 -.008h-1a3.2 3.2 0 0 1 -3.195 -3.018l-.005 -.182v-1a1.2 1.2 0 0 0 -.258 -.743l-.09 -.1l-.697 -.698a3.2 3.2 0 0 1 -.147 -4.382l.145 -.154l.698 -.698a1.2 1.2 0 0 0 .341 -.71l.008 -.135v-1l.005 -.182a3.2 3.2 0 0 1 3.013 -3.013l.182 -.005h1a1.2 1.2 0 0 0 .743 -.258l.1 -.09l.698 -.697a3.2 3.2 0 0 1 2.269 -.944z' />
          </svg>
          {user?.role?.name}
        </Dropdown.Item>

        <Dropdown.Item onClick={() => navigate('/profile')}>
          <span className='text-sm flex gap-2'><icons.Reset /> Resetear contraseña</span>
        </Dropdown.Item>

        <Dropdown.Item className='text-smflex gap-2' onClick={logoutUser}>
          <icons.Logout />
          Cerrar Sesión
        </Dropdown.Item>
      </Dropdown>
    </div>
  )
}