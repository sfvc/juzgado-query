import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { FormPassword } from '../interfaces'
import { usuarioActions } from '..'

export const useProfile = () => {
  const queryClient = useQueryClient()

  const modifyPassword = useMutation({
    mutationFn: ({id, data}:{id: number, data: FormPassword}) => usuarioActions.modifyPassword(id, data),
    onSuccess: () => {
      toast.success('Contraseña modificada con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al modificada la contraseña')
      console.log(error)
    }
  })

  return { modifyPassword }
}
