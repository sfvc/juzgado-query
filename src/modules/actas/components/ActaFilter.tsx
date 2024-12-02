import React, { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button} from 'flowbite-react'
import { AdvanceFilter } from './AdvanceFilter'
import { ActaTable } from './ActaTable'
import { actaActions } from '..'
import { useActa } from '../hooks/useActa'
import { NotificacionConfig } from '../../notificaciones/components/NotificacionConfig'
import { SkeletonFilter } from './SkeletonFilter'
import { PATH } from '../constants'
import type { ActaFilterForm, DataFilters,  } from '../interfaces'
import { FormFilter } from './FormFilter'

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
            <div>
              {/* Filtros */}
              <FormFilter register={register} setValue={setValue} filterParams={filterParams} data={data} />
            
              {/* Filtros avanzados */}
              <AdvanceFilter register={register} prioridades={data?.prioridades} setValue={setValue}/>
            </div>
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
