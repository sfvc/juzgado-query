import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, Tooltip } from 'flowbite-react'
import { DeleteModal, icons, InputTable } from '../../../../shared'
import { useProvincia } from '../hooks/useProvincia'
import ProvinciaForm from '../forms/ProvinciaForm'
import { TableSkeleton } from '../../../../shared/components/TableSkeleton'
import type { Column } from '../../../../shared/interfaces'
import type { IProvincia } from '../interfaces/localizacion'

const colums: Column[] = [
  { key: 'id', label: 'Id' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'acciones', label: 'Acciones' }
]

export const Provincia = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<IProvincia | null>(null)

  const { provincias, pagination, isFetching, updateFilter, deleteProvincia } = useProvincia()

  /* Modal crear/editar */
  const onOpenModal = (provincia: IProvincia) => {
    setActiveItem(provincia)
    setOpenModal(true)
  }

  const onCloseModal = async () => {
    setActiveItem(null)
    setOpenModal(false)
  }

  /* Modal eliminar */
  const openDelteModal = (provincia: IProvincia) => {
    setActiveItem(provincia)
    setOpenDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setActiveItem(null)
    setOpenDeleteModal(false)
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Provincias</h1>
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
              : (provincias.length > 0)
                ? (provincias.map((provincia: IProvincia) => (
                  <Table.Row key={provincia.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white text-center'>{provincia.id}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{provincia.nombre}</Table.Cell>
                    <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                      <Tooltip content='Editar'>
                        <Button color='success' onClick={() => onOpenModal(provincia)} className='w-8 h-8 flex items-center justify-center'>
                          <icons.Pencil />
                        </Button>
                      </Tooltip>

                      <Tooltip content='Eliminar'>
                        <Button color='failure' onClick={() => openDelteModal(provincia)} className='w-8 h-8 flex items-center justify-center'>
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
        <Modal.Header>{!activeItem ? 'Agregar Provincia' : 'Editar Provincia'}</Modal.Header>
        <Modal.Body>
          <ProvinciaForm 
            provincia={activeItem} 
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
          onDelete={(id) => deleteProvincia.mutateAsync(id)}
          isLoading={deleteProvincia.isPending}
          onClose={closeDeleteModal}
        />
      }
    </React.Fragment>
  )
}
