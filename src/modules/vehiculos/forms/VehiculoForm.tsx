import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useVehiculo } from '../hooks/useVehiculo'
import { vehiculoActions } from '..'
import { TitularInput } from '../components/TitularInput'
import { SearchableSelect } from '../../../shared'
import type { Color, FormVehiculo, IVehiculo, Marca, Tipo } from '../interfaces'

const SERVICIO_PUBLICO_ID = 50067

const validationSchema = yup.object({
  dominio: yup.string().required('El dominio es obligatorio'),
  titular_id: yup.number().nullable(),
  marca_id: yup.number().nullable(),
  tipo_id: yup.number().nullable(),
  color_id: yup.number().nullable(),
  modelo: yup.string(),
  numero_motor: yup.string(),
  numero_chasis:yup.string(),
  numero_taxi_remis: yup.string(),
})

interface Props {
  vehiculo: IVehiculo | null
  updateVehiculos: (vehiculo: IVehiculo) => void
  onSucces: () => void
}
  
const VehiculoForm = ({ vehiculo, onSucces, updateVehiculos }: Props) => {
  const [ editTitular, setEditTitular ] = useState<boolean>(false)
  const { createVehiculo, updateVehiculo } = useVehiculo()
  const [showInputTaxi, setShowInputTaxi] = useState<boolean>(vehiculo?.tipo?.id === SERVICIO_PUBLICO_ID)
  
  const { data, isLoading } = useQuery({
    queryKey: ['vehiculos-data'],
    queryFn: vehiculoActions.getDataVehiculo,
    staleTime: 1000 * 60 * 5
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormVehiculo>({
    defaultValues: { 
      dominio: vehiculo?.dominio || '',
      titular_id: vehiculo?.titular?.id || null,
      marca_id: vehiculo?.marca?.id || null,
      tipo_id: vehiculo?.tipo?.id || null,
      color_id: vehiculo?.color?.id || null,
      modelo: vehiculo?.modelo || '',
      numero_chasis: vehiculo?.numero_chasis || '',
      numero_motor: vehiculo?.numero_motor || '',
      numero_taxi_remis: vehiculo?.numero_taxi_remis || ''
    },
    resolver: yupResolver(validationSchema)
  })

  const onChangeTipoVehiculo = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = +e.target.value

    if (value === SERVICIO_PUBLICO_ID)
      setShowInputTaxi(true)
    else {
      setShowInputTaxi(false)
      setValue('numero_taxi_remis', '')
    }

    setValue(e.target.name as keyof FormVehiculo , value)
  }

  const onSubmit: SubmitHandler<FormVehiculo> = async (form: FormVehiculo) => {
    if (vehiculo) {
      await updateVehiculo.mutateAsync({ id: vehiculo.id, vehiculo: form })
      updateVehiculos({ ...vehiculo, ...form })
    } else {
      const nuevoVehiculo = await createVehiculo.mutateAsync(form)
      updateVehiculos(nuevoVehiculo)
    }
  
    onSucces()
  }
  
  if (isLoading) return <div className='flex justify-center'><Spinner size='lg'/></div>
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} >
      <div className='grid grid-cols-2 gap-4'>
        <TitularInput vehiculo={vehiculo} editTitular={editTitular} setEditTitular={setEditTitular} setValue={setValue} />
      
        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='dominio' value='Dominio' /><strong className='obligatorio'>(*)</strong>
          </div>
          <TextInput
            {...register('dominio')}
            type='text'
            placeholder='Dominio'
            helperText={errors?.dominio && errors?.dominio?.message} 
            color={errors?.dominio && 'failure'}
          />
        </div>

        <SearchableSelect<Marca>
          label="Marca"
          placeholder="Buscar marca"
          onSearch={(query: string) => vehiculoActions.getMarcas(query)}
          onSelect={(item: Marca) => setValue('marca_id', item.id)}
          renderItem={(item: Marca) => <div><strong>{item.nombre}</strong></div>}
          renderInput={(item) => { return `${item.nombre}`}}
          defaultValue={vehiculo?.marca?.nombre}
          resetInput={() => setValue('marca_id', null)}
        />

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='modelo' value='Modelo' />
          </div>
          <TextInput
            {...register('modelo')}
            type='text'
            placeholder='Modelo'
            helperText={errors?.modelo && errors?.modelo?.message} 
            color={errors?.modelo && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label htmlFor='tipo_id' value='Tipo de Vehiculo' />
          </div>
          <Select
            {...register('tipo_id', { valueAsNumber: true })}
            helperText={errors?.tipo_id && errors.tipo_id.message}
            color={errors?.tipo_id && 'failure'}
            onChange={(e) => onChangeTipoVehiculo(e)}
          >
            <option value='' hidden>Seleccione el tipo</option>
            {data?.tipo.map((tipo: Tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nombre}
              </option>
            ))}
          </Select>
        </div>

        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label htmlFor='color_id' value='Color' />
          </div>
          <Select
            {...register('color_id', { valueAsNumber: true })}
            helperText={errors?.color_id && errors.color_id.message}
            color={errors?.color_id && 'failure'}
          >
            <option value='' hidden>Seleccione el color</option>
            {data?.colores.map((color: Color) => (
              <option key={color.id} value={color.id}>
                {color.nombre}
              </option>
            ))}
          </Select>
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='numero_chasis' value='Numero de Chasis' />
          </div>
          <TextInput
            {...register('numero_chasis')}
            type='text'
            placeholder='Numero de Chasis'
            helperText={errors?.numero_chasis && errors?.numero_chasis?.message} 
            color={errors?.numero_chasis && 'failure'}
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='numero_motor' value='Numero de Motor' />
          </div>
          <TextInput
            {...register('numero_motor')}
            type='text'
            placeholder='Numero de Motor'
            helperText={errors?.numero_motor && errors?.numero_motor?.message} 
            color={errors?.numero_motor && 'failure'}
          />
        </div>

        {
          showInputTaxi && 
          <div className='mb-4'>
            <div className='mb-2 block dark:text-white'>
              <Label color='gray' htmlFor='numero_taxi_remis' value='Numero de Taxi/Remis' />
            </div>
            <TextInput
              {...register('numero_taxi_remis')}
              type='text'
              placeholder='Numero de Taxi'
              helperText={errors?.numero_taxi_remis && errors?.numero_taxi_remis?.message} 
              color={errors?.numero_taxi_remis && 'failure'}
            />
          </div>
        }
      </div>

      <div className='flex justify-end gap-2'>
        <Button color="failure" onClick={onSucces}>Cancelar</Button>

        <Button 
          size='md'
          type='button' 
          disabled={isSubmitting}
          isProcessing={isSubmitting}
          onClick={() => handleSubmit(onSubmit)()}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
      
    </form>
  )
}

export default VehiculoForm
