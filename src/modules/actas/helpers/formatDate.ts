import { UseFormSetValue } from 'react-hook-form'
import { IActaForm } from '../interfaces/form-interfaces'

export const formatDate = (value: string, setValue: UseFormSetValue<IActaForm>) => {
  const date = new Date(value)

  const prescripcionDate = new Date(date)
  prescripcionDate.setFullYear(prescripcionDate.getFullYear() + 2)

  const newDate = prescripcionDate.toISOString().split('T')[0]
  setValue('fecha_prescripcion', newDate)
}