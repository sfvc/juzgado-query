import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Checkbox, Pagination, Table, Tooltip } from 'flowbite-react'
import { ActuacionContext } from '../../../context/Actuacion/ActuacionContext'
import { TableSkeleton } from '../../../shared/components/TableSkeleton'
import { ActaDrawer } from './ActaDrawer'
import { ActionButtons } from './ActionButtons'
import { clearNames } from '../../../shared'
import { DEFAULT_COLOR } from '../../../shared/constants'
import { ActaColums, AcumuladasColums, NotificacionColums, PATH } from '../constants'
import { JuzgadoGuard } from './JuzgadoGuard'
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

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<string>('')

  const { pathname } = useLocation()
  const colums =
    pathname === PATH.ACTA
      ? ActaColums
      : pathname === PATH.NOTIFICATION
        ? NotificacionColums
        : AcumuladasColums

  const showActa = (id: number) => {
    setActiveItem(id.toString())
    setIsOpen(true)
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold dark:text-white mb-4 md:mb-0'>
          Listado de Actas ({pagination.total})
        </h1>
      </div>

      <div className=''>
        <Table>
          <Table.Head>
            {colums.map((column: Column) => (
              <Table.HeadCell key={column.key} className={'text-center bg-gray-300 hidden lg:table-cell'}>{column.label}</Table.HeadCell>
            ))}
          </Table.Head>

          <Table.Body className='divide-y'>
            {
              isFetching
                ? <TableSkeleton colums={colums.length} />
                : actas?.length
                  ? (actas.map((acta: IActa) => (
                    <Table.Row key={acta.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      {
                        (pathname === PATH.NOTIFICATION || pathname === PATH.ACUMULADAS) &&
                          <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white text-center'>
                            {acta.estados[0]?.nombre !== 'Pagada' && acta.estados[0]?.nombre !== 'Terminada' && (
                              <Checkbox
                                id={`${acta.id}`}
                                name='acta'
                                value={acta.id}
                                onChange={(e) => checkingActa(e, acta.id)}
                                className='
                                  h-6 w-6 rounded-md border-2 border-gray-500 dark:border-gray-400 
                                  focus:ring-4 focus:ring-blue-500 dark:focus:ring-blue-300 
                                  text-blue-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 
                                  checked:bg-blue-600 checked:border-blue-600 
                                  hover:border-blue-800 hover:shadow-md transition-all duration-200 
                                  disabled:bg-gray-300 disabled:dark:bg-gray-700 disabled:cursor-not-allowed
                                '
                              />
                            )}
                          </Table.Cell>
                      }
                      <Table.Cell className='text-center dark:text-white underline hover:cursor-pointer' onClick={() => showActa(acta.id)}>{acta.numero_acta}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white hidden lg:table-cell'>{acta.numero_causa}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white hidden lg:table-cell'>{acta.fecha}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white hidden lg:table-cell'>{acta.tipo_acta}</Table.Cell>
                      <Table.Cell className='lg:flex lg:justify-center text-white dark:text-white hidden'>
                        <Tooltip content={acta.estados[0]?.nombre.toLocaleUpperCase() || 'SIN ESTADO'} className='max-w-80'>
                          <span
                            className='max-w-40 truncate px-2 py-1 border-none rounded-lg inline-block'
                            style={{ backgroundColor: acta?.estados[0]?.color || DEFAULT_COLOR }}
                          >
                            {acta.estados[0]?.nombre.toLocaleUpperCase() || 'SIN ESTADO'}
                          </span>
                        </Tooltip>
                      </Table.Cell>
                      <Table.Cell className='text-center hidden lg:table-cell'>
                        <span className={`dark:text-white ${acta.prioridad?.nombre === 'URGENTE' && 'bg-red-600 text-white px-2 py-1 border-none rounded-lg inline-block'}`}>
                          {acta.prioridad?.nombre || '-'}
                        </span>
                      </Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{clearNames(acta?.infractores[0]?.apellido, acta?.infractores[0]?.nombre)}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white hidden lg:table-cell'>{acta?.infractores[0]?.documento || '-'}</Table.Cell>

                      <Table.Cell className='text-center dark:text-white'>
                        {
                          (pathname === PATH.NOTIFICATION)
                            ?
                            <div>
                              {
                                acta?.notificacion?.length
                                  ? <Link to={`/acta/${acta.id}/notificaciones`} className='underline'>Si</Link>
                                  : <span>No</span>
                              }
                            </div>
                            : (
                              <JuzgadoGuard fechaActa={acta.fecha}>
                                <ActionButtons acta={acta} />
                              </JuzgadoGuard>
                            )
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

      <ActaDrawer id={activeItem} isOpen={isOpen} setIsOpen={setIsOpen} />
    </React.Fragment>
  )
}
