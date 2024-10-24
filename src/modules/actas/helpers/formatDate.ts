import { UseFormSetValue } from 'react-hook-form'
import { ITransitoForm } from '../interfaces/form-interfaces'

export const formatDate = (value: string, setValue: UseFormSetValue<ITransitoForm>) => {
  const date = new Date(value)

  const prescripcionDate = new Date(date)
  prescripcionDate.setFullYear(prescripcionDate.getFullYear() + 2)

  const newDate = prescripcionDate.toISOString().split('T')[0]
  setValue('fecha_prescripcion', newDate)
}