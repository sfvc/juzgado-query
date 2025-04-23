import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, Tooltip } from 'flowbite-react'
import { ToastContainer } from 'react-toastify'
import { useVehiculo } from '../hooks/useVehiculo'
import { RoleGuard, UserRole } from '../../../auth'
import { clearNames, DeleteModal, InputTable } from '../../../shared'
import { icons } from '../../../shared'
import VehiculoForm from '../forms/VehiculoForm'
import { TableSkeleton } from '../../../shared/components/TableSkeleton'
import type { Column } from '../../../shared/interfaces'
import type { IVehiculo } from '../interfaces'

const columns: Column[] = [
  { key: 'id', label: 'Id' },
  { key: 'dominio', label: 'Dominio' },
  { key: 'titular', label: 'Titular' },
  { key: 'marca', label: 'Marca' },
  { key: 'modelo', label: 'Modelo' },
  { key: 'tipo', label: 'Tipo' },
  { key: 'color', label: 'Color' },
  { key: 'acciones', label: 'Acciones' }
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

  const handleSaveVehiculo = (vehiculo: IVehiculo) => {
    setActiveItem(null)
    setOpenModal(false)
  }

  const onOpenModal = (vehiculo?: IVehiculo) => {
    setActiveItem(vehiculo || null)
    setOpenModal(true)
  }

  const onCloseModal = () => {
    setActiveItem(null)
    setOpenModal(false)
  }

  const openDeletModal = (vehiculo: IVehiculo) => {
    setActiveItem(vehiculo)
    setOpenDeleteModal(true)
  }
  const closeDeleteModal = () => {
    setActiveItem(null)
    setOpenDeleteModal(false)
  }

  return (
    <>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold dark:text-white mb-4 md:mb-0'>Listado de Vehículos</h1>
        <div className='flex gap-4'>
          <InputTable onSearch={(value: string) => updateFilter('query', value)} />
          <Button onClick={() => onOpenModal()}>
            Agregar
          </Button>
        </div>
      </div>

      <div className='overflow-x-auto'>
        <Table>
          <Table.Head>
            {columns.map(col => (
              <Table.HeadCell key={col.key} className='text-center bg-gray-300'>
                {col.label}
              </Table.HeadCell>
            ))}
          </Table.Head>

          <Table.Body className='divide-y'>
            {isFetching ? (
              <TableSkeleton colums={columns.length} />
            ) : vehiculos.length > 0 ? (
              vehiculos.map((vehiculo) => (
                <Table.Row key={vehiculo.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.id}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.dominio}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>
                    {clearNames(vehiculo.titular?.apellido, vehiculo.titular?.nombre) || '-'}
                  </Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.marca?.nombre || '-'}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.modelo || '-'}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.tipo?.nombre || '-'}</Table.Cell>
                  <Table.Cell className='text-center dark:text-white'>{vehiculo.color?.nombre || '-'}</Table.Cell>
                  <Table.Cell className='flex gap-2 justify-center'>
                    <Tooltip content='Editar'>
                      <Button color='success' onClick={() => onOpenModal(vehiculo)} className='w-8 h-8 flex items-center justify-center'>
                        <icons.Pencil />
                      </Button>
                    </Tooltip>
                    <RoleGuard roles={[UserRole.ADMIN, UserRole.JEFE, UserRole.JUEZ, UserRole.SECRETARIO]}>
                      <Tooltip content='Eliminar'>
                        <Button color='failure' onClick={() => openDeletModal(vehiculo)} className='w-8 h-8 flex items-center justify-center'>
                          <icons.Trash />
                        </Button>
                      </Tooltip>
                    </RoleGuard>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className='text-center py-4 dark:bg-gray-800'>
                  No se encontraron resultados
                </td>
              </tr>
            )}
          </Table.Body>
        </Table>
      </div>

      <Pagination
        className='mt-4 flex justify-center'
        currentPage={pagination.currentPage}
        totalPages={pagination.lastPage}
        onPageChange={(page) => updateFilter('page', page)}
        previousLabel='Anterior'
        nextLabel='Siguiente'
        showIcons
      />

      {/* Modal crear/editar */}
      <Modal show={openModal} onClose={onCloseModal} size='4xl'>
        <Modal.Header>{activeItem ? 'Editar Vehículo' : 'Agregar Vehículo'}</Modal.Header>
        <Modal.Body>
          <VehiculoForm
            vehiculo={activeItem}
            updateVehiculos={handleSaveVehiculo}
            onSuccess={handleSaveVehiculo}
          />
        </Modal.Body>
      </Modal>

      {/* Modal eliminar */}
      {activeItem && (
        <DeleteModal
          item={activeItem.id}
          openModal={openDeleteModal}
          onDelete={(id) => deleteVehiculo.mutateAsync(id)}
          isLoading={deleteVehiculo.isPending}
          onClose={closeDeleteModal}
        />
      )}

      <ToastContainer containerId="custom" className="custom-toast-container" />
    </>
  )
}
