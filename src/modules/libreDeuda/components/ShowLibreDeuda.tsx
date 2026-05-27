/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from 'flowbite-react'
import { ILibreDeuda } from '../interfaces'
import { clearNames } from '../../../shared'
import { useState } from 'react'

interface Props {
  libreDeuda: ILibreDeuda
  closeModal: () => void
  onConfirm: () => void
}

export const ShowLibreDeuda = ({ libreDeuda, closeModal, onConfirm }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleString('es-AR', {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour12: false,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch (e) {
      return dateString
    }
  }

  const renderImage = (src: string, alt: string, label: string) => (
    <div>
      <p className="text-sm text-gray-600 dark:text-white mb-2">{label}</p>

      <img
        src={src}
        alt={alt}
        onClick={() => setSelectedImage(src)}
        className="w-full h-64 object-cover rounded-lg shadow-sm border cursor-pointer transition hover:scale-[1.02]"
      />
    </div>
  )

  return (
    <>
      <div className="space-y-6 p-4">
        <section className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-b pb-2">
            Datos del Vehículo
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-gray-700 dark:text-white">
            <p>
              <span className="font-medium">Nombre:</span>{' '}
              {clearNames(libreDeuda?.persona_apellido, libreDeuda?.persona_nombre) || '-'}
            </p>

            <p>
              <span className="font-medium">DNI:</span>{' '}
              {libreDeuda?.persona_numero_documento || '-'}
            </p>

            <p>
              <span className="font-medium">Fecha:</span>{' '}
              {formatDate(libreDeuda?.fecha || '-')}
            </p>

            <p>
              <span className="font-medium">Número Libre Deuda:</span>{' '}
              {libreDeuda?.numero_libre_deuda || '-'}
            </p>

            <p>
              <span className="font-medium">Dominio:</span>{' '}
              {libreDeuda?.vehiculo_dominio || '-'}
            </p>

            <p>
              <span className="font-medium">Tipo de Vehículo:</span>{' '}
              {libreDeuda?.vehiculo?.tipo?.nombre || '-'}
            </p>

            <p>
              <span className="font-medium">Marca:</span>{' '}
              {libreDeuda?.vehiculo?.marca?.nombre || '-'}
            </p>

            <p>
              <span className="font-medium">Modelo:</span>{' '}
              {libreDeuda?.vehiculo?.modelo || '-'}
            </p>

            <p>
              <span className="font-medium">Número de Chasis:</span>{' '}
              {libreDeuda?.vehiculo?.numero_chasis || '-'}
            </p>

            <p>
              <span className="font-medium">Número de Motor:</span>{' '}
              {libreDeuda?.vehiculo?.numero_motor || '-'}
            </p>

            {libreDeuda?.vehiculo?.tipo?.id === 50067 && (
              <p>
                <span className="font-medium">Número de Taxi o Remis:</span>{' '}
                {libreDeuda?.vehiculo?.numero_taxi_remis || '-'}
              </p>
            )}
          </div>
        </section>

        {(libreDeuda?.vehiculo_cedula_frente ||
          libreDeuda?.vehiculo_cedula_dorso ||
          libreDeuda?.vehiculo_marbete) && (
          <section className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 dark:text-white">
              Imágenes
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {libreDeuda?.vehiculo_cedula_frente &&
                renderImage(
                  libreDeuda?.vehiculo_cedula_frente,
                  'Cédula Frente',
                  'Cédula Frente'
                )}

              {libreDeuda?.vehiculo_cedula_dorso &&
                renderImage(
                  libreDeuda?.vehiculo_cedula_dorso,
                  'Cédula Dorso',
                  'Cédula Dorso'
                )}

              {libreDeuda?.vehiculo_marbete &&
                renderImage(
                  libreDeuda?.vehiculo_marbete,
                  'Marbete',
                  'Marbete'
                )}
            </div>
          </section>
        )}

        <div className="flex justify-end gap-4">
          {!libreDeuda?.verificado && (
            <Button
              color="success"
              onClick={() => {
                onConfirm()
                closeModal()
              }}
            >
              Confirmar Titular
            </Button>
          )}

          <Button color="gray" onClick={closeModal}>
            Cerrar
          </Button>
        </div>
      </div>

      {/* MODAL DE IMAGEN */}
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
