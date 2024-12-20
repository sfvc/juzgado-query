import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react'
import { useQuery } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import type { FormLocalidad, IDepartamento, ILocalidad } from '../interfaces/localizacion'
import { departamentoActions } from '..'
import { useLocalidad } from '../hooks/useLocalidad'

const validationSchema = yup.object().shape({
  nombre: yup.string().required('La localidad es requerida'),
  departamento_id: yup.string().required('Debe seleccionar un departamento'),
  provincia_id: yup.string().nullable('Debe seleccionar una provincia')
})

interface Props {
  localidad: ILocalidad | null
    onSucces: () => void
  }
  
const LocalidadForm = ({ localidad, onSucces }: Props) => {
  const { createLocalidad, updateLocalidad } = useLocalidad()

  const { data: departamentos, isLoading } = useQuery({
    queryKey: ['departamentos', 'all'], 
    queryFn: departamentoActions.getAllDepartamentos,  
    staleTime: 1000 * 60 * 5, 
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nombre: localidad?.nombre || '',
      departamento_id: localidad?.departamento?.id?.toString() || '',
      provincia_id: localidad?.provincia_id?.toString() || '3'
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormLocalidad> = async (data: FormLocalidad) => {
    if (localidad) await updateLocalidad.mutateAsync({ id: localidad.id, localidad: data })
    else await createLocalidad.mutateAsync(data)
  
    onSucces()
  }

  if (isLoading) return <div className='flex justify-center'><Spinner size='lg'/></div>
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label
            color='gray'
            htmlFor='nombre'
            value='Localidad'
          />
        </div>
        
        <TextInput
          {...register('nombre')}
          placeholder='Nombre'
          helperText={errors?.nombre && errors?.nombre?.message} 
          color={errors?.nombre && 'failure'}
        />
      </div>

      <div className='mb-4'>
        <div className='mb-2 block'>
          <Label
            htmlFor='departamento_id'
            value='Departamento'
          />
          <strong className='obligatorio'>(*)</strong>
        </div>

        <Select {...register('departamento_id')} 
          helperText={errors?.departamento_id && errors?.departamento_id?.message} 
          color={errors?.departamento_id && 'failure'}
        >
          <option value='' hidden>Seleccione un departamento</option>
          {
            departamentos?.map((departamento: IDepartamento) => (
              <option key={departamento.id} value={departamento.id}>{departamento.nombre}</option>
            ))
          }

        </Select>
      </div>

      <div className='flex justify-end gap-2'>
        <Button color="failure" onClick={onSucces}>Cancelar</Button>
        <Button 
          size='md'
          type='submit' 
          color="gray"
          disabled={isSubmitting}
          isProcessing={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}

export default LocalidadForm
