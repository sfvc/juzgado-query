import { useState } from 'react'

/**
 * Estado de los modales de las pantallas tipo listado con alta, edicion y baja:
 * - modal de crear/editar (sin item = crear)
 * - modal de confirmar eliminacion
 */
export const useCrudModals = <T>() => {
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false)
  const [activeItem, setActiveItem] = useState<T | null>(null)

  /* Modal crear/editar */
  const onOpenModal = (item: T) => {
    setActiveItem(item)
    setOpenModal(true)
  }

  const onCloseModal = () => {
    setActiveItem(null)
    setOpenModal(false)
  }

  /* Modal eliminar */
  const onOpenDeleteModal = (item: T) => {
    setActiveItem(item)
    setOpenDeleteModal(true)
  }

  const closeDeleteModal = () => {
    setActiveItem(null)
    setOpenDeleteModal(false)
  }

  return {
    openModal,
    setOpenModal,
    openDeleteModal,
    activeItem,
    onOpenModal,
    onCloseModal,
    onOpenDeleteModal,
    closeDeleteModal
  }
}
