import { Button } from 'flowbite-react'
import { ILibreDeuda } from '../interfaces'
import { clearNames } from '../../../shared'

interface Props {
  libreDeuda: ILibreDeuda
  closeModal: () => void
  onConfirm: () => void
}

export const ShowLibreDeuda = ({ libreDeuda, closeModal, onConfirm }: Props) => {
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


  return (
    <div className="space-y-6 p-4">
      <section className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 border-b pb-2">Datos del Vehículo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 text-gray-700 dark:text-white">
          <p><span className="font-medium">Nombre:</span> {clearNames(libreDeuda?.persona_apellido, libreDeuda?.persona_nombre) || '-'}</p>
          <p><span className="font-medium">DNI:</span> {libreDeuda?.persona_numero_documento || '-'}</p>
          <p><span className="font-medium">Dominio:</span> {libreDeuda?.vehiculo_dominio || '-'}</p>
          <p><span className="font-medium">Número Libre Deuda:</span> {libreDeuda?.numero_libre_deuda || '-'}</p>
          <p><span className="font-medium">Fecha:</span> {formatDate(libreDeuda?.fecha || '-')}</p>
        </div>
      </section>

      {(libreDeuda.vehiculo_cedula_frente || libreDeuda.vehiculo_cedula_dorso || libreDeuda.vehiculo_marbete) && (
        <section className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2 dark:text-white">Imágenes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {libreDeuda.vehiculo_cedula_frente && (
              <div>
                <p className="text-sm text-gray-600 dark:text-white mb-2">Cédula Frente</p>
                <img src={libreDeuda.vehiculo_cedula_frente} alt="Cédula Frente" className="w-full h-64 object-cover rounded-lg shadow-sm border" />
              </div>
            )}
            {libreDeuda.vehiculo_cedula_dorso && (
              <div>
                <p className="text-sm text-gray-600 dark:text-white mb-2">Cédula Dorso</p>
                <img src={libreDeuda.vehiculo_cedula_dorso} alt="Cédula Dorso" className="w-full h-64 object-cover rounded-lg shadow-sm border" />
              </div>
            )}
            {libreDeuda.vehiculo_marbete && (
              <div>
                <p className="text-sm text-gray-600 dark:text-white mb-2">Marbete</p>
                <img src={libreDeuda.vehiculo_marbete} alt="Marbete" className="w-full h-64 object-cover rounded-lg shadow-sm border" />
              </div>
            )}
          </div>
        </section>
      )}


      <div className="flex justify-end gap-4">
        {libreDeuda?.verificado === 0 && (
          <Button color="success" onClick={() => {
            onConfirm()
            closeModal()
          }}>
            Confirmar Titular
          </Button>
        )}
        <Button color="gray" onClick={closeModal}>Cerrar</Button>
      </div>

    </div>
  )
}
