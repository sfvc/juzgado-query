/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast, ToastOptions } from 'react-toastify'

interface Errors {
  errores?: Record<string, string[]>
  mensaje?: string
}

const options: ToastOptions = {
  containerId: 'custom',
  position: 'bottom-center',
  autoClose: 8000,
  hideProgressBar: true,
  theme: 'colored',
  icon: false,
  closeOnClick: true,
  className: 'custom-toast'
}

export const validateErrors = (error: any, message?: string) => {
  const response: Errors = error?.response?.data
  const { errores, mensaje } = response

  if (errores) {
    const [name, messages] = Object.entries(errores)[0]
  
    toast.error(
      <>
        <strong>Error!</strong> {mensaje}
        <br /> 
        {messages[0]}
      </>, 
      options
    )
  } else if( mensaje ) {
    toast.error(
      <>
        <strong>Error!</strong> {mensaje}
      </>,
      options
    )
  }
  else {
    toast.error(message ? message : 'Error al realizar la operación')
  }
}
