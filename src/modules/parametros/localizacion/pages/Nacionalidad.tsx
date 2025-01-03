import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, TextInput, Tooltip } from 'flowbite-react'
import { DeleteModal, icons } from '../../../../shared'
import { Column } from '../../../../shared/interfaces'
import { TableSkeleton } from '../../../../shared/components/TableSkeleton'
import { useNacionalidad } from '../hooks/useNacionalidad'
import { INacionalidad } from '../interfaces/localizacion'
import NacionalidadForm from '../forms/NacionalidadForm'

const colums: Column[] = [
  { key: 'id', label: 'Id' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'acciones', label: 'Acciones' }
]

export const Nacionalidad = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<INacionalidad | null>(null)

  const { nacionalidades, pagination,isFetching, filterParams, updateFilter, deleteNacionalidad } = useNacionalidad()

  /* Modal crear/editar */
  const onOpenModal = (nacionalidad: INacionalidad) => {
    setActiveItem(nacionalidad)
    setOpenModal(true)
  }

  const onCloseModal = async () => {
    setActiveItem(null)
    setOpenModal(false)
  }

  /* Modal eliminar */
  const openDelteModal = (nacionalidad: INacionalidad) => {
    setActiveItem(nacionalidad)
    setOpenDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setActiveItem(null)
    setOpenDeleteModal(false)
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Nacionalidades</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <Button type='button' onClick={() => setOpenModal(true)} >Agregar</Button>
          </div>
        </div>
      </div>

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
              ? <TableSkeleton colums={colums.length} />
              : (nacionalidades.length > 0)
                ? (nacionalidades.map((nacionalidad: INacionalidad) => (
                  <Table.Row key={nacionalidad.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white text-center'>{nacionalidad.id}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{nacionalidad.nombre}</Table.Cell>
                    <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                      <Tooltip content='Editar'>
                        <Button color='success' onClick={() => onOpenModal(nacionalidad)} className='w-8 h-8 flex items-center justify-center'>
                          <icons.Pencil />
                        </Button>
                      </Tooltip>

                      <Tooltip content='Eliminar'>
                        <Button color='failure' onClick={() => openDelteModal(nacionalidad)} className='w-8 h-8 flex items-center justify-center'>
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
          onPageChange={(page: number) => updateFilter('page', page)}
          previousLabel='Anterior'
          nextLabel='Siguiente'
          showIcons
        />
      </div>

      {/* Modal crear/editar */} 
      <Modal show={openModal} onClose={onCloseModal}>
        <Modal.Header>{!activeItem ? 'Agregar Nacionalidad' : 'Editar Nacionalidad'}</Modal.Header>
        <Modal.Body>
          <NacionalidadForm 
            nacionalidad={activeItem} 
            onSucces={onCloseModal}
          />
        </Modal.Body>
      </Modal>

      {/* Modal eliminar */} 
      {
        activeItem && 
        <DeleteModal
          item={activeItem.id}
          openModal={openDeleteModal}
          onDelete={(id) => deleteNacionalidad.mutateAsync(id)}
          isLoading={deleteNacionalidad.isPending}
          onClose={closeDeleteModal}
        />
      }
    </React.Fragment>
  )
}
