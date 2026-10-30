import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { EstadoActaForm } from '../interfaces'
import { estadoActaActions } from '..'
import { useInvalidate } from '../../../shared/hooks/useInvalidate'

export const useMutationEstado = () => {
  const invalidate = useInvalidate()

  const createEstado = useMutation({
    mutationFn: ({ id, form }: { id: number, form: EstadoActaForm }) => estadoActaActions.createEstadoActa(id, form),
    onSuccess: () => {
      toast.success('Estado agregado con exito')
      invalidate('all')
    },
    onError: () => {
      toast.error('Error al cambiar el estado')
    }
  })

  const updateEstado = useMutation({
    mutationFn: ({ id, estadoActaId, form }: { id: number, estadoActaId: number, form: EstadoActaForm }) => estadoActaActions.updateEstadoActa(id, estadoActaId, form),
    onSuccess: () => {
      toast.success('Estado actualizado con exito')
      invalidate('all')
    },
    onError: () => {
      toast.error('Error al editar el estado')
    }
  })

  return { createEstado, updateEstado }
}
