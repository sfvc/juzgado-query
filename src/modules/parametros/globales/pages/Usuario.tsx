import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, Tooltip } from 'flowbite-react'
import { DeleteModal, icons, InputTable } from '../../../../shared'
import { useUsuario } from '../hooks/useUsuario'
import UsuarioForm from '../forms/UsuarioForm'
import { TableSkeleton } from '../../../../shared/components/TableSkeleton'
import type { Column } from '../../../../shared/interfaces'
import type { IUsuario } from '../interfaces'

const colums: Column[] = [
  { key: 'nombre', label: 'Nombre' },
  { key: 'dni', label: 'Dni' },
  { key: 'username', label: 'Usuario' },
  { key: 'juzgado', label: 'Juzgado' },
  { key: 'rol', label: 'Rol' },
  { key: 'acciones', label: 'Acciones' },
]

export const Usuario = () => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openResetModal, setOpenResetModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<IUsuario | null>(null)

  const { 
    usuarios,
    pagination,
    isFetching,
    updateFilter,
    deleteUsuario,
    resetPassword
  } = useUsuario()

  /* Modal crear/editar */
  const onOpenModal = (usuario: IUsuario) => {
    setActiveItem(usuario)
    setOpenModal(true)
  }

  const onCloseModal = async () => {
    setActiveItem(null)
    setOpenModal(false)
  }

  /* Modal eliminar */
  const onOpenDeleteModal = (usuario: IUsuario) => {
    setActiveItem(usuario)
    setOpenDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setActiveItem(null)
    setOpenDeleteModal(false)
  }

  /* Modal resetear clave */
  const onOpenResetModal = (usuario: IUsuario) => {
    setActiveItem(usuario)
    setOpenResetModal(true)
  }

  const onCloseResetModal = () => {
    setActiveItem(null)
    setOpenResetModal(false)
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Usuarios</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <InputTable onSearch={(value: string) => updateFilter('search', value)} />
            
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
                : (usuarios.length > 0)
                  ? (usuarios.map((usuario: IUsuario) => (
                    <Table.Row key={usuario.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <Table.Cell className='text-center dark:text-white'>{usuario.nombre}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{usuario.dni}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{usuario.username}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{usuario.juzgado.nombre}</Table.Cell>
                      <Table.Cell className='text-center dark:text-white'>{usuario.role.name}</Table.Cell>
                      <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                        <Tooltip content='Editar'>
                          <Button color='success' onClick={() => onOpenModal(usuario)} className='w-8 h-8 flex items-center justify-center'>
                            <icons.Pencil />
                          </Button>
                        </Tooltip>

                        <Tooltip content='Eliminar'>
                          <Button color='failure' onClick={() => onOpenDeleteModal(usuario)} className='w-8 h-8 flex items-center justify-center'>
                            <icons.Trash />
                          </Button>
                        </Tooltip>

                        <Tooltip content='Resetear clave'>
                          <Button color='purple' onClick={() => onOpenResetModal(usuario)} className='w-8 h-8 flex items-center justify-center'>
                            <icons.Reset />
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
        <Modal.Header>{!activeItem ? 'Agregar Usuario' : 'Editar Usuario'}</Modal.Header>
        <Modal.Body>
          <UsuarioForm 
            usuario={activeItem} 
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
          onDelete={(id) => deleteUsuario.mutateAsync(id)}
          isLoading={deleteUsuario.isPending}
          onClose={closeDeleteModal}
        />
      }

      {/* Modal resetear clave */} 
      <Modal show={openResetModal} onClose={onCloseResetModal} size='3xl'>
        <Modal.Header>Resetear contraseña</Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <icons.Warning />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                ¿Estás seguro de que deseas resetear la clave del usuario?
            </h3>
          
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={onCloseResetModal}>Cancelar</Button>
              <Button 
                color="failure" 
                onClick={ async() => {
                  await resetPassword.mutateAsync(activeItem!.id)
                  onCloseResetModal()
                }} 
                isProcessing={resetPassword.isPending}
                disabled={resetPassword.isPending}
              > 
                Sí, resetear
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  )
}
