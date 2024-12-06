import React, { useState } from 'react'
import { Button, Modal, Pagination, Table, TextInput, Tooltip } from 'flowbite-react'
import { DeleteModal, icons } from '../../../../shared'
import { useUsuario } from '../hooks/useUsuario'
import { IUsuario } from '../interfaces'
import UsuarioForm from '../forms/UsuarioForm'
import { Column } from '../../../../shared/interfaces'
import { TableSkeleton } from '../../../../shared/components/TableSkeleton'

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
  const [activeItem, setActiveItem] = useState<IUsuario | null>(null)

  const { 
    usuarios,
    pagination,
    isFetching,
    filterParams,
    updateFilter,
    deleteUsuario 
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
  const openDelteModal = (usuario: IUsuario) => {
    setActiveItem(usuario)
    setOpenDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setActiveItem(null)
    setOpenDeleteModal(false)
  }

  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Listado de Usuarios</h1>
        <div className='flex flex-col justify-start'>
          <div className='flex md:justify-end gap-4'>
            <div className='relative'>
              <TextInput
                name='search'
                placeholder='Buscar'
                value={filterParams.search}
                onChange={(e) => updateFilter('search', e.target.value)}
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
            isFetching
              ? <TableSkeleton colums={colums.length}/>
              : (usuarios.length > 0)
                ? (usuarios.map((usuario: IUsuario) => (
                  <Table.Row key={usuario.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell className='text-center dark:text-white'>{usuario.nombre}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{usuario.dni}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{usuario.username}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{usuario.juzgado.nombre}</Table.Cell>
                    <Table.Cell className='text-center dark:text-white'>{usuario.role.nombre}</Table.Cell>
                    <Table.Cell className='flex gap-2 text-center items-center justify-center'>
                      <Tooltip content='Editar'>
                        <Button color='success' onClick={() => onOpenModal(usuario)} className='w-8 h-8 flex items-center justify-center'>
                          <icons.Pencil />
                        </Button>
                      </Tooltip>

                      <Tooltip content='Eliminar'>
                        <Button color='failure' onClick={() => openDelteModal(usuario)} className='w-8 h-8 flex items-center justify-center'>
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
    </React.Fragment>
  )
}
