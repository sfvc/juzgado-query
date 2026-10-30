import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { actaActions } from '..'
import { useQueryParams, validateErrors } from '../../../shared'
import { useInvalidate } from '../../../shared/hooks/useInvalidate'
import type { IActaForm } from '../interfaces/form-interfaces'
import type { IActa } from '../interfaces'


export const useMutationActa = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const invalidate = useInvalidate()
  const { filters } = useQueryParams()

  const createActa = useMutation({
    mutationFn: actaActions.createActa,
    onSuccess: (data: IActa) => {
      navigate(`/actas?numero_acta=${data.numero_acta}`)
      toast.success('Acta creada con éxito')
      invalidate('all')
    },
    onError: (error) => {
      validateErrors(error, 'Error al crear acta')
    }
  })

  const updateActa = useMutation({
    mutationFn: ({ id, acta }: { id: number; acta: IActaForm }) =>
      actaActions.updateActa(id, acta),
    onSuccess: (data: IActa) => {
      navigate(`/actas?numero_acta=${data.numero_acta}`)
      toast.success('Acta actualizada con éxito')
      invalidate('all')
    },
    onError: (error) => {
      validateErrors(error, 'Error al actualizar acta')
    }
  })

  const deleteActa = useMutation({
    mutationFn: (id: number) => actaActions.deleteActa(id),
    onSuccess: () => {
      toast.success('Acta eliminada con éxito')
      queryClient.invalidateQueries({ queryKey: ['actas', { ...filters }] })
    },
    onError: () => {
      toast.error('Error al eliminar el acta')
    }
  })

  return {
    createActa,
    updateActa,
    deleteActa
  }
}
