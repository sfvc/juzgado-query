import { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Navbar, MegaMenu } from 'flowbite-react'
import { ThemeContext } from '../context/Theme/ThemeContext'
import { RoleGuard, UserRole } from '../auth'
import { ToastContainer } from 'react-toastify'
import { DropdownHeader, NavItem } from './'
import logoDark from '../assets/images/logo-capital-dark.webp'
import logoLight from '../assets/images/logo-capital-light.webp'
import 'react-toastify/dist/ReactToastify.css'

export const Layout = () => {
  const { theme } = useContext(ThemeContext)

  return (
    <div className='flex flex-col min-h-screen dark:bg-dark'>
      <ToastContainer />

      <Navbar fluid rounded className='w-10/12 m-auto sm:px-0'>

        <NavItem to="/">
          <img src={ theme === 'light' ? logoLight : logoDark}
            alt='Logo Juzgado'
            className='w-48 md:w-40 inline-block mx-auto pointer-events-none'
          />
        </NavItem>

        {/* <NavItem to="/">
          <h1 className="text-xl font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-2xl shadow-lg transition-transform transform group-hover:scale-105">
            Sistema de Prueba
          </h1>
        </NavItem> */}

        <div className='flex md:order-2'>
          <DropdownHeader />
        </div>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <NavItem to="/actas">Administrador de Actas</NavItem>

          <NavItem to="/acumuladas">Acumuladas</NavItem>

          <NavItem to="/notificaciones">Notificaciones</NavItem>

          <NavItem to="/inhabilitados">Inhabilitados</NavItem>

          <NavItem to="/plantillas">Plantillas</NavItem>

          {/* <NavItem to="/libre-deuda">Libre Deuda</NavItem> */}

          <MegaMenu className='dark:text-white p-2 hover:text-blue-700 dark:hover:text-blue-400'>
            <MegaMenu.Dropdown toggle={<>Parámetros</>}>
              <ul className="grid grid-cols-3">
                <div className="space-y-4 p-4 text-black">
                  <li>
                    <NavItem to="/vehiculos">Vehículos</NavItem>
                  </li>

                  <li>
                    <NavItem to="/personas">Personas</NavItem>
                  </li>

                  <li>
                    <NavItem to="/estados">Estados</NavItem>
                  </li>
                </div>

                <div className="space-y-4 p-4 text-black">
                  <li>
                    <NavItem to="/articulos">Artículos</NavItem>
                  </li>

                  <li>
                    <NavItem to="/propiedades">Propiedades</NavItem>
                  </li>

                  <li>
                    <NavItem to="/rubros">Rubros</NavItem>
                  </li>
                </div>

                <RoleGuard roles={[UserRole.ADMIN, UserRole.JEFE, UserRole.JUEZ, UserRole.SECRETARIO]}>
                  <div className="space-y-4 p-4 text-black">
                    <li>
                      <NavItem to="/juzgados">Juzgados</NavItem>
                    </li>

                    <li>
                      <NavItem to="/usuarios">Usuarios</NavItem>
                    </li>

                    <li>
                      <NavItem to="/unidades">Ud. de Multa</NavItem>
                    </li>
                  </div>
                </RoleGuard>
              </ul>
            </MegaMenu.Dropdown>
          </MegaMenu>

          <RoleGuard roles={[UserRole.ADMIN, UserRole.JEFE, UserRole.JUEZ, UserRole.SECRETARIO]}>
            <MegaMenu className='dark:text-white p-2 hover:text-blue-700 dark:hover:text-blue-400'>
              <MegaMenu.Dropdown toggle={<>Domicilio</>}>
                <ul className="grid grid-cols-2">
                  <div className="space-y-4 p-4 text-black">
                    <li>
                      <NavItem to="/paises">Países</NavItem>
                    </li>

                    <li>
                      <NavItem to="/provincias">Provincias</NavItem>
                    </li>

                    <li>
                      <NavItem to="/departamentos">Departamentos</NavItem>
                    </li>
                  </div>

                  <div className="space-y-4 p-4 text-black">
                    <li>
                      <NavItem to="/localidades">Localidades</NavItem>
                    </li>

                    <li>
                      <NavItem to="/barrios">Barrios</NavItem>
                    </li>

                    <li>
                      <NavItem to="/nacionalidades">Nacionalidades</NavItem>
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
