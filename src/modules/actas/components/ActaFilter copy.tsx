import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Label, Select, TextInput } from 'flowbite-react'
import { AdvanceFilter } from './AdvanceFilter'
import { ActaTable } from './ActaTable'
import { actaActions } from '..'
import { SearchInput } from '../../../shared'
import { personaActions } from '../../personas'
import { vehiculoActions } from '../../vehiculos'
import { useActa } from '../hooks/useActa'
import { NotificacionConfig } from '../../notificaciones/components/NotificacionConfig'
import { SkeletonFilter } from './SkeletonFilter'
import { PATH } from '../constants'
import type { IVehiculo } from '../../vehiculos/interfaces'
import type { IPersona } from '../../personas/interfaces'
import type { ActaFilterForm, DataFilters, EstadoActa } from '../interfaces'

export const ActaFilter = () => {
  const [searchParams] = useSearchParams()
  const [skipNavigate, setSkipNavigate] = useState<boolean>(false) 
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const params = Object.fromEntries(searchParams.entries())
  const filters = {...params, page: +params?.page || 1}

  const { actas, pagination, isFetching, filterParams, formFilter, resetFilter } = useActa(filters)

  const { data, isSuccess }  = useQuery<DataFilters>({
    queryKey: ['actas-data'],
    queryFn: actaActions.getDataFilter,
    staleTime: 1000 * 60 * 5
  })

  const { 
    register, 
    reset,
    setValue,
    handleSubmit 
  } = useForm<ActaFilterForm>()
  
  // Buscardor de Personas
  const searchPersona = async (query: string) => personaActions.getPersonasByFilter(query)
  const selectPersona = (persona: IPersona) => {
    setValue('infractor_id', persona.id.toString())
    localStorage.setItem('infractor', `${persona.apellido} - DNI. ${persona?.numero_documento || 'NO REGISTRADO'}`)
  }

  // Buscardor de Vehiculos
  const searchVehiculo = async (query: string) => vehiculoActions.getVehiculosByFilter(query)
  const selectVehiculo = (vehiculo: IVehiculo) => {
    setValue('vehiculo_id', vehiculo.id.toString())
    localStorage.setItem('vehiculo', `${vehiculo.dominio} - ${vehiculo?.titular?.apellido || 'SIN TITULAR'}`)
  }

  const clearFilters = () => {
    reset() // Resetear formulario
    resetFilter({ page: 1 }) // Resetear filtros internos
    setSkipNavigate(true) // Prevenir navegación en el useEffect
    navigate({ pathname, search: '',  }) // Limpiar la URL

    localStorage.removeItem('infractor')
    localStorage.removeItem('vehiculo')
    localStorage.removeItem('infraccion')
  }

  const submit: SubmitHandler<ActaFilterForm> = async (data: ActaFilterForm) =>  {
    formFilter({...data, page: 1 })
  }

  // TODO: No busca por numero de causa debido a que se agregan caracteres en la url no deseados
  useEffect(() => {
    if (filterParams && !skipNavigate) {
      Object.entries(filterParams).forEach(([key, value]) => {
        searchParams.set(key, value.toString())
      })

      navigate({ pathname, search: searchParams.toString() })
    } 

    Object.entries(filterParams).forEach(([key,value]) => {
      setValue(key as keyof ActaFilterForm, value)
    })

    // Volver a habilitar la navegación
    if (skipNavigate) { setSkipNavigate(false) }

  }, [filterParams])
  
  return (
    <React.Fragment>
      <div className='titulos rounded-md py-2 text-center'>
        <h3 className='text-xl font-semibold text-white'>Administración de Actas</h3>
      </div>

      {/* // TODO: Sacar formulario afuera */ }
      <form onSubmit={ handleSubmit(submit) }>
        {
          !isSuccess
            ? <SkeletonFilter />
            :
            <>
              {/* Filtros */}
              <div className='grid md:grid-cols-2 gap-4 grid-cols-1 mt-2'>
                {
                  localStorage.getItem('infractor') 
                    ? 
                    <div className='mb-4'>
                      <div className='mb-2 block'>
                        <Label htmlFor='infractor' value='Infractor' />
                      </div>
                      <TextInput id='infractor' readOnly value={localStorage.getItem('infractor') || ''} />
                    </div> 
                    : 
                    <SearchInput<IPersona>
                      label="Infractor"
                      placeholder="Buscar persona"
                      onSearch={searchPersona}
                      onSelect={selectPersona}
                      renderItem={(item) => (
                        <div><strong>{item.apellido}</strong> - DNI. {item?.numero_documento || 'NO REGISTRADO'}</div>
                      )}
                      renderInput={(item) => { return `${item.apellido} - DNI. ${item?.numero_documento || 'NO REGISTRADO'}`} }
                    />
                }

                <div className='mb-4 relative'>
                  <div className='mb-2 block'>
                    <Label htmlFor='numero_acta' value='Número de Acta' />
                  </div>
                  <TextInput
                    {...register('numero_acta')}
                    id='numero_acta'
                    placeholder='Filtrar por número de acta'
                  />
                </div>
        
                <div className='mb-4'>
                  <div className='mb-2 block'>
                    <Label htmlFor='estado_id' value='Estados' />
                  </div>
                  <Select {...register('estado_id')} value={filterParams?.estado_id} >
                    <option value='' hidden>Filtrar por estado</option>
                    {
                      data?.estadosActa?.map((estado: EstadoActa) => (
                        <option key={estado.id} value={estado.id} >{estado.nombre}</option>
                      ))
                    }
                  </Select>

                </div>

                <div className='mb-4'>
                  <div className='mb-2 block'>
                    <Label htmlFor='tipo_acta_id' value='Tipo de Acta'/>
                  </div>
                  <Select {...register('tipo_acta_id')} disabled={!data?.tiposActa?.length}>
                    <option value='' hidden>Filtrar por tipo de acta</option>
                    {
                      data?.tiposActa?.map((tipoActa: string, index: number) => (
                        <option key={index} value={tipoActa}>{tipoActa}</option>
                      ))
                    }
                  </Select>
                </div>

                <div className='mb-4'>
                  <div className='mb-2 block'>
                    <Label htmlFor='fecha_desde' value='Fecha Desde' />
                  </div>
                  <TextInput
                    {...register('fecha_desde')}
                    name='fecha_desde'
                    placeholder='Ingrese la fecha de acta'
                    type='date'
                  />
                </div>

                <div className='mb-4'>
                  <div className='mb-2 block'>
                    <Label htmlFor='fecha_hasta' value='Fecha Hasta' />
                  </div>
                  <TextInput
                    {...register('fecha_hasta')}
                    placeholder='Ingrese la fecha de acta'
                    type='date'
                  />
                </div>

                <div className='mb-4 relative'>
                  <div className='mb-2 block'>
                    <Label htmlFor='numero_causa'value='Número de Causa' />
                  </div>
                  <TextInput
                    {...register('numero_causa')}
                    id='numero_causa'
                    placeholder='Filtrar por número de causa'
                  />
                </div>

                {
                  localStorage.getItem('vehiculo') 
                    ? 
                    <div className='mb-4'>
                      <div className='mb-2 block'>
                        <Label htmlFor='vehiculo' value='Patente' />
                      </div>
                      <TextInput
                        id='vehiculo'
                        value={localStorage.getItem('vehiculo') || ''}
                        readOnly
                      />
                    </div> 
                    : 
                    <SearchInput<IVehiculo>
                      label="Patente"
                      placeholder="Buscar vehiculo"
                      onSearch={searchVehiculo}
                      onSelect={selectVehiculo}
                      renderItem={(item) => (
                        <div><strong>{item.dominio}</strong> - {item?.titular?.apellido || 'SIN TITULAR'}</div>
                      )}
                      renderInput={(item) => { return `${item.dominio} - ${item?.titular?.apellido || 'SIN TITULAR'}`} }
                    />
                }
              </div>
            
              {/* Filtros avanzados */}
              <AdvanceFilter register={register} prioridades={data?.prioridades} setValue={setValue}/>
            </>
        }

        <div className='flex justify-end gap-4 mb-4'>
          <Button type='button' color='gray' className='px-6' onClick={() => clearFilters()}>
            Limpiar Filtros
          </Button>

          <Button type='submit' className='px-6' disabled={isFetching}>
            Consultar
          </Button>
        </div>
      </form>

      {/* Configuracion de notificaciones */}
      {pathname === PATH.NOTIFICATION && <NotificacionConfig />}

      {/* Tabla de actas filtradas */}
      <ActaTable actas={actas} isFetching={isFetching} pagination={pagination} formFilter={formFilter}/>
    </React.Fragment>
  )
}
