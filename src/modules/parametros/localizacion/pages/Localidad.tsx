import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, Tooltip } from 'flowbite-react'
import { DeleteModal, icons, InputTable } from '../../../../shared'
import { useLocalidad } from '../hooks/useLocalidad'
import LocalidadForm from '../forms/LocalidadForm'
import { TableSkeleton } from '../../../../shared/components/TableSkeleton'
import type { Column } from '../../../../shared/interfaces'
import type { ILocalidad } from '../interfaces/localizacion'

const colums: Column[] = [
  { key: 'id', label: 'Id' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'acciones', label: 'Acciones' }
]

export const Localidad = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<ILocalidad | null>(null)

  const { localidades, pagination, isFetching, updateFilter, deleteLocalidad } = useLocalidad()

  /* Modal crear/editar */
  const onOpenModal = (localidad: ILocalidad) => {
    setActiveItem(localidad)
    setOpenModal(true)
  }

  const onCloseModal = async () => {
    setActiveItem(null)
    setOpenModal(false)
  }

  /* Modal eliminar */
  const openDelteModal = (localidad: ILocalidad) => {
    setActiveItem(localidad)
    setOpenDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setActiveItem(null)
    setOpenDeleteModal(false)
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Localidades</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <InputTable onSearch={(value: string) => updateFilter('query', value)} />

            <Button type='button' onClick={() => setOpenModal(true)} >Agregar</Button>
          </div>
        </div>
      </div>

      <Table>
        <Table.Head>
          {colums.map((column: Column) => (
            <Table.HeadCell key={column.key} className='text-center bg-gray-300'>{column.label}</Table.HeadCell>
          ))}
        </Table.Head>

        <Table.Body className='divide-y'>
          {
            isFetching
              ? <TableSkeleton colums={colums.length} />
              : (localidades.length > 0)
                ? (localidades.map((localidad: ILocalidad) => (
                  <Table.Row key={localidad.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white text-center'>{localidad.id}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{localidad.nombre || '-'}</Table.Cell>
                    <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                      <Tooltip content='Editar'>
                        <Button color='success' onClick={() => onOpenModal(localidad)} className='w-8 h-8 flex items-center justify-center'>
                          <icons.Pencil />
                        </Button>
                      </Tooltip>

                      <Tooltip content='Eliminar'>
                        <Button color='failure' onClick={() => openDelteModal(localidad)} className='w-8 h-8 flex items-center justify-center'>
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
        <Modal.Header>{!activeItem ? 'Agregar Localidad' : 'Editar Localidad'}</Modal.Header>
        <Modal.Body>
          <LocalidadForm 
            localidad={activeItem} 
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
          onDelete={(id) => deleteLocalidad.mutateAsync(id)}
          isLoading={deleteLocalidad.isPending}
          onClose={closeDeleteModal}
        />
      }
    </React.Fragment>
  )
}

