import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Label, TextInput } from 'flowbite-react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FormPropiedad, IPropiedad } from '../interfaces'
import { usePropiedad } from '../hooks/usePropiedad'
import { cleanMatricula, formatMatricula } from '../../../../shared/helpers/utilsMatricula'

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

  const onChangeMatricula = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedMatricula = formatMatricula(e.target.value)

    setValue(e.target.name as keyof FormPropiedad, formattedMatricula || '')
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      matricula_catastral: formatMatricula(propiedad?.matricula_catastral || ''),
      domicilio: propiedad?.domicilio || '',
      propietario: propiedad?.propietario || '',
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormPropiedad> = async (data: FormPropiedad) => {
    const matricula = cleanMatricula(data.matricula_catastral)
    const form = {...data, matricula_catastral: matricula}

    if (propiedad) await updatePropiedad.mutateAsync({ id: propiedad.id, propiedad: form })
    else await createPropiedad.mutateAsync(form)
  
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
          onChange={(e) => onChangeMatricula(e)}
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
          size='md'
          type='button' 
          color="gray"
          disabled={isSubmitting}
          isProcessing={isSubmitting}
          onClick={() => handleSubmit(onSubmit)()}
        >
          Guardar
        </Button>
      </div>
    </form>
  )
}

export default PropiedadForm
