import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, TextInput, Tooltip } from 'flowbite-react'
import { DeleteModal, Loading, icons } from '../../../../shared'
import { IJuzgado } from '../interfaces'
import { useJuzgado } from '../hooks/useJuzgado'
import JuzgadoForm from '../forms/JuzgadoForm'

interface Column {
  key: string
  label: string
}

const colums: Column[] = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'juez', label: 'Juez' },
  { key: 'secretario', label: 'Secretario' },
  { key: 'direccion', label: 'Dirección' },
  { key: 'telefono', label: 'Teléfono' },
  { key: 'acciones', label: 'Acciones' },
]

export const Juzgado = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [activeItem, setActiveItem] = useState<IJuzgado | null>(null)

  const { 
    juzgados,
    pagination,
    isLoading,
    updateFilter,
    deleteJuzgado 
  } = useJuzgado()

  /* Modal crear/editar */
  const onOpenModal = (juzgado: IJuzgado) => {
    setActiveItem(juzgado)
    setOpenModal(true)
  }

  const onCloseModal = async () => {
    setActiveItem(null)
    setOpenModal(false)
  }

  /* Modal eliminar */
  const openDelteModal = (juzgado: IJuzgado) => {
    setActiveItem(juzgado)
    setOpenDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setActiveItem(null)
    setOpenDeleteModal(false)
  }

  if (isLoading) return <Loading />

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Juzgados</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <Button 
              type='submit' 
              color="gray"
              onClick={() => setOpenModal(true)}
            >
              Crear
            </Button>
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
            (juzgados.length > 0)
              ? (juzgados.map((juzgado: IJuzgado) => (
                <Table.Row key={juzgado.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='text-center dark:text-white'>{juzgado.nombre}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{juzgado.juez}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{juzgado.secretario}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{juzgado.direccion}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{juzgado.telefono}</Table.Cell>
                  <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                    <Tooltip content='Editar'>
                      <Button color='success' onClick={() => onOpenModal(juzgado)} className='w-8 h-8 flex items-center justify-center'>
                        <icons.Pencil />
                      </Button>
                    </Tooltip>

                    <Tooltip content='Eliminar'>
                      <Button color='failure' onClick={() => openDelteModal(juzgado)} className='w-8 h-8 flex items-center justify-center'>
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
      <Modal show={openModal} onClose={onCloseModal} size='4xl'>
        <Modal.Header>{!activeItem ? 'Agregar Juzgado' : 'Editar Juzgado'}</Modal.Header>
        <Modal.Body>
          <JuzgadoForm 
            juzgado={activeItem} 
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
          onDelete={(id) => deleteJuzgado.mutateAsync(id)}
          isLoading={deleteJuzgado.isPending}
          onClose={closeDeleteModal}
        />
      }
    </React.Fragment>
  )
}
