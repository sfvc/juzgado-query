import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { validateErrors } from '../helpers/validateErrors'
import { QueryGroup, useInvalidate } from './useInvalidate'

interface Options<TForm, K extends string, TCreate, TUpdate, TRemove> {
  actions: {
    create: (form: TForm) => Promise<TCreate>
    update: (id: number, form: TForm) => Promise<TUpdate>
    remove: (id: number) => Promise<TRemove>
  }
  /** Grupo de queries que se refrescan al modificar el recurso */
  group: QueryGroup
  /** Nombre de la propiedad que lleva el formulario en `update.mutateAsync({ id, [entity]: form })` */
  entity: K
  /** Nombre visible del recurso en los mensajes. Ej: 'Rubro' */
  label: string
  /** Para concordar los mensajes: 'creada' / 'la' en lugar de 'creado' / 'el' */
  feminine?: boolean
  /** Mostrar los errores de validacion del backend al crear y editar */
  validate?: boolean
}

/**
 * Mutaciones de alta, edicion y baja con sus toasts y la invalidacion de la cache.
 * Cada hook de recurso solo declara sus acciones y mensajes.
 */
export const useCrudMutations = <TForm, K extends string, TCreate, TUpdate, TRemove>({
  actions,
  group,
  entity,
  label,
  feminine = false,
  validate = false
}: Options<TForm, K, TCreate, TUpdate, TRemove>) => {
  const invalidate = useInvalidate()

  const o = feminine ? 'a' : 'o'
  const articulo = feminine ? 'la' : 'el'
  const nombre = label.toLowerCase()

  const onError = (action: string, withValidation: boolean) => (error: unknown) => {
    const message = `Error al ${action} ${articulo} ${nombre}`
    if (withValidation) validateErrors(error, message)
    else toast.error(message)
  }

  const create = useMutation({
    mutationFn: (form: TForm) => actions.create(form),
    onSuccess: () => {
      toast.success(`${label} cread${o} con exito`)
      invalidate(group)
    },
    onError: onError('crear', validate)
  })

  const update = useMutation({
    mutationFn: (params: { id: number } & Record<K, TForm>) => actions.update(params.id, params[entity]),
    onSuccess: () => {
      toast.success(`${label} actualizad${o} con exito`)
      invalidate(group)
    },
    onError: onError('actualizar', validate)
  })

  const remove = useMutation({
    mutationFn: (id: number) => actions.remove(id),
    onSuccess: () => {
      toast.success(`${label} eliminad${o} con exito`)
      invalidate(group)
    },
    onError: onError('eliminar', false)
  })

  return { create, update, remove }
}
