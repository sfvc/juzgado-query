import { useEffect, useState } from 'react'
import { DarkThemeToggle, Dropdown, Flowbite, Tooltip } from 'flowbite-react'

function DropdownHeader () {
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
          <span className='block text-sm'>Usuario actual</span>
          <span className='block truncate text-sm font-medium'>Admin</span>
        </Dropdown.Header>
        <Dropdown.Item onClick={() => console.log('first')}>
          <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-logout dark:stroke-white mr-2' width='16' height='16' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#000000' fill='none' strokeLinecap='round' strokeLinejoin='round'>
            <path stroke='none' d='M0 0h24v24H0z' fill='none' />
            <path d='M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2' />
            <path d='M9 12h12l-3 -3' />
            <path d='M18 15l3 -3' />
          </svg>
          Cerrar Sesión
        </Dropdown.Item>
      </Dropdown>
    </div>
  )
}

export default DropdownHeader
