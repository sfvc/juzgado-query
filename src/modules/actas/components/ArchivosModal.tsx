import { Button, Modal } from 'flowbite-react'
import { icons } from '../../../shared'

const VIDEO_EXT = /\.(mp4|webm|ogg|mov)$/i
const IMAGE_EXT = /\.(png|jpe?g|gif|webp|avif)$/i

interface Props {
  show: boolean
  onClose: () => void
  adjuntos?: string[]
}

// Muestra las fotos, videos y documentos adjuntos de un acta
export const ArchivosModal = ({ show, onClose, adjuntos }: Props) => {
  return (
    <Modal
      show={show}
      onClose={onClose}
      size='4xl'
    >
      <Modal.Header>
          Archivos del acta
      </Modal.Header>

      <Modal.Body>
        {!adjuntos?.length ? (
          <div className='flex flex-col items-center justify-center py-10 text-gray-500 dark:text-gray-400'>
            <icons.Pdf />

            <p className='mt-3 text-lg'>
                No hay archivos asociados a esta acta.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {adjuntos.map((url, index) => {
              const isVideo = VIDEO_EXT.test(url)
              const isImage = IMAGE_EXT.test(url)

              return (
                <div
                  key={index}
                  className='border rounded-lg overflow-hidden dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                >
                  {isVideo ? (
                    <video
                      src={url}
                      controls
                      className='w-full h-48 object-cover bg-black'
                    />
                  ) : isImage ? (
                    <a href={url} target='_blank' rel='noreferrer'>
                      <img
                        src={url}
                        alt={`Archivo ${index + 1}`}
                        className='w-full h-48 object-cover'
                      />
                    </a>
                  ) : (
                    <a
                      href={url}
                      target='_blank'
                      rel='noreferrer'
                      className='flex flex-col items-center justify-center gap-2 h-48 text-gray-500 dark:text-gray-400'
                    >
                      <icons.Pdf />
                      <span className='text-sm truncate px-2'>{`Archivo ${index + 1}`}</span>
                    </a>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Button
          color='gray'
          onClick={onClose}
        >
            Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
