import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, TextInput, Tooltip } from 'flowbite-react'
import { useInhabilitado } from '../hooks/useInhabilitado'
import { TableSkeleton } from '../../../shared/components/TableSkeleton'
import { DeleteModal, icons } from '../../../shared'
import InhabilitadoForm from '../forms/InhabilitadoForm'
import type { Column } from '../../../shared/interfaces'
import type { IInhabilitado } from '../interfaces'
import { InhabilitadoHistory } from '../components/InhabilitadoHistory'


const colums: Column[] = [
  { key: 'id', label: 'Id' },
  { key: 'persona', label: 'Persona' },
  { key: 'fecha_inhabilitacion', label: 'Fecha de inhabilitación' },
  { key: 'fecha_vencimiento', label: 'Fecha de vencimiento' },
  { key: 'causa', label: 'Causa' },
  { key: 'organismo', label: 'organismo' },
  { key: 'acciones', label: 'Acciones' },
]

export const Inhabilitado = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openHistoryModal, setOpenHistoryModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<IInhabilitado | null>(null)

  const { 
    inhabilitados,
    pagination,
    isFetching,
    filterParams,
    updateFilter,
    deleteInhabilitado 
  } = useInhabilitado()

  /* Modal crear */
  const onCloseModal = async () => {
    setActiveItem(null)
    setOpenModal(false)
  }

  /* Modal eliminar */
  const onOpenDeleteModal = (inhabilitado: IInhabilitado) => {
    setActiveItem(inhabilitado)
    setOpenDeleteModal(true)
  }

  const onCloseDeleteModal = () => {
    setActiveItem(null)
    setOpenDeleteModal(false)
  }

  /* Modal historial */
  const onOpenHistoryModal = (inhabilitado: IInhabilitado) => {
    setActiveItem(inhabilitado)
    setOpenHistoryModal(true)
  }

  const onCloseHistoryModal = () => {
    setActiveItem(null)
    setOpenHistoryModal(false)
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Inhabilitados</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <div className='relative'>
              <TextInput
                name='query'
                placeholder='Buscar'
                value={filterParams.query}
                onChange={(e) => updateFilter('query', e.target.value)}
              />
              <icons.Search hidden={filterParams.query}/>
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
          {colums.map((column: Column) => (
            <Table.HeadCell key={column.key} className='text-center bg-gray-300'>{column.label}</Table.HeadCell>
          ))}
        </Table.Head>

        <Table.Body className='divide-y'>
          {
            isFetching
              ? <TableSkeleton colums={colums.length}/>
              : (inhabilitados.length > 0)
                ? (inhabilitados.map((inhabilitado: IInhabilitado) => (
                  <Table.Row key={inhabilitado.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='text-center dark:text-white'>{inhabilitado.id}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{inhabilitado?.persona?.apellido}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{inhabilitado.fecha_desde}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{inhabilitado.fecha_hasta}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{inhabilitado.causa}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{inhabilitado?.juzgado?.nombre}</Table.Cell>

                    <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                      <Tooltip content='Historial'>
                        <Button onClick={() => onOpenHistoryModal(inhabilitado)} className='w-8 h-8 flex items-center justify-center'>
                          <icons.History />
                        </Button>
                      </Tooltip>
                      
                      <Tooltip content='Eliminar'>
                        <Button color='failure' onClick={() => onOpenDeleteModal(inhabilitado)} className='w-8 h-8 flex items-center justify-center'>
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

      {/* Modal crear */} 
      <Modal show={openModal} onClose={onCloseModal} size='5xl'>
        <Modal.Header>Agregar Inhabilitado</Modal.Header>
        <Modal.Body>
          <InhabilitadoForm onSucces={onCloseModal} />
        </Modal.Body>
      </Modal>

      {/* Modal eliminar */} 
      {
        activeItem && 
        <DeleteModal
          item={activeItem.id}
          openModal={openDeleteModal}
          onDelete={(id) => deleteInhabilitado.mutateAsync(id)}
          isLoading={deleteInhabilitado.isPending}
          onClose={onCloseDeleteModal}
        />
      }

      {/* Modal de historial */} 
      <Modal show={openHistoryModal} onClose={onCloseHistoryModal} size='5xl'>
        <Modal.Header>Agregar Inhabilitado</Modal.Header>
        <Modal.Body>
          <InhabilitadoHistory 
            dni={activeItem?.persona?.numero_documento} 
            isOpen={openHistoryModal} 
            closeModal={onCloseHistoryModal}
          />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}
