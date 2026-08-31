import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Dropdown, Modal, Tooltip } from 'flowbite-react'
import { RoleGuard, UserRole } from '../../../auth'
import { useMutationActa } from '../hooks/useMutationActa'
import { icons } from '../../../shared'
import type { IActa } from '../interfaces'

type ActaArchivo = {
  id?: number | string
  url: string
}

type ActaConArchivos = IActa & {
  adjuntos?: ActaArchivo[]
}

export const ActionButtons = ({ acta }: { acta: IActa }) => {
  const navigate = useNavigate()
  const { deleteActa } = useMutationActa()

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [openArchivosModal, setOpenArchivosModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<ActaConArchivos | null>(null)

  const onOpenModal = (acta: IActa) => {
    setActiveItem(acta)
    setOpenDeleteModal(true)
  }

  const onCloseModal = () => {
    setOpenDeleteModal(false)
    setActiveItem(null)
  }

  const handleArchivos = (acta: IActa) => {
    setActiveItem(acta as ActaConArchivos)
    setOpenArchivosModal(true)
  }

  const handleCloseArchivosModal = () => {
    setOpenArchivosModal(false)
    setActiveItem(null)
  }

  const handleEditActa = (id: number, tipo: string) => {
    const tipoActa = tipo.toLocaleLowerCase().replace(/\s+/g, '')
    navigate(`/acta/${tipoActa}/editar/${id}`)
  }

  const handleDeleteActa = async () => {
    if (!activeItem) return

    await deleteActa.mutateAsync(activeItem.id)
    onCloseModal()
  }

  const handleChangeStatus = (id: number) => navigate(`/acta/${id}/estados`)

  const handleNotification = (id: number) => navigate(`/acta/${id}/notificaciones`)

  const handleActuacion = (id: number) => navigate(`/acta/${id}/actuaciones`)

  return (
    <React.Fragment>
      <Dropdown
        label={icons.EllipsisVertical()}
        arrowIcon={false}
        placement='left'
        inline
      >
        <div className='flex flex-col justify-center items-center gap-2 m-2'>

          <Tooltip content='Editar' placement='left'>
            <Button
              color='success'
              onClick={() => handleEditActa(acta.id, acta.tipo_acta)}
              className='w-8 h-8 flex items-center justify-center'
            >
              <icons.Pencil />
            </Button>
          </Tooltip>

          <Tooltip content='Estados' placement='left'>
            <Button
              color='warning'
              onClick={() => handleChangeStatus(acta.id)}
              className='w-8 h-8 flex items-center justify-center'
            >
              <icons.Status />
            </Button>
          </Tooltip>

          {acta?.notificacion && !!acta.notificacion.length && (
            <Tooltip content='Notificaciones' placement='left'>
              <Button
                color='blue'
                onClick={() => handleNotification(acta.id)}
                className='w-8 h-8 flex items-center justify-center'
              >
                <icons.Notification />
              </Button>
            </Tooltip>
          )}

          <Tooltip content='Actuaciones' placement='left'>
            <Button
              color='purple'
              onClick={() => handleActuacion(acta.id)}
              className='w-8 h-8 flex items-center justify-center'
            >
              <icons.Actuacion />
            </Button>
          </Tooltip>

          {/* {acta?.adjuntos && !!acta.adjuntos.length && ( */}
          <Tooltip content='Archivos' placement='left'>
            <Button
              color='cyan'
              onClick={() => handleArchivos(acta)}
              className='w-8 h-8 flex items-center justify-center'
            >
              <icons.Pdf />
            </Button>
          </Tooltip>
          {/* )} */}

          <RoleGuard
            roles={[
              UserRole.ADMIN,
              UserRole.JEFE,
              UserRole.JUEZ,
              UserRole.SECRETARIO
            ]}
          >
            <Tooltip content='Eliminar' placement='left'>
              <Button
                color='failure'
                onClick={() => onOpenModal(acta)}
                className='w-8 h-8 flex items-center justify-center'
              >
                <icons.Trash />
              </Button>
            </Tooltip>
          </RoleGuard>

        </div>
      </Dropdown>

      {/* MODAL ELIMINAR */}
      {activeItem && (
        <Modal
          show={openDeleteModal}
          onClose={onCloseModal}
        >
          <Modal.Header>
            Eliminar acta
          </Modal.Header>

          <Modal.Body>
            <div className='text-center'>
              <icons.Warning />

              <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                ¿Estás seguro de que deseas eliminar el acta del listado?
              </h3>

              <div className='flex justify-center gap-4'>
                <Button
                  color='gray'
                  onClick={onCloseModal}
                >
                  Cancelar
                </Button>

                <Button
                  color='failure'
                  onClick={handleDeleteActa}
                  isProcessing={deleteActa.isPending}
                  disabled={deleteActa.isPending}
                >
                  Sí, eliminar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}

      {/* MODAL ARCHIVOS */}
      <Modal
        show={openArchivosModal}
        onClose={handleCloseArchivosModal}
        size='4xl'
      >
        <Modal.Header>
          Archivos del acta
        </Modal.Header>

        <Modal.Body>
          {!activeItem?.adjuntos?.length ? (
            <div className='flex flex-col items-center justify-center py-10 text-gray-500 dark:text-gray-400'>
              <icons.Pdf />

              <p className='mt-3 text-lg'>
                No hay archivos asociados a esta acta.
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {activeItem.adjuntos.map((archivo, index) => (
                <div
                  key={archivo.id ?? index}
                  className='border rounded-lg p-4 dark:border-gray-700'
                >
                  <div className='flex items-center justify-between gap-4'>
                    <div className='flex items-center gap-3 min-w-0'>
                      <icons.Pdf />

                      <div className='min-w-0'>
                        <p className='font-medium truncate'>
                          {`Archivo ${index + 1}`}
                        </p>
                      </div>
                    </div>

                    <Button
                      color='blue'
                      size='sm'
                      onClick={() => window.open(archivo.url, '_blank')}
                    >
                      Ver
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button
            color='gray'
            onClick={handleCloseArchivosModal}
          >
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  )
}
