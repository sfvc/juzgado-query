import { useContext } from 'react'
import { Dropdown } from 'flowbite-react'
import { AuthContext } from '../../context/Auth/AuthContext'
import { icons } from '../../shared'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../context/Theme/ThemeContext'
import { ThemeButton } from './ThemeButton'
import { RoleGuard, UserRole } from '../../auth'

export const DropdownHeader = () => {
  const { user, logoutUser } = useContext(AuthContext)
  const { theme, toggleTheme } = useContext(ThemeContext)
  const navigate = useNavigate()

  return (
    <div className='flex justify-between md:justify-normal gap-2'>
      <ThemeButton theme={theme} toggleTheme={toggleTheme} />

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
          <span className='block truncate text-sm font-medium'>{user?.nombre}</span>
          <span className='block text-sm font-medium'>{user?.juzgado?.nombre}</span>
          <span className='block text-sm'>{user?.role?.name}</span>
        </Dropdown.Header>

        <RoleGuard roles={[UserRole.ADMIN, UserRole.JUEZ]}>
          <Dropdown.Item onClick={() => navigate('/dashboard')}>
            <span className='text-sm flex gap-2'><icons.Dashboard /> Dashboard</span>
          </Dropdown.Item>
        </RoleGuard>

        <RoleGuard roles={[UserRole.ADMIN, UserRole.JUEZ]}>
          <Dropdown.Item onClick={() => navigate('/auditoria')}>
            <span className='text-sm flex gap-2'><icons.Auditoria /> Auditoria</span>
          </Dropdown.Item>
        </RoleGuard>

        <RoleGuard roles={[UserRole.ADMIN, UserRole.JUEZ]}>
          <Dropdown.Item onClick={() => navigate('/recaudacion')}>
            <span className='text-sm flex gap-2'><icons.Recaudacion /> Recaudación</span>
          </Dropdown.Item>
        </RoleGuard>

        <Dropdown.Item onClick={() => navigate('/profile')}>
          <span className='text-sm flex gap-2'><icons.Reset /> Cambiar contraseña</span>
        </Dropdown.Item>

        <Dropdown.Item className='text-smflex gap-2' onClick={logoutUser}>
          <icons.Logout />
          Cerrar Sesión
        </Dropdown.Item>
      </Dropdown>
    </div>
  )
}
