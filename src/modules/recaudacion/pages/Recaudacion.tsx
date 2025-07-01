/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button, Pagination, Table, Tooltip } from 'flowbite-react'
import { useRecaudacion } from '../hooks/useRecaudacion'
import type { Column } from '../../../shared/interfaces'
import { IRecaudacion }
  from '../interfaces'
import { icons, useLoading } from '../../../shared'
import { carboneActions } from '../../carbone'
import { useState } from 'react'

const columns: Column[] = [
  { key: 'fecha', label: 'FECHA' },
  { key: 'acciones', label: 'Acciones' },
]

export const Recaudacion = () => {
  const { recaudacionFiltrada, isFetching, pagination, updateFilter } = useRecaudacion()
  const useAction = useLoading()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const downloadRecaudacion = (path: string) => {
    useAction.actionFn(async () => {
      await carboneActions.downloadRecaudacion(path)
    })
  }

  const handleFilter = () => {
    if (startDate) updateFilter('start_date', startDate)
    if (endDate) updateFilter('end_date', endDate)
    updateFilter('page', 1)
  }

  const formatDateTime = (dateTimeString: string) => {
    try {
      return new Date(dateTimeString).toLocaleString('es-AR', {
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (e) {
      return dateTimeString
    }
  }

  return (
    <>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4'>
        <h1 className='text-2xl font-semibold dark:text-white'>Listado de Recaudación</h1>

        <div className='flex items-center gap-2'>
          <input
            type='date'
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className='rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all'
          />
          <span className='text-sm text-gray-600 dark:text-gray-300'>a</span>
          <input
            type='date'
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className='rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm px-3 py-2 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all'
          />
          <Button onClick={handleFilter} size='sm'>
            Filtrar
          </Button>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <Table hoverable>
          <Table.Head>
            {columns.map((column: Column) => (
              <Table.HeadCell key={column.key} className='text-center bg-gray-300'>
                {column.label}
              </Table.HeadCell>
            ))}
          </Table.Head>
          <Table.Body className='divide-y'>
            {isFetching ? (
              <Table.Row>
                <Table.Cell colSpan={columns.length} className='text-center py-6 dark:bg-gray-800 dark:text-white'>
                  <span className='animate-pulse'>Cargando datos...</span>
                </Table.Cell>
              </Table.Row>
            ) : recaudacionFiltrada && recaudacionFiltrada.length > 0 ? (
              recaudacionFiltrada.map((recaudacionItems: IRecaudacion) => (
                <Table.Row key={recaudacionItems.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='text-center dark:text-white'>{formatDateTime(recaudacionItems?.fecha_pago || '')}</Table.Cell>
                  <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                    <Tooltip content='Descargar'>
                      <Button color='warning' onClick={() => downloadRecaudacion(recaudacionItems?.path)} className='w-8 h-8 flex items-center justify-center'>
                        <icons.Download />
                      </Button>
                    </Tooltip>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan={columns.length} className='text-center py-4 dark:bg-gray-800 dark:text-white'>
                  No se encontraron resultados
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>

      <div className='flex overflow-x-auto sm:justify-center mt-4'>
        <Pagination
          currentPage={pagination.currentPage || 1}
          totalPages={pagination.lastPage || 1}
          onPageChange={(page: number) => updateFilter('page', page)}
          previousLabel='Anterior'
          nextLabel='Siguiente'
          showIcons
        />
      </div>
    </>
  )
}
