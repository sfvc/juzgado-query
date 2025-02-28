 
import { toast, ToastOptions } from 'react-toastify'

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

export const showErrors = (message: string) => {
  return (
    toast.error(
      <>
        <strong>Error!</strong> {message}
      </>,
      options
    )
  )
}
