import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Label, TextInput } from 'flowbite-react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormPropiedad, IPropiedad } from '../interfaces'
import { usePropiedad } from '../hooks/usePropiedad'

const validationSchema = yup.object().shape({
  matricula_catastral: yup.string().required('La matricula es requerida'),
  domicilio: yup.string().required('El domicilio es requerido'),
  propietario: yup.string().required('El propietario es requerido'),
})

interface Props {
  propiedad: IPropiedad | null
  onSucces: () => void
}
  
const PropiedadForm = ({ propiedad, onSucces }: Props) => {
  const { createPropiedad, updatePropiedad } = usePropiedad()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      matricula_catastral: propiedad?.matricula_catastral || '',
      domicilio: propiedad?.domicilio || '',
      propietario: propiedad?.propietario || '',
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormPropiedad> = async (data: FormPropiedad) => {
    console.log(data)
    if (propiedad) await updatePropiedad.mutateAsync({ id: propiedad.id, propiedad: data })
    else await createPropiedad.mutateAsync(data)
  
    onSucces()
  }

  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='matricula_catastral' value='Matricula' /><strong className='obligatorio'>(*)</strong>
        </div>
        <TextInput
          {...register('matricula_catastral')}
          placeholder='Matricula'
          type='text'
          helperText={errors?.matricula_catastral && errors.matricula_catastral.message}
          color={errors?.matricula_catastral && 'failure'}
        />
      </div>

      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='domicilio' value='Domicilio' />
        </div>
        <TextInput
          {...register('domicilio')}
          placeholder='Domicilio'
          type='text'
          helperText={errors?.domicilio && errors.domicilio.message}
          color={errors?.domicilio && 'failure'}
        />
      </div>

      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='propietario' value='Propietario' />
        </div>
        <TextInput
          {...register('propietario')}
          placeholder='Propietario'
          type='text'
          helperText={errors?.propietario && errors.propietario.message}
          color={errors?.propietario && 'failure'}
        />
      </div>

      <div className='flex justify-end'>
        <Button
          type='submit'
          size='md'
          disabled={isSubmitting}
          isProcessing={isSubmitting}
        >
          Guardar
        </Button>
      </div>
    </form>
  )
}

export default PropiedadForm
