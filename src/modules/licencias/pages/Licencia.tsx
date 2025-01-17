import React, { useContext, useState } from 'react'
import { Button, Modal, Pagination, Table, Tooltip } from 'flowbite-react'
import { TableSkeleton } from '../../../shared/components/TableSkeleton'
import { AuthContext } from '../../../context/Auth/AuthContext'
import { clearNames, DeleteModal, icons, InputTable } from '../../../shared'
import { RoleGuard, UserRole } from '../../../auth'
import { useModals } from '../../../shared/hooks/useModals'
import { useLicencia } from '../hooks/useLicencia'
import LicenciaForm from '../forms/LicenciaForm'
import type { Column } from '../../../shared/interfaces'
import type { ILicencia } from '../interfaces'

const colums: Column[] = [
  { key: 'categoria', label: 'Categoria' },
  { key: 'persona', label: 'Persona' },
  { key: 'dni', label: 'Dni' },
  { key: 'fecha_retencion', label: 'Fecha Retención' },
  { key: 'fecha_entrega', label: 'Fecha Entrega' },
  { key: 'observaciones', label: 'Observaciones' },
  { key: 'user', label: 'Entregado Por' },
  { key: 'acciones', label: 'Acciones' },
]

export const Licencia = () => {
  const { user } = useContext(AuthContext)
  const { 
    isOpen,
    openModal,
    closeModal
  } = useModals()
  const [activeItem, setActiveItem] = useState<ILicencia | null>(null)

  const { 
    licencias,
    pagination,
    isFetching,
    updateFilter,
    deleteLicencia,
    handLicencia
  } = useLicencia()

  /* Modal crear/editar */
  const onOpenModal = (licencia: ILicencia | null) => {
    setActiveItem(licencia)
    openModal('create')
  }

  const onCloseModal = () => {
    setActiveItem(null)
    closeModal('create')
  }

  /* Modal eliminar */
  const onOpenDeleteModal = (licencia: ILicencia) => {
    setActiveItem(licencia)
    openModal('delete')
  }

  const onCloseDeleteModal = () => {
    setActiveItem(null)
    closeModal('delete')
  }

  /* Modal entregar licencia */
  const onOpenHandModal = (licencia: ILicencia) => {
    setActiveItem(licencia)
    openModal('hand')
  }

  const onCloseHandModal = () => {
    setActiveItem(null)
    closeModal('hand')
  }

  const handleHandLicencia = async () => {
    await handLicencia.mutateAsync({ id: activeItem!.id, data: { user_id: user!.id } })
    onCloseHandModal()
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Licencias retenidas</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <InputTable onSearch={(value: string) => updateFilter('query', value)} />            
            
            <RoleGuard roles={[UserRole.OPERADOR, UserRole.ADMIN, UserRole.JEFE, UserRole.JUEZ, UserRole.SECRETARIO]}>
              <Button type='button' onClick={() => onOpenModal(null)} >Agregar</Button>
            </RoleGuard>
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
                : (licencias.length > 0)
                  ? (licencias.map((licencia: ILicencia) => (
                    <Table.Row key={licencia.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell className='text-center dark:text-white'>{licencia?.categoria}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{clearNames(licencia?.persona?.apellido, licencia?.persona?.nombre)}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{licencia?.persona?.numero_documento}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{licencia?.fecha_retencion}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{licencia?.fecha_entrega}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{licencia?.observaciones || '-'}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{licencia?.user?.username || '-'}</Table.Cell>

                      <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                        <Tooltip content='Entregar licencia'>
                          <Button onClick={() => onOpenHandModal(licencia)} className='w-8 h-8 flex items-center justify-center'>
                            <icons.Send  />
                          </Button>
                        </Tooltip>

                        {
                          !licencia.user && 
                          <Tooltip content='Editar'>
                            <Button color='success' onClick={() => onOpenModal(licencia)} className='w-8 h-8 flex items-center justify-center'>
                              <icons.Pencil  />
                            </Button>
                          </Tooltip>
                        }
                      
                        <RoleGuard roles={[UserRole.ADMIN]}>
                          <Tooltip content='Eliminar'>
                            <Button color='failure' onClick={() => onOpenDeleteModal(licencia)} className='w-8 h-8 flex items-center justify-center'>
                              <icons.Trash />
                            </Button>
                          </Tooltip>
                        </RoleGuard>
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

      {/* Modal crear */} 
      <Modal show={isOpen.create} onClose={onCloseModal} size='5xl'>
        <Modal.Header>Agregar Inhabilitado</Modal.Header>
        <Modal.Body>
          <LicenciaForm onSucces={onCloseModal} licencia={activeItem} />
        </Modal.Body>
      </Modal>

      {/* Modal entregar licencia*/} 
      <Modal show={isOpen.hand} onClose={onCloseHandModal} size='2xl'>
        <Modal.Header>Entrega de Licencia</Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <icons.Warning />
          
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Confirmá para entregar la licencia
            </h3>
          
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={onCloseHandModal}>Cancelar</Button>
              <Button 
                onClick={handleHandLicencia}
                disabled={handLicencia.isPending}
                isProcessing={handLicencia.isPending}
              >
              Sí, aceptar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal eliminar */} 
      {
        activeItem && 
        <DeleteModal
          item={activeItem.id}
          openModal={isOpen.delete}
          onDelete={(id) => deleteLicencia.mutateAsync(id)}
          isLoading={deleteLicencia.isPending}
          onClose={onCloseDeleteModal}
        />
      }
    </React.Fragment>
  )
}
