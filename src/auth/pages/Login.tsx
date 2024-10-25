import { ToastContainer } from 'react-toastify'
import { LoginForm } from '../forms/LoginForm'
import loginJuzgado from '../../assets/images/login-juzgado.jpeg'
import logoJuzgado from '../../assets/images/logo-juzgado.png'

export const Login = () => {
  return (
    <>
      <ToastContainer />
      <div className='loginwrapper'>
        <div className='lg-inner-column'>
          <div className='left-column relative z-[1]'>
            <div className='h-full w-full pointer-events-none'>
              <img
                src={loginJuzgado}
                alt='Imagen del Juzgado'
                className='h-full w-full'
              />
            </div>
          </div>
          <div className='right-column relative bg-gray-100 dark:bg-dark'>
            <div className='inner-content h-full flex flex-col'>
              <div className='auth-box h-full flex flex-col justify-center'>
                <img src={logoJuzgado} 
                  alt='Logo del Juzgado' 
                  className='w-48 md:w-64 pb-6 inline-block mx-auto pointer-events-none' 
                />
                <div className='text-center 2xl:mb-10 mb-4'>
                  <h4 className='font-bold dark:text-white'>Iniciar Sesión</h4>
                  <div className='text-slate-500 text-base dark:text-white/50'>
                    Completa los datos para ingresar al sistema
                  </div>
                </div>
                <LoginForm />
              </div>
              <div className='auth-footer text-center'>
                Copyright &copy; <span>{(new Date().getFullYear())}</span>, Municipalidad de la Ciudad de San Fernando Del Valle de Catamarca.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
