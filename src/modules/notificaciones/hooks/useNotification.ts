import { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { notificacionActions } from '..'
import { useInvalidate } from '../../../shared/hooks/useInvalidate'
import { ActuacionContext } from '../../../context/Actuacion/ActuacionContext'

export const useNotification = () => {
  const queryClient = useQueryClient()
  const invalidate = useInvalidate()
  const { resetProvider } = useContext(ActuacionContext)

  /* Mutations */
  const createNotification = useMutation({
    mutationFn: ({ selectedActas, plantillaId, userId }: { selectedActas: number[], plantillaId: number | null, userId: number }) =>
      notificacionActions.createNotification(selectedActas, plantillaId, userId),
    onSuccess: () => {
      toast.success('Notificación creada exitosamente')
      resetProvider()
      queryClient.invalidateQueries({ queryKey: ['actas'] })
    },
    onError: () => {
      toast.error('Error al crear la notificación')
    }
  })

  // Elimnar notificación relacionada al acta
  const deleteNotification = useMutation({
    mutationFn: ({ id }: { id: number }) => notificacionActions.deleteNotification(id),
    onSuccess: () => {
      toast.success('Notificación eliminada exitosamente')
      invalidate('all')
    },
    onError: () => {
      toast.error('Error al eliminar la notificación')
    }
  })

  // Elimnar notificación del historial de notificaciones
  const deleteNotificationHistory = useMutation({
    mutationFn: ({ id }: { id: number }) => notificacionActions.deleteNotificationHistory(id),
    onSuccess: () => {
      toast.success('Notificación eliminada exitosamente')
      invalidate('all')
    },
    onError: () => {
      toast.error('Error al eliminar la notificación')
    }
  })

  return { createNotification, deleteNotification, deleteNotificationHistory }
}
