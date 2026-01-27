import React, { useContext, useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Button} from 'flowbite-react'
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
    reset()
    resetFilter({ page: 1 })
    setSkipNavigate(true)
    navigate({ pathname, search: '' })
    clearSelectedActas()
    setResetForm(true)
  }

  const submit: SubmitHandler<ActaFilterForm> = async (data) => {
    const { page, ...restOfFilters } = data

    // Si juzgado está vacío o no fue seleccionado manualmente, lo excluimos
    // Si tiene valor, lo incluimos
    const params = { ...restOfFilters, page: 1 }

    // Eliminar juzgado si está vacío
    if (!params.juzgado || params.juzgado === '') {
      delete params.juzgado
    }

    setSkipNavigate(true)
    formFilter(params)
    const search = new URLSearchParams()
    Object.entries(params).forEach(([k, v]) => {
      if (v) search.set(k, v.toString())
    })
    navigate({ pathname, search: search.toString() })
    setResetForm(false)
  }

  useEffect(() => {
    if (filterParams && !skipNavigate) {
    // Crear una copia limpia de searchParams
      const updatedSearchParams = new URLSearchParams()

      // Filtrar los parámetros no vacíos y actualizarlos
      Object.entries(filterParams).forEach(([key, value]) => {
      // Excluir juzgado si viene de la carga inicial y hay otros filtros activos
        if (key === 'juzgado' && Object.keys(filterParams).length > 2) {
          return // No agregar juzgado a la URL
        }
        if (value) updatedSearchParams.set(key, value.toString())
      })

      // Actualizar la URL con los nuevos parámetros
      navigate({ pathname, search: updatedSearchParams.toString() })
    }

    Object.entries(filterParams).forEach(([key, value]) => {
    // No setear el valor de juzgado en el formulario
      if (key === 'juzgado') return
      setValue(key as keyof ActaFilterForm, value)
    })

    // Volver a habilitar la navegación
    if (skipNavigate) {
      setSkipNavigate(false)
    }
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
