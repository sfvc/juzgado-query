import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, TextInput, Tooltip } from 'flowbite-react'
import { DeleteModal, Loading, icons } from '../../../../shared'
import RubroForm from '../forms/RubroForm'
import { IRubro } from '../interfaces'
import { useRubro } from '../hooks/useRubro'

interface Column {
  key: string
  label: string
}

const colums: Column[] = [
  { key: 'id', label: 'Id' },
  { key: 'rubro', label: 'Rubro' },
  { key: 'acciones', label: 'Acciones' },
]

export const Rubro = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [activeItem, setActiveItem] = useState<IRubro | null>(null)

  const { 
    rubros,
    pagination,
    isLoading,
    filterParams,
    updateFilter,
    deleteRubro 
  } = useRubro()

  /* Modal crear/editar */
  const onOpenModal = (rubro: IRubro) => {
    setActiveItem(rubro)
    setOpenModal(true)
  }

  const onCloseModal = async () => {
    setActiveItem(null)
    setOpenModal(false)
  }

  /* Modal eliminar */
  const openDelteModal = (rubro: IRubro) => {
    setActiveItem(rubro)
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
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Rubros</h1>
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
            (rubros.length > 0)
              ? (rubros.map((rubro: IRubro) => (
                <Table.Row key={rubro.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='text-center dark:text-white'>{rubro.id}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{rubro.nombre}</Table.Cell>
                  <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                    <Tooltip content='Editar'>
                      <Button color='success' onClick={() => onOpenModal(rubro)} className='w-8 h-8 flex items-center justify-center'>
                        <icons.Pencil />
                      </Button>
                    </Tooltip>

                    <Tooltip content='Eliminar'>
                      <Button color='failure' onClick={() => openDelteModal(rubro)} className='w-8 h-8 flex items-center justify-center'>
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
          <RubroForm
            rubro={activeItem} 
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
          onDelete={(id) => deleteRubro.mutateAsync(id)}
          isLoading={deleteRubro.isPending}
          onClose={closeDeleteModal}
        />
      }
    </React.Fragment>
  )
}
