import React from 'react'
import { Button, Pagination, Spinner, Table, Tooltip } from 'flowbite-react'
import type { Column, Pagination as IPagination } from '../../../shared/interfaces'
import { icons } from '../../../shared'
import { ActaFilterForm, IActa } from '../interfaces'
import { useNavigate } from 'react-router-dom'

const colums: Column[] = [
  { key: 'numero_acta', label: 'Nro. Acta' },
  { key: 'numero_causa', label: 'Nro. Causa' },
  { key: 'fecha', label: 'fecha' },
  { key: 'tipo_acta', label: 'Tipo' },
  { key: 'estado', label: 'Estado' },
  { key: 'prioridad', label: 'Prioridad' },
  { key: 'nombre', label: 'Nombre y Apellido' },
  { key: 'numero_documento', label: 'Nro. Documento' },
  { key: 'acciones', label: 'Acciones' },
]

interface Props {
  actas: IActa[]
  isLoading: boolean
  pagination: IPagination
  formFilter: (params: ActaFilterForm) => void
}

export const ActaTable = ({ actas, isLoading, pagination, formFilter }: Props) => {
  const navigate = useNavigate()

  const handleEditActa = (id: number, tipo: string) => {
    const tipoActa = tipo.toLocaleLowerCase().replace(/\s+/g, '')
    navigate(`/acta/${tipoActa}/editar/${id}`)
  }

  const handleChangeStatus = (id: number) => {
    navigate(`/acta/${id}/estados`)
  }

  if (isLoading) return <div className='flex justify-center'><Spinner size='xl'/></div>
  
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
              (actas?.length > 0)
                ? (actas.map((acta: IActa) => (
                  <Table.Row key={acta.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='text-center dark:text-white'>{acta.numero_acta}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{acta.numero_causa}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{acta.fecha}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{acta.tipo_acta}</Table.Cell>
                    <Table.Cell className='text-center text-white dark:text-white'>
                      <span className='px-2 py-1 border-none rounded-lg inline-block' style={{ backgroundColor: acta?.estados[0]?.color }}>
                        {acta.estados[0]?.nombre || '-'}
                      </span>
                    </Table.Cell>
                    <Table.Cell className='text-center'>
                      <span className={`dark:text-white ${acta.prioridad?.nombre === 'URGENTE' && 'bg-red-600 text-white px-2 py-1 border-none rounded-lg inline-block'}` }>
                        {acta.prioridad?.nombre || '-'}
                      </span>
                    </Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{acta?.infractores[0]?.apellido || '-'}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{acta?.infractores[0]?.documento || '-'}</Table.Cell>

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

                      <Tooltip content='Eliminar'>
                        <Button color='failure' onClick={() => console.log('first')} className='w-8 h-8 flex items-center justify-center'>
                          <icons.Trash />
                        </Button>
                      </Tooltip>
                    </Table.Cell>
                  </Table.Row>
                )))
                : (<tr><td colSpan={colums.length} className='text-center py-4 dark:bg-gray-800'>No se encontraron resultados</td></tr>)
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
