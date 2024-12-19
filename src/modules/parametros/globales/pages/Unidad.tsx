import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, Tooltip } from 'flowbite-react'
import { icons } from '../../../../shared'
import { TableSkeleton } from '../../../../shared/components/TableSkeleton'
import { useUnidad } from '../hooks/useUnidad'
import UnidadForm from '../forms/UnidadForm'
import type { IUnidad } from '../interfaces'
import type { Column } from '../../../../shared/interfaces'

const colums: Column[] = [
  { key: 'valor', label: 'Valor' },
  { key: 'fecha_desde', label: 'Fecha desde' },
  { key: 'fecha_hasta', label: 'Fecha hasta' },
  { key: 'acciones', label: 'Acciones' },
]

export const Unidad = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<IUnidad | null>(null)

  const { 
    unidades,
    pagination,
    isFetching,
    updateFilter 
  } = useUnidad()

  /* Modal crear/editar */
  const onOpenModal = (unidad: IUnidad) => {
    setActiveItem(unidad)
    setOpenModal(true)
  }

  const onCloseModal = async () => {
    setActiveItem(null)
    setOpenModal(false)
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Unidades</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>            
            <Button type='button' color="gray" onClick={() => setOpenModal(true)} >Agregar</Button>
          </div>
        </div>
      </div>

      <div className='overflow-x-auto'>
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
                : (unidades.length > 0)
                  ? (unidades.map((unidad: IUnidad) => (
                    <Table.Row key={unidad.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell className='text-center dark:text-white'>$ {unidad.valor}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{unidad?.fecha_desde || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{unidad?.fecha_hasta || '-'}</Table.Cell>
                      <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                        <Tooltip content='Editar'>
                          <Button color='success' onClick={() => onOpenModal(unidad)} className='w-8 h-8 flex items-center justify-center'>
                            <icons.Pencil />
                          </Button>
                        </Tooltip>
                      </Table.Cell>
                    </Table.Row>
                  )))
                  : (<tr><td colSpan={colums.length} className='text-center py-4 dark:bg-gray-800'>No se encontraron resultados</td></tr>)
            }
          </Table.Body>
        </Table>
      </div>

      <div className='flex overflow-x-auto sm:justify-center mt-4'>
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.lastPage}
          onPageChange={(page: number) => updateFilter('page', page)}
          previousLabel='Anterior'
          nextLabel='Siguiente'
          showIcons
        />
      </div>

      {/* Modal crear/editar */} 
      <Modal show={openModal} onClose={onCloseModal} >
        <Modal.Header>{!activeItem ? 'Agregar Unidad' : 'Editar Unidad'}</Modal.Header>
        <Modal.Body>
          <UnidadForm 
            unidad={activeItem} 
            onSucces={onCloseModal}
          />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}
