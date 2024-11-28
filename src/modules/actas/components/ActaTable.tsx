import React, { useContext } from 'react'
import { Button, Checkbox, Pagination, Table, Tooltip } from 'flowbite-react'
import type { Column, Pagination as IPagination } from '../../../shared/interfaces'
import { icons } from '../../../shared'
import { ActaFilterForm, IActa } from '../interfaces'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { DEFAULT_COLOR } from '../../../shared/constants'
import { ActaColums, NotificacionColums, PATH } from '../constants'
import { ActuacionContext } from '../../../context/Actuacion/ActuacionContext'
import { TableSkeleton } from '../../../shared/components/TableSkeleton'

interface Props {
  actas: IActa[]
  isFetching: boolean
  pagination: IPagination
  formFilter: (params: ActaFilterForm) => void
}

export const ActaTable = ({ actas, isFetching, pagination, formFilter }: Props) => {
  const { checkingActa } = useContext(ActuacionContext)

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const colums = pathname === PATH.ACTA ? ActaColums : NotificacionColums

  const handleEditActa = (id: number, tipo: string) => {
    const tipoActa = tipo.toLocaleLowerCase().replace(/\s+/g, '')
    navigate(`/acta/${tipoActa}/editar/${id}`)
  }

  const handleChangeStatus = (id: number) => {
    navigate(`/acta/${id}/estados`)
  }

  const handleNotification = (id: number) => {
    navigate(`/acta/${id}/notificaciones`)
  }

  const handleActuacion = (id: number) => {
    navigate(`/acta/${id}/actuaciones`)
  }

  // if (isLoading) return <div className='flex justify-center'><Spinner size='xl'/></div>
  
  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Actas</h1>
      </div>

      <div>
        <Table>
          <Table.Head>
            {
              colums.map((column: Column) => (
                <Table.HeadCell key={column.key} className='text-center bg-gray-300'>{column.label}</Table.HeadCell>
              ))
            }
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
                        <span 
                          className='max-w-40 truncate px-2 py-1 border-none rounded-lg inline-block' 
                          style={{ backgroundColor: acta?.estados[0]?.color || DEFAULT_COLOR }}
                        >
                          {acta.estados[0]?.nombre.toLocaleUpperCase() || 'SIN ESTADO'}
                        </span>
                      </Table.Cell>
                      <Table.Cell className='text-center'>
                        <span className={`dark:text-white ${acta.prioridad?.nombre === 'URGENTE' && 'bg-red-600 text-white px-2 py-1 border-none rounded-lg inline-block'}`}>
                          {acta.prioridad?.nombre || '-'}
                        </span>
                      </Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{acta?.infractores[0]?.apellido || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{acta?.infractores[0]?.documento || '-'}</Table.Cell>

                      {
                        pathname === PATH.NOTIFICATION
                          ?
                          <Table.Cell className='dark:text-white items-center flex justify-center'>
                            {
                              acta?.notificacion?.length
                                ? 
                                <Tooltip content='Ver notificación'>
                                  <Link to={`/acta/${acta.id}/notificaciones`} className='underline'>Si</Link>
                                </Tooltip>
                                : <span>No</span> 
                            }
                          </Table.Cell>
                          :
                          <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                            <Tooltip content='Editar'>
                              <Button color='success' onClick={() => handleEditActa(acta.id, acta.tipo_acta)} className='w-8 h-8 flex items-center justify-center'>
                                <icons.Pencil />
                              </Button>
                            </Tooltip>

                            <Tooltip content='Estados'>
                              <Button color='warning' onClick={() => handleChangeStatus(acta.id)} className='w-8 h-8 flex items-center justify-center'>
                                <icons.Status />
                              </Button>
                            </Tooltip>

                            {
                              (acta?.notificacion && !!acta.notificacion.length) &&
                          <Tooltip content='Notificaciones'>
                            <Button color='blue' onClick={() => handleNotification(acta.id)} className='w-8 h-8 flex items-center justify-center'>
                              <icons.Notification />
                            </Button>
                          </Tooltip>
                            }

                            <Tooltip content='Actuaciones'>
                              <Button color='purple' onClick={() => handleActuacion(acta.id)} className='w-8 h-8 flex items-center justify-center'>
                                <icons.Actuacion />
                              </Button>
                            </Tooltip>

                            <Tooltip content='Eliminar'>
                              <Button color='failure' onClick={() => console.log('first')} className='w-8 h-8 flex items-center justify-center'>
                                <icons.Trash />
                              </Button>
                            </Tooltip>
                          </Table.Cell>
                      }
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
            onPageChange={(page: number) => formFilter({ page })}
            previousLabel='Anterior'
            nextLabel='Siguiente'
            showIcons
          />
        </div>
      </div>
    </React.Fragment>
  )
}