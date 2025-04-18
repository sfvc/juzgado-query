import { Button, Label, TextInput } from 'flowbite-react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import type { InfraccionesCometida } from '../interfaces'
import type { IUnidadMulta } from '../interfaces/sentencia'

const validationSchema = yup.object().shape({
  unidad: yup
    .number()
    .transform(value => isNaN(value) ? null : value)
    .min(0, 'La unidad debe ser mayor o igual a 0')
    .required('La unidad es requerida'),
})

interface Props {
  activeItem: InfraccionesCometida | null
  onCloseModal: () => void
  updateImporte: (data: IUnidadMulta) => void
}
  
export const UnidadForm = ({activeItem, onCloseModal, updateImporte}: Props) => {
  const { 
    reset,
    register, 
    handleSubmit, 
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      unidad: activeItem?.unidad || 0
    }
  })

  const onSuccess = () => {
    reset()
    onCloseModal()
  }

  const validateUnidad = (data: IUnidadMulta) => {
    if(!activeItem) return 

    if(data.unidad < activeItem?.valor_desde || data.unidad > activeItem?.valor_hasta) {
      setError('unidad', {message: 'El valor de unidad debe estar dentro del rango'})
      return false
    }

    return true
  }
    
  const onSubmit = async (data: IUnidadMulta) => {
    const validate = validateUnidad(data)
    if(!validate) return 

    updateImporte(data)
    onSuccess()
  }
      
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <div className='mb-2 block'>
          <Label htmlFor='unidad' value={ `Unidad (${activeItem?.valor_desde} - ${activeItem?.valor_hasta})` } />
        </div>
        <TextInput
          {...register('unidad')}
          type='number'
          placeholder='Unidad'
          min={0}
          helperText={errors?.unidad && errors?.unidad?.message} 
          color={errors?.unidad && 'failure'}
        />
      </div>

      <div className='flex justify-end'>
        <Button type='submit' className='px-8 titulos'>
            Guardar
        </Button>
      </div>
    </form>
  )
}
