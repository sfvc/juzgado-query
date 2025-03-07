// import { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Dropdown, Footer, Navbar } from 'flowbite-react'
// import { ThemeContext } from '../context/Theme/ThemeContext'
import { RoleGuard, UserRole } from '../auth'
import { ToastContainer } from 'react-toastify'
import { DropdownHeader } from './'
// import logoDark from '../assets/images/logo-capital-dark.webp'
// import logoLight from '../assets/images/logo-capital-light.webp'
import 'react-toastify/dist/ReactToastify.css'

export const Layout = () => {
  // const { theme } = useContext(ThemeContext)
  
  return (
    <div className='flex flex-col min-h-screen dark:bg-dark'>
      <ToastContainer />

      <Navbar fluid rounded className='w-10/12 m-auto sm:px-0'>

        {/* <Link to='/'>
          <img src={ theme === 'light' ? logoLight : logoDark} 
            alt='Logo Juzgado' 
            className='w-48 md:w-40 inline-block mx-auto pointer-events-none' 
          />
        </Link> */}

        <Link to="/">
          <h1 className="text-xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-2xl shadow-lg transition-transform transform group-hover:scale-105">
            Sistema de Prueba 
          </h1>
        </Link>

        <div className='flex md:order-2'>
          <DropdownHeader />
        </div>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Link to='/' className='dark:text-white p-2 hover:text-blue-700 dark:hover:text-blue-400'>
            Administrador de Actas
          </Link>

          <Link to='/vehiculos' className='dark:text-white p-2 hover:text-blue-700 dark:hover:text-blue-400'>
            Vehículos
          </Link>

          <Link to='/personas' className='dark:text-white p-2 hover:text-blue-700 dark:hover:text-blue-400'>
            Personas
          </Link>

          <Link to='/notificaciones' className='dark:text-white p-2 hover:text-blue-700 dark:hover:text-blue-400'>
            Notificaciones
          </Link>

          <Link to='/acumuladas' className='dark:text-white p-2 hover:text-blue-700 dark:hover:text-blue-400'>
            Acumuladas
          </Link>

          <Link to='/inhabilitados' className='dark:text-white p-2 hover:text-blue-700 dark:hover:text-blue-400'>
            Inhabilitados
          </Link>

          <Link to='/plantillas' className='dark:text-white p-2 hover:text-blue-700 dark:hover:text-blue-400'>
            Plantillas
          </Link>

          <RoleGuard roles={[UserRole.ADMIN, UserRole.JEFE, UserRole.JUEZ, UserRole.SECRETARIO]}>
            <div className='flex md:order-2 dark:text-white p-2 hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer'>
              <Dropdown label='Parámetros' inline>
                <div className='flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white'>
                  <Dropdown label='Actas' placement='right' inline>
                    <Link to='/articulos'>
                      <Dropdown.Item>Articulos</Dropdown.Item>
                    </Link>

                    <Dropdown.Divider />

                    <Link to='/propiedades'>
                      <Dropdown.Item>Propiedades</Dropdown.Item>
                    </Link>

                    <Dropdown.Divider />

                    <Link to='/rubros'>
                      <Dropdown.Item>Rubros</Dropdown.Item>
                    </Link>
                  </Dropdown>
                </div>

                <Dropdown.Divider />

                <div className='flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white'>
                  <Dropdown label='Localización' placement='right' inline>

                    <Link to='/paises'>
                      <Dropdown.Item>Países</Dropdown.Item>
                    </Link>

                    <Dropdown.Divider />

                    <Link to='/provincias'>
                      <Dropdown.Item>Provincias</Dropdown.Item>
                    </Link>

                    <Dropdown.Divider />

                    <Link to='/departamentos'>
                      <Dropdown.Item>Departamentos</Dropdown.Item>
                    </Link>

                    <Dropdown.Divider />

                    <Link to='/localidades'>
                      <Dropdown.Item>Localidades</Dropdown.Item>
                    </Link>

                    <Dropdown.Divider />

                    <Link to='/barrios'>
                      <Dropdown.Item>Barrios</Dropdown.Item>
                    </Link>

                    <Dropdown.Divider />

                    <Link to='/nacionalidades'>
                      <Dropdown.Item>Nacionalidades</Dropdown.Item>
                    </Link>

                  </Dropdown>
                </div>

                <Dropdown.Divider />

                <Link to='/estados'>
                  <Dropdown.Item>Estados</Dropdown.Item>
                </Link>

                <Dropdown.Divider />

                <Link to='/juzgados'>
                  <Dropdown.Item>Juzgados</Dropdown.Item>
                </Link>

                <Dropdown.Divider />

                <Link to='/usuarios'>
                  <Dropdown.Item>Usuarios</Dropdown.Item>
                </Link>

                <Dropdown.Divider />

                <Link to='/unidades'>
                  <Dropdown.Item>Ud. de Multa</Dropdown.Item>
                </Link>
              </Dropdown>
            </div>
          </RoleGuard>
        </Navbar.Collapse>

      </Navbar>
      
      <main className='flex-grow w-10/12 m-auto dark:bg-dark'>
        <Outlet />
      </main>

      <Footer container className='rounded-none shadow-none w-10/12 m-auto sm:px-0'>
        <Footer.Copyright
          by='Municipalidad de la Ciudad de San Fernando Del Valle de Catamarca'
          href='https://www.catamarcaciudad.gob.ar'
          year={(new Date().getFullYear())}
        />
      </Footer>
    </div>
  )
}
