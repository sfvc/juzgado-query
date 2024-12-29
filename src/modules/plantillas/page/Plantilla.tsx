import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, Tooltip } from 'flowbite-react'
import { DeleteModal, InputTable, useLoading } from '../../../shared'
import { usePlantilla } from '../hooks/usePlantilla'
import PlantillaForm from '../forms/PlantillaForm'
import { LoadingOverlay } from '../../../layout'
import { carboneActions } from '../../carbone'
import { TableSkeleton } from '../../../shared/components/TableSkeleton'
import { RoleGuard, UserRole } from '../../../auth'
import { EditPlantilla } from '../components/EditPlantilla'
import { useModals } from '../../../shared/hooks/useModals'
import { icons } from '../../../shared'
import type { Column } from '../../../shared/interfaces'
import type { IPlantilla } from '../interfaces'

const colums: Column[] = [
  { key: 'id', label: 'Id' },
  { key: 'denominacion', label: 'Denominación' },
  { key: 'juzgado', label: 'Juzgado' },
  { key: 'tipo_actuacion', label: 'Tipo de Actuacion' },
  { key: 'acciones', label: 'Acciones' },
]

const DICTIONARY_PATH = '/diccionario-juzgado-de-faltas.pdf'

export const Plantilla = () => {
  const { isOpen, openModal, closeModal } = useModals()
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<IPlantilla | null>(null)
  const useAction = useLoading()


  const { 
    plantillas,
    pagination,
    isFetching,
    updateFilter,
    deletePlantilla 
  } = usePlantilla()

  /* Modal editar */
  const onEditModal = (plantilla: IPlantilla) => {
    setActiveItem(plantilla)
    openModal('edit')
  }

  const closeEditModal = () => {
    setActiveItem(null)
    closeModal('edit')
  }

  /* Modal eliminar */
  const openDelteModal = (plantilla: IPlantilla) => {
    setActiveItem(plantilla)
    setOpenDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setActiveItem(null)
    setOpenDeleteModal(false)
  }

  /* Acciones sobre carbon */
  const dowloadPlantilla = (path: string) => {
    useAction.actionFn(async () => {
      await carboneActions.downloadPlantilla(path)
    })
  }

  const showPlantilla = (path: string) => {
    useAction.actionFn(async () => {
      await carboneActions.showPlantilla(path)
    })
  }

  /* Mostrar diccionario de variables */
  const renderDictionaryPDF = async () => {
    window.open(DICTIONARY_PATH, '_blank')
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Plantillas</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <InputTable onSearch={(value: string) => updateFilter('query', value)} />
            
            <Button type='button' color="purple" onClick={renderDictionaryPDF} >Diccionario</Button>
            <Button type='button' onClick={() => openModal('create')} >Agregar</Button>
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
                : (plantillas.length > 0)
                  ? (plantillas.map((plantilla: IPlantilla) => (
                    <Table.Row key={plantilla.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell className='text-center dark:text-white'>{plantilla.id}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{plantilla.denominacion}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{plantilla.juzgado.nombre}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{plantilla.tipo_actuacion}</Table.Cell>
                      <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                        <Tooltip content='Descargar'>
                          <Button color='warning' onClick={() => dowloadPlantilla(plantilla.path)} className='w-8 h-8 flex items-center justify-center'>
                            <icons.Dowloand />
                          </Button>
                        </Tooltip>

                        <Tooltip content='Ver'>
                          <Button color='blue' onClick={() => showPlantilla(plantilla.path)} className='w-8 h-8 flex items-center justify-center'>
                            <icons.Show />
                          </Button>
                        </Tooltip>

                        <RoleGuard roles={[UserRole.ADMIN, UserRole.JEFE, UserRole.JUEZ, UserRole.SECRETARIO]}>
                          <Tooltip content='Editar'>
                            <Button color='success' onClick={() => onEditModal(plantilla)} className='w-8 h-8 flex items-center justify-center'>
                              <icons.Pencil />
                            </Button>
                          </Tooltip>
                          
                          <Tooltip content='Eliminar'>
                            <Button color='failure' onClick={() => openDelteModal(plantilla)} className='w-8 h-8 flex items-center justify-center'>
                              <icons.Trash />
                            </Button>
                          </Tooltip>
                        </ RoleGuard>
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
      <Modal show={isOpen.create} onClose={() => closeModal('create')} size='4xl'>
        <Modal.Header>Agregar Plantilla</Modal.Header>
        <Modal.Body>
          <PlantillaForm 
            plantilla={activeItem} 
            onSucces={() => closeModal('create')}
          />
        </Modal.Body>
      </Modal>

      {/* Modal editar */} 
      <Modal show={isOpen.edit} onClose={() => closeModal('edit')} size='4xl'>
        <Modal.Header>Editar Plantilla</Modal.Header>
        <Modal.Body>
          <EditPlantilla 
            plantilla={activeItem} 
            onCloseModal={closeEditModal}
          />
        </Modal.Body>
      </Modal>

      {/* Modal eliminar */} 
      {
        activeItem && 
        <DeleteModal
          item={activeItem.id}
          openModal={openDeleteModal}
          onDelete={(id) => deletePlantilla.mutateAsync(id)}
          isLoading={deletePlantilla.isPending}
          onClose={closeDeleteModal}
        />
      }

      { useAction.loading && <LoadingOverlay /> }
    </React.Fragment>
  )
}
