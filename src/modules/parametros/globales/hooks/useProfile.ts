import { useMutation } from '@tanstack/react-query'
import { useInvalidate } from '../../../../shared/hooks/useInvalidate'
import { toast } from 'react-toastify'
import { FormPassword } from '../interfaces'
import { usuarioActions } from '..'

export const useProfile = () => {
  const invalidate = useInvalidate()

  const modifyPassword = useMutation({
    mutationFn: ({id, data}:{id: number, data: FormPassword}) => usuarioActions.modifyPassword(id, data),
    onSuccess: () => {
      toast.success('Contraseña modificada con exito')
      invalidate('usuarios')
    },
    onError: () => {
      toast.error('Error al modificada la contraseña')
    }
  })

  return { modifyPassword }
}
