import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Checkbox, Pagination, Table, Tooltip } from 'flowbite-react'
import { DEFAULT_COLOR } from '../../../shared/constants'
import { ActaColums, NotificacionColums, PATH } from '../constants'
import { ActuacionContext } from '../../../context/Actuacion/ActuacionContext'
import { TableSkeleton } from '../../../shared/components/TableSkeleton'
import { ActionButtons } from './ActionButtons'
import { clearNames } from '../../../shared'
import type { Column, Pagination as IPagination } from '../../../shared/interfaces'
import type { ActaFilterForm, IActa } from '../interfaces'


interface Props {
  actas: IActa[]
  isFetching: boolean
  pagination: IPagination
  formFilter: (params: ActaFilterForm) => void
  filterParams: ActaFilterForm
}

export const ActaTable = ({ actas, isFetching, pagination, formFilter, filterParams }: Props) => {
  const { checkingActa } = useContext(ActuacionContext)

  const { pathname } = useLocation()
  const colums = pathname === PATH.ACTA ? ActaColums : NotificacionColums
  
  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Actas</h1>
      </div>

      <div className={`${pathname === PATH.NOTIFICATION && 'overflow-x-auto pb-4'}`}>
        <Table>
          <Table.Head>
            {colums.map((column: Column) => (
              <Table.HeadCell key={column.key} className='text-center bg-gray-300'>{column.label}</Table.HeadCell>
            ))}
          </Table.Head>

          <Table.Body className='divide-y'>
            {
              isFetching
                ? <TableSkeleton colums={colums.length}/>
                : actas?.length
                  ? (actas.map((acta: IActa) => (
                    <Table.Row key={acta.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      {
                        pathname === PATH.NOTIFICATION &&
                        <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white text-center'>
                          <Checkbox
                            id={`${acta.id}`}
                            name='acta'
                            value={acta.id}
                            onChange={(e) => checkingActa(e, acta.id)}
                            className='h-5 w-5 rounded border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 
                          dark:focus:ring-blue-400 text-blue-600 dark:checked:bg-blue-600 dark:checked:border-blue-600 dark:hover:border-blue-400 
                          hover:border-blue-500 transition-colors duration-200 disabled:bg-slate-400/40 disabled:dark:bg-white/40 disabled:cursor-not-allowed'
                          />
                        </Table.Cell>
                      }

                      <Table.Cell className='text-center dark:text-white'>{acta.numero_acta}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{acta.numero_causa}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{acta.fecha}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{acta.tipo_acta}</Table.Cell>
                      <Table.Cell className='text-center text-white dark:text-white'>
                        <Tooltip content={acta.estados[0]?.nombre.toLocaleUpperCase() || 'SIN ESTADO'} className='max-w-80'>
                          <span 
                            className='max-w-40 truncate px-2 py-1 border-none rounded-lg inline-block' 
                            style={{ backgroundColor: acta?.estados[0]?.color || DEFAULT_COLOR }}
                          >
                            {acta.estados[0]?.nombre.toLocaleUpperCase() || 'SIN ESTADO'}
                          </span>
                        </Tooltip>
                      </Table.Cell>
                      <Table.Cell className='text-center'>
                        <span className={`dark:text-white ${acta.prioridad?.nombre === 'URGENTE' && 'bg-red-600 text-white px-2 py-1 border-none rounded-lg inline-block'}`}>
                          {acta.prioridad?.nombre || '-'}
                        </span>
                      </Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{clearNames(acta?.infractores[0]?.apellido, acta?.infractores[0]?.nombre)}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{acta?.infractores[0]?.documento || '-'}</Table.Cell>
                      
                      <Table.Cell className='text-center dark:text-white'>
                        {
                          pathname === PATH.NOTIFICATION
                            ?
                            <div>
                              {
                                acta?.notificacion?.length
                                  ? <Link to={`/acta/${acta.id}/notificaciones`} className='underline'>Si</Link>
                                  : <span>No</span> 
                              }
                            </div>
                            : <ActionButtons acta={acta}/>
                        }
                      </Table.Cell>
                    </Table.Row>
                  )))
                  : <tr><td colSpan={colums.length} className='text-center py-4 dark:bg-gray-800'>No se encontraron resultados</td></tr>
            }
          </Table.Body>
        </Table>

        <div className='flex overflow-x-auto sm:justify-center mt-4'>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.lastPage}
            onPageChange={(page: number) => formFilter({ ...filterParams, page })}
            previousLabel='Anterior'
            nextLabel='Siguiente'
            showIcons
          />
        </div>
      </div>
    </React.Fragment>
  )
}
