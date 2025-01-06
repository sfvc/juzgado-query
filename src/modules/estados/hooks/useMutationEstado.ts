import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { EstadoActaForm } from '../interfaces'
import { estadoActaActions } from '..'

export const useMutationEstado = () => {
  const queryClient = useQueryClient()

  /* Mutations */
  const createEstado = useMutation({
    mutationFn: ({ id, form }: { id: number, form: EstadoActaForm }) => estadoActaActions.createEstadoActa(id, form),
    onSuccess: () => {
      toast.success('Estado agregado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al cambiar el estado')
      console.log(error)
    }
  })

  const updateEstado = useMutation({
    mutationFn: ({ id, estadoActaId, form }: { id: number, estadoActaId: number, form: EstadoActaForm }) => estadoActaActions.updateEstadoActa(id, estadoActaId, form),
    onSuccess: () => {
      toast.success('Estado actualizado con exito')
      queryClient.clear()
    },
    onError: (error) => {
      toast.error('Error al editar el estado')
      console.log(error)
    }
  })
  
  return { createEstado, updateEstado }
}
