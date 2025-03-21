import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button} from 'flowbite-react'
import { AuthContext, UserContext } from '../../../context/Auth/AuthContext'
import { ActuacionContext } from '../../../context/Actuacion/ActuacionContext'
import { AdvanceFilter } from './AdvanceFilter'
import { ActaTable } from './ActaTable'
import { actaActions } from '..'
import { useActa } from '../hooks/useActa'
import { NotificacionConfig } from '../../notificaciones/components/NotificacionConfig'
import { GenerateActuacionMultiple } from '../../actuaciones/components/GenerateActuacionMultiple'
import { SkeletonFilter } from './SkeletonFilter'
import { PATH } from '../constants'
import { FormFilter } from './FormFilter'
import { icons, useQueryParams } from '../../../shared'
import type { ActaFilterForm, DataFilters,  } from '../interfaces'

export const ActaFilter = () => {
  const { filters } = useQueryParams()
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const [skipNavigate, setSkipNavigate] = useState<boolean>(false) 
  const [resetForm, setResetForm] = useState<boolean>(false) 

  const { user } = useContext<UserContext>(AuthContext)
  const { clearSelectedActas } = useContext(ActuacionContext)
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
    resetFilter({ page: 1, juzgado: user!.juzgado.id }) // Resetear filtros internos
    setSkipNavigate(true) // Prevenir navegación en el useEffect
    navigate({ pathname, search: '',  }) // Limpiar la URL
    clearSelectedActas() // Borrar actas seleccionadas

    setResetForm(true)
  }

  const submit: SubmitHandler<ActaFilterForm> = async (data: ActaFilterForm) =>  {
    formFilter({...data, page: 1, juzgado: user!.juzgado.id})
    setResetForm(false)
  }

  useEffect(() => {
    if (filterParams && !skipNavigate) {
      // Crear una copia limpia de searchParams
      const updatedSearchParams = new URLSearchParams()
  
      // Filtrar los parámetros no vacíos y actualizarlos
      Object.entries(filterParams).forEach(([key, value]) => {
        if (value) updatedSearchParams.set(key, value.toString())
      })
  
      // Actualizar la URL con los nuevos parámetros
      navigate({ pathname, search: updatedSearchParams.toString() })
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

      <form onSubmit={ handleSubmit(submit) }>
        {
          !isSuccess
            ? <SkeletonFilter quantity={4} advanceFilter />
            :
            <div>
              {/* Filtros */}
              <FormFilter register={register} setValue={setValue} data={data} resetForm={resetForm} />
            
              {/* Filtros avanzados */}
              <AdvanceFilter register={register} data={data} setValue={setValue} resetForm={resetForm} />
            </div>
        }

        <div className='flex justify-end gap-4 mb-4'>
          <Button type='button' color='purple' className='px-6' onClick={() => clearFilters()}>
            <icons.Eraser />
            Limpiar Filtros
          </Button>

          <Button type='submit' className='px-6' disabled={isFetching}>
            <icons.Filter />
            Consultar
          </Button>
        </div>
      </form>

      {/* Configuracion de notificaciones */}
      {pathname === PATH.NOTIFICATION && <NotificacionConfig />}

      {/* Generar actuación multiple */}
      {pathname === PATH.ACUMULADAS && <GenerateActuacionMultiple />}

      {/* Tabla de actas filtradas */}
      <ActaTable 
        actas={actas} 
        isFetching={isFetching}
        pagination={pagination} 
        formFilter={formFilter} 
        filterParams={filterParams}
      />
    </React.Fragment>
  )
}
