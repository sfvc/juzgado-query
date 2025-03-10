// import { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Dropdown, Footer, Navbar, Button, MegaMenu } from 'flowbite-react'
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

          <Link to='/notificaciones' className='dark:text-white p-2 hover:text-blue-700 dark:hover:text-blue-400'>
            Notificaciones
          </Link>

          <Link to='/acumuladas' className='dark:text-white p-2 hover:text-blue-700 dark:hover:text-blue-400'>
            Acumuladas
          </Link>

          <MegaMenu className='dark:text-white p-2 hover:text-blue-700 dark:hover:text-blue-400'>
            <MegaMenu.Dropdown toggle={<>Creación</>}>
              <ul className="grid grid-cols-2">
                <div className="space-y-4 p-4 text-black">
                  <li>
                    <Link to='/vehiculos' className='dark:text-white hover:text-blue-700 dark:hover:text-blue-400'>
                      Vehículos
                    </Link>
                  </li>

                  <li>
                    <Link to='/personas' className='dark:text-white hover:text-blue-700 dark:hover:text-blue-400'>
                      Personas
                    </Link>
                  </li>

                  <li>
                    <Link to='/inhabilitados' className='dark:text-white hover:text-blue-700 dark:hover:text-blue-400'>
                      Inhabilitados
                    </Link>
                  </li>

                  <li>
                    <Link to='/plantillas' className='dark:text-white hover:text-blue-700 dark:hover:text-blue-400'>
                      Plantillas
                    </Link>
                  </li>
                </div>

                <RoleGuard roles={[UserRole.ADMIN, UserRole.JEFE, UserRole.JUEZ, UserRole.SECRETARIO]}>
                  <div className="space-y-4 p-4 text-black">
                    <li>
                      <Link to='/estados' className='dark:text-white hover:text-blue-700 dark:hover:text-blue-400'>
                    Estados
                      </Link>
                    </li>

                    <li>
                      <Link to='/juzgados' className='dark:text-white hover:text-blue-700 dark:hover:text-blue-400'>
                    Juzgados
                      </Link>
                    </li>

                    <li>
                      <Link to='/usuarios' className='dark:text-white hover:text-blue-700 dark:hover:text-blue-400'>
                    Usuarios
                      </Link>
                    </li>

                    <li>
                      <Link to='/unidades' className='dark:text-white hover:text-blue-700 dark:hover:text-blue-400'>
                    Ud. de Multa
                      </Link>
                    </li>
                  </div>
                </RoleGuard>
              </ul>
            </MegaMenu.Dropdown>
          </MegaMenu>

          <RoleGuard roles={[UserRole.ADMIN, UserRole.JEFE, UserRole.JUEZ, UserRole.SECRETARIO]}>
            <MegaMenu className='dark:text-white p-2 hover:text-blue-700 dark:hover:text-blue-400'>
              <MegaMenu.Dropdown toggle={<>Parámetros</>}>
                <ul className="grid grid-cols-3">
                  <div className="space-y-4 p-4 text-black">
                    <li>
                      <Link to='/articulos' className='dark:text-white hover:text-blue-700 dark:hover:text-blue-400'>
                        Articulos
                      </Link>
                    </li>

                    <li>
                      <Link to='/propiedades' className='dark:text-white hover:text-blue-700 dark:hover:text-blue-400'>
                        Propiedades
                      </Link>
                    </li>

                    <li>
                      <Link to='/rubros' className='dark:text-white hover:text-blue-700 dark:hover:text-blue-400'>
                        Rubros
                      </Link>
                    </li>
                  </div>

                  <div className="space-y-4 p-4 text-black">
                    <li>
                      <Link to='/paises' className='dark:text-white hover:text-blue-700 dark:hover:text-blue-400'>
                       Países
                      </Link>
                    </li>

                    <li>
                      <Link to='/provincias' className='dark:text-white hover:text-blue-700 dark:hover:text-blue-400'>
                        Provincias
                      </Link>
                    </li>

                    <li>
                      <Link to='/departamentos' className='dark:text-white hover:text-blue-700 dark:hover:text-blue-400'>
                        Departamentos
                      </Link>
                    </li>
                  </div>

                  <div className="space-y-4 p-4 text-black">
                    <li>
                      <Link to='/localidades' className='dark:text-white hover:text-blue-700 dark:hover:text-blue-400'>
                        Localidades
                      </Link>
                    </li>

                    <li>
                      <Link to='/barrios' className='dark:text-white hover:text-blue-700 dark:hover:text-blue-400'>
                        Barrios
                      </Link>
                    </li>

                    <li>
                      <Link to='/nacionalidades' className='dark:text-white hover:text-blue-700 dark:hover:text-blue-400'>
                        Nacionalidades
                      </Link>
                    </li>
                  </div>
                </ul>
              </MegaMenu.Dropdown>
            </MegaMenu>
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
