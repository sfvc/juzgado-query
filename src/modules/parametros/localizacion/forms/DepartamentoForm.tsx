import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react'
import { useQuery } from '@tanstack/react-query'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import type { IDepartamento, FormDepartamento, IProvincia } from '../interfaces/localizacion'
import { provinciaActions } from '..'
import { useDepartamento } from '../hooks/useDepartamento'
import { Loading } from '../../../../shared'

const validationSchema = yup.object().shape({
  nombre: yup.string().required('El departamento es requerido'),
  provincia_id: yup.string().required('Debe seleccionar una provincia')
})

interface Props {
    departamento: IDepartamento | null
    onSucces: () => void
  }
  
const DepartamentoForm = ({ departamento, onSucces }: Props) => {
  const { createDepartamento, updateDepartamento } = useDepartamento()

  const { data: provincias, isLoading } = useQuery({
    queryKey: ['provincias', 'all'], 
    queryFn: provinciaActions.getAllProvincias,  
    staleTime: 1000 * 60 * 5, 
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nombre: departamento?.nombre || '',
      provincia_id: departamento?.provincia?.id?.toString() || ''
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormDepartamento> = async (data: FormDepartamento) => {
    if (departamento) await updateDepartamento.mutateAsync({ id: departamento.id, departamento: data })
    else await createDepartamento.mutateAsync(data)
  
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
            value='Provincia'
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
            htmlFor='provincia_id'
            value='Provincia'
          />
          <strong className='obligatorio'>(*)</strong>
        </div>

        <Select {...register('provincia_id')} 
          helperText={errors?.provincia_id && errors?.provincia_id?.message} 
          color={errors?.provincia_id && 'failure'}
        >
          <option value='' hidden>Seleccione una provincia</option>
          {
            provincias?.map((provincia: IProvincia) => (
              <option key={provincia.id} value={provincia.id}>{provincia.nombre}</option>
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

export default DepartamentoForm
