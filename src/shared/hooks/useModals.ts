import { useState } from 'react'

export interface ModalAction {
  delete: boolean
  edit: boolean
  create: boolean
}

export const useModals = () => {
  const [isOpen, setIsOpen] = useState<ModalAction>({
    delete: false,
    edit: false,
    create: false
  })

  const openModal = (action: string) => {
    setIsOpen((prev) => ({
      ...prev,
      [action]: true,
    }))
  }

  const closeModal = (action: string) => {
    setIsOpen((prev) => ({
      ...prev,
      [action]: false,
    }))
  }

  return {
    isOpen,
    openModal,
    closeModal
  }
}
