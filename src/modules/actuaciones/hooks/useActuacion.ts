
import { useParams } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { actuacionActions } from '..'
import { useInvalidate } from '../../../shared/hooks/useInvalidate'
import { useContext } from 'react'
import { ActuacionContext } from '../../../context/Actuacion/ActuacionContext'

export const useActuacion= () => {
  const { resetProvider } = useContext(ActuacionContext)
  const queryClient = useQueryClient()
  const invalidate = useInvalidate()
  const { id } = useParams() // Id de acta

  /* Mutations */
  const createActuacion = useMutation({
    mutationFn: actuacionActions.createActuacion,
    onSuccess: () => {
      toast.success('Actuación creada exitosamente')
      queryClient.invalidateQueries({ queryKey: ['acta-actuacion', {id}] })
      resetProvider()
    },
    onError: () => {
      toast.error('Error al crear actuación')
    }
  })

  const deleteActuacion = useMutation({
    mutationFn: ({ actaId, actuacionId }: { actaId: number, actuacionId: number }) => actuacionActions.deleteActuacion(actaId, actuacionId),
    onSuccess: () => {
      toast.success('Actuación eliminada exitosamente')
      queryClient.invalidateQueries({ queryKey: ['acta-actuacion', {id}] })
    },
    onError: () => {
      toast.error('Error al eliminar la actuación')
    }
  })

  // Elimnar notificación del historial de notificaciones
  const deleteActuacionHistory = useMutation({
    mutationFn: ({ id }: { id: number }) => actuacionActions.deleteActuacionHistory(id),
    onSuccess: () => {
      toast.success('Registro eliminado del historial')
      invalidate('all')
    },
    onError: () => {
      toast.error('Error al eliminar registro')
    }
  })

  // Generar comprobante de actuación
  const generateComprobante = useMutation({
    mutationFn: (id: number) => actuacionActions.generateComprobante(id), // Recibe el Id de actuacion
    onSuccess: () => {
      toast.success('Enviado a bandeja correctamente')
      queryClient.invalidateQueries({ queryKey: ['acta-actuacion', {id}] })
    },
    onError: () => {
      toast.error('Error al enviar')
    }
  })

  // Eliminar comprobante de actuación
  const deleteComprobante = useMutation({
    mutationFn: (id: number) => actuacionActions.deleteComprobante(id), // Recibe el Id de actuacion
    onSuccess: () => {
      toast.success('Eliminado de la bandeja correctamente')
      queryClient.invalidateQueries({ queryKey: ['acta-actuacion', {id}] })
    },
    onError: () => {
      toast.error('Error al eliminar')
    }
  })

  // Crear las cuotas de la actuación
  const createCuota = useMutation({
    mutationFn: ({ actuacionId, entrega, cuotas }: { actuacionId: number, entrega: string, cuotas: number }) =>
      actuacionActions.createCuota(actuacionId, entrega, cuotas),
    onSuccess: () => {
      toast.success('Cuotas generadas correctamente')
      queryClient.invalidateQueries({ queryKey: ['acta-actuacion', { id }] })
    },
    onError: () => {
      toast.error('Error al generar cuotas')
    }
  })

  return {
    createActuacion,
    deleteActuacion,
    deleteActuacionHistory,
    generateComprobante,
    deleteComprobante,
    createCuota
  }
}
