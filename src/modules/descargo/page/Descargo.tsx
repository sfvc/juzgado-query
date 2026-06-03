import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, Tooltip } from 'flowbite-react'
import { ToastContainer } from 'react-toastify'
import { TableSkeleton } from '../../../shared/components/TableSkeleton'
import { clearNames, icons, InputTable } from '../../../shared'
import { useModals } from '../../../shared/hooks/useModals'
import type { Column } from '../../../shared/interfaces'
import { useDescargo } from '../hooks/useDescargo'
import { IDescargo } from '../interfaces'
import { ShowDescargo } from '../components/ShowDescargo'

const colums: Column[] = [
  { key: 'id', label: 'Número de Descargo' },
  { key: 'nombre', label: 'Apellido y Nombre' },
  { key: 'dni', label: 'DNI' },
  { key: 'numero_acta', label: 'Número de Acta' },
  { key: 'fecha', label: 'Fecha' },
  { key: 'estado', label: 'Estado' },
  { key: 'acciones', label: 'Acciones' },
]

export const Descargo = () => {
  const {
    isOpen,
    openModal,
    closeModal
  } = useModals()
  const [activeItem, setActiveItem] = useState<IDescargo | null>(null)

  const {
    descargo,
    pagination,
    isFetching,
    updateFilter,
    confirmDescargo,
    rechazarDescargo
  } = useDescargo()

  const onOpenShowModal = (descargo: IDescargo) => {
    setActiveItem(descargo)
    openModal('show')
  }

  const onCloseShowModal = () => {
    setActiveItem(null)
    closeModal('show')
  }

  const getEstadoClass = (estado: string) => {
    switch (estado) {
    case 'APROBADO':
      return 'bg-green-500 text-white'
    case 'RECHAZADO':
      return 'bg-red-500 text-white'
    case 'PENDIENTE':
      return 'bg-yellow-500 text-white'
    default:
      return 'bg-gray-500 text-white'
    }
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Descargo</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <InputTable onSearch={(value: string) => updateFilter('query', value)} />
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
                ? <TableSkeleton colums={colums.length} />
                : (descargo.length > 0)
                  ? (descargo.map((descargo: IDescargo) => (
                    <Table.Row
                      key={descargo.id}
                      className='bg-white dark:border-gray-700 dark:bg-gray-800'
                    >
                      <Table.Cell className='text-center dark:text-white'>
                        {descargo.numero_descargo}
                      </Table.Cell>

                      <Table.Cell className='text-center dark:text-white'>
                        {clearNames(
                          descargo.infractor?.apellido,
                          descargo.infractor?.nombre
                        )}
                      </Table.Cell>

                      <Table.Cell className='text-center dark:text-white'>
                        {descargo.infractor?.dni}
                      </Table.Cell>

                      <Table.Cell className='text-center dark:text-white'>
                        {descargo.acta?.numero_acta}
                      </Table.Cell>

                      <Table.Cell className='text-center dark:text-white'>
                        {descargo.fecha_registro}
                      </Table.Cell>

                      <Table.Cell className='text-center dark:text-white'>
                        <span
                          className={`px-3 py-1 rounded-lg inline-block font-medium ${getEstadoClass(
                            descargo.estado
                          )}`}
                        >
                          {descargo.estado}
                        </span>
                      </Table.Cell>

                      <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                        <Tooltip content='Ver Descargo'>
                          <Button
                            onClick={() => onOpenShowModal(descargo)}
                            className='w-8 h-8 flex items-center justify-center'
                          >
                            <icons.Show />
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

      {activeItem && (
        <Modal show={isOpen.show} onClose={onCloseShowModal} size='5xl'>
          <Modal.Header>Verificación de Descargo</Modal.Header>
          <Modal.Body>
            <ShowDescargo
              descargo={activeItem}
              closeModal={onCloseShowModal}
              onConfirm={() => confirmDescargo.mutate(activeItem.id)}
              onReject={() => rechazarDescargo.mutate(activeItem.id)}
            />
          </Modal.Body>
        </Modal>
      )}

      <ToastContainer containerId="custom" className="custom-toast-container" />
    </React.Fragment>
  )
}
