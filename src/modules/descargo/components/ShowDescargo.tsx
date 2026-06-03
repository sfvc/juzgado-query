import { Button, Modal } from 'flowbite-react'
import { useState } from 'react'
import { IDescargo } from '../interfaces'

interface Props {
  descargo: IDescargo
  closeModal: () => void
  onConfirm: () => void
  onReject: () => void
}

export const ShowDescargo = ({
  descargo,
  closeModal,
  onConfirm,
  onReject
}: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [confirmModal, setConfirmModal] = useState(false)
  const [actionType, setActionType] = useState<
    'approve' | 'reject' | null
  >(null)

  const renderImage = (src: string, alt: string, label: string) => (
    <div>
      <p className="text-sm text-gray-600 dark:text-white mb-2">
        {label}
      </p>

      <img
        src={src}
        alt={alt}
        onClick={() => setSelectedImage(src)}
        className="w-full h-64 object-cover rounded-lg shadow-sm border cursor-pointer transition hover:scale-[1.02]"
      />
    </div>
  )

  const handleAction = async () => {
    if (actionType === 'approve') {
      await onConfirm()
    }

    if (actionType === 'reject') {
      await onReject()
    }

    setConfirmModal(false)
    setActionType(null)
    closeModal()
  }

  return (
    <>
      <div>
        <section className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-b pb-2">
            Información del Descargo
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-gray-700 dark:text-white">
            <p>
              <span className="font-medium">N° Descargo:</span>{' '}
              {descargo.numero_descargo || '-'}
            </p>

            <p>
              <span className="font-medium">Fecha:</span>{' '}
              {descargo.fecha_registro || '-'}
            </p>

            <p>
              <span className="font-medium">N° Acta:</span>{' '}
              {descargo.acta?.numero_acta || '-'}
            </p>

            <p>
              <span className="font-medium">Estado:</span>{' '}
              {descargo.estado || '-'}
            </p>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-b pb-2">
            Datos del Infractor
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-gray-700 dark:text-white">
            <p>
              <span className="font-medium">Apellido:</span>{' '}
              {descargo.infractor?.apellido || '-'}
            </p>

            <p>
              <span className="font-medium">Nombre:</span>{' '}
              {descargo.infractor?.nombre || '-'}
            </p>

            <p>
              <span className="font-medium">DNI:</span>{' '}
              {descargo.infractor?.dni || '-'}
            </p>

            <p>
              <span className="font-medium">CUIT:</span>{' '}
              {descargo.infractor?.cuit || '-'}
            </p>

            <p>
              <span className="font-medium">Email:</span>{' '}
              {descargo.infractor?.email || '-'}
            </p>

            <p>
              <span className="font-medium">Teléfono:</span>{' '}
              {descargo.infractor?.telefono || '-'}
            </p>
          </div>
        </section>

        <section className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-b pb-2">
            Texto del Descargo
          </h2>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border whitespace-pre-wrap text-gray-700 dark:text-white">
            {descargo.texto || 'Sin descripción'}
          </div>
        </section>

        {descargo.archivos?.length > 0 && (
          <section className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 dark:text-white">
              Archivos Adjuntos
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {descargo.archivos.map((archivo: string, index: number) => (
                <div key={`${archivo}-${index}`}>
                  {renderImage(
                    archivo,
                    `Archivo ${index + 1}`,
                    `Archivo ${index + 1}`
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="flex justify-end gap-4 mt-6">
          {descargo.estado === 'PENDIENTE' && (
            <>
              <Button
                color="failure"
                onClick={() => {
                  setActionType('reject')
                  setConfirmModal(true)
                }}
              >
                Rechazar Descargo
              </Button>

              <Button
                color="success"
                onClick={() => {
                  setActionType('approve')
                  setConfirmModal(true)
                }}
              >
                Aprobar Descargo
              </Button>
            </>
          )}

          <Button color="gray" onClick={closeModal}>
            Cerrar
          </Button>
        </div>
      </div>

      <Modal
        show={confirmModal}
        size="md"
        popup
        onClose={() => {
          setConfirmModal(false)
          setActionType(null)
        }}
      >
        <Modal.Header />

        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
              ¿Estás seguro?
            </h3>

            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
              {actionType === 'approve'
                ? 'Se aprobará el descargo. Esta acción es irreversible.'
                : 'Se rechazará el descargo. Esta acción es irreversible.'}
            </p>

            <div className="flex justify-center gap-4">
              <Button
                color={actionType === 'reject' ? 'failure' : 'success'}
                onClick={handleAction}
              >
                Sí, continuar
              </Button>

              <Button
                color="gray"
                onClick={() => {
                  setConfirmModal(false)
                  setActionType(null)
                }}
              >
                Cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
        >
          <img
            src={selectedImage}
            alt="Vista ampliada"
            className="max-w-full max-h-full rounded-xl shadow-2xl object-contain"
          />
        </div>
      )}
    </>
  )
}
