import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, TextInput, Tooltip } from 'flowbite-react'
import { DeleteModal, Loading, icons } from '../../../../shared'
import { IEstado } from '../interfaces'
import { useEstado } from '../hooks/useEstado'
import EstadoForm from '../forms/EstadoForm'

interface Column {
  key: string
  label: string
}

const colums: Column[] = [
  { key: 'id', label: 'Id' },
  { key: 'nombre', label: 'Nombre' },
  { key: 'color', label: 'Color' },
  { key: 'acciones', label: 'Acciones' },
]

export const Estado = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [activeItem, setActiveItem] = useState<IEstado | null>(null)

  const { 
    estados,
    pagination,
    isLoading,
    filterParams,
    updateFilter,
    deleteEstado 
  } = useEstado()

  /* Modal crear/editar */
  const onOpenModal = (estado: IEstado) => {
    setActiveItem(estado)
    setOpenModal(true)
  }

  const onCloseModal = async () => {
    setActiveItem(null)
    setOpenModal(false)
  }

  /* Modal eliminar */
  const openDelteModal = (estado: IEstado) => {
    setActiveItem(estado)
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
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Estados</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <div className='relative'>
              <TextInput
                name='query'
                placeholder='Buscar'
                value={filterParams.query}
                onChange={(e) => updateFilter('query', e.target.value)}
              />
              <icons.Search />
            </div>

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
            (estados.length > 0)
              ? (estados.map((estado: IEstado) => (
                <Table.Row key={estado.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='text-center dark:text-white'>{estado.id}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{estado.nombre}</Table.Cell>
                  <Table.Cell className='text-center'>
                    <span className='mx-auto block rounded-xl w-10 h-6' style={{ backgroundColor: estado.color }} />
                  </Table.Cell>
                  <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                    <Tooltip content='Editar'>
                      <Button color='success' onClick={() => onOpenModal(estado)} className='w-8 h-8 flex items-center justify-center'>
                        <icons.Pencil />
                      </Button>
                    </Tooltip>

                    <Tooltip content='Eliminar'>
                      <Button color='failure' onClick={() => openDelteModal(estado)} className='w-8 h-8 flex items-center justify-center'>
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
        <Modal.Header>{!activeItem ? 'Agregar Rubro' : 'Editar Rubro'}</Modal.Header>
        <Modal.Body>
          <EstadoForm
            estado={activeItem} 
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
          onDelete={(id) => deleteEstado.mutateAsync(id)}
          isLoading={deleteEstado.isPending}
          onClose={closeDeleteModal}
        />
      }
    </React.Fragment>
  )
}
