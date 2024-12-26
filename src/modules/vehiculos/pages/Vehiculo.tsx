import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, Tooltip } from 'flowbite-react'
import { useVehiculo } from '../hooks/useVehiculo'
import { clearNames, DeleteModal, InputTable } from '../../../shared'
import { icons } from '../../../shared'
import VehiculoForm from '../forms/VehiculoForm'
import { TableSkeleton } from '../../../shared/components/TableSkeleton'
import type { Column } from '../../../shared/interfaces'
import type { IVehiculo } from '../interfaces'

const colums: Column[] = [
  { key: 'id', label: 'Id' },
  { key: 'dominio', label: 'Dominio' },
  { key: 'titular', label: 'Titular' },
  { key: 'marca', label: 'Marca' },
  { key: 'modelo', label: 'Modelo' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'color', label: 'Color' },
  { key: 'acciones', label: 'Acciones' },
]

export const Vehiculo = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<IVehiculo | null>(null)

  const { 
    vehiculos,
    pagination,
    isFetching,
    updateFilter,
    deleteVehiculo 
  } = useVehiculo()

  /* Modal crear/editar */
  const onOpenModal = (vehiculo: IVehiculo) => {
    setActiveItem(vehiculo)
    setOpenModal(true)
  }

  const onCloseModal = async () => {
    setActiveItem(null)
    setOpenModal(false)
  }

  /* Modal eliminar */
  const openDelteModal = (vehiculo: IVehiculo) => {
    setActiveItem(vehiculo)
    setOpenDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setActiveItem(null)
    setOpenDeleteModal(false)
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Vehiculos</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <InputTable onSearch={(value: string) => updateFilter('query', value)} />
            
            <Button type='button' onClick={() => setOpenModal(true)} >Agregar</Button>
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
                :(vehiculos.length > 0)
                  ? (vehiculos.map((vehiculo: IVehiculo) => (
                    <Table.Row key={vehiculo.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell className='text-center dark:text-white'>{vehiculo?.id || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{vehiculo?.dominio || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{clearNames(vehiculo?.titular?.apellido, vehiculo?.titular?.nombre) || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{vehiculo?.marca?.nombre || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{vehiculo?.modelo || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{vehiculo?.tipo?.nombre || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{vehiculo?.color?.nombre || '-'}</Table.Cell>
                      <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                        <Tooltip content='Editar'>
                          <Button color='success' onClick={() => onOpenModal(vehiculo)} className='w-8 h-8 flex items-center justify-center'>
                            <icons.Pencil />
                          </Button>
                        </Tooltip>

                        <Tooltip content='Eliminar'>
                          <Button color='failure' onClick={() => openDelteModal(vehiculo)} className='w-8 h-8 flex items-center justify-center'>
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
      <Modal show={openModal} onClose={onCloseModal} size='4xl'>
        <Modal.Header>{!activeItem ? 'Agregar Vehiculo' : 'Editar Vehiculo'}</Modal.Header>
        <Modal.Body>
          <VehiculoForm 
            vehiculo={activeItem} 
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
          onDelete={(id) => deleteVehiculo.mutateAsync(id)}
          isLoading={deleteVehiculo.isPending}
          onClose={closeDeleteModal}
        />
      }
    </React.Fragment>
  )
}
