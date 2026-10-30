import { useState } from 'react'
import { Button, Label, Modal, Textarea, TextInput } from 'flowbite-react'
import type { IConducta } from '../interfaces'

const CONDUCTA_VACIA: IConducta = {
  denominacion: '',
  sujeto_activo: '',
  conducta_tipica: '',
  sancion: '',
  valor_desde: '',
  valor_hasta: ''
}

interface Props {
  conductas: IConducta[]
  onChange: (conductas: IConducta[]) => void
}

// Listado de conductas de un articulo con su modal para agregar y editar
export const ConductasField = ({ conductas, onChange }: Props) => {
  const [openConducta, setOpenConducta] = useState<boolean>(false)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [conductaForm, setConductaForm] = useState<IConducta>(CONDUCTA_VACIA)
  const [conductaError, setConductaError] = useState<string>('')

  const onOpenConducta = (index: number | null = null) => {
    setEditIndex(index)
    setConductaForm(index !== null ? conductas[index] : CONDUCTA_VACIA)
    setConductaError('')
    setOpenConducta(true)
  }

  const onSaveConducta = () => {
    const desde = Number(conductaForm.valor_desde || 0)
    const hasta = Number(conductaForm.valor_hasta || 0)

    if (!conductaForm.denominacion.trim()) return setConductaError('La denominacion es requerida')
    if (!conductaForm.conducta_tipica.trim()) return setConductaError('La conducta tipica es requerida')
    if (hasta < desde) return setConductaError('El valor hasta no puede ser menor al valor desde')

    const item: IConducta = {
      ...conductaForm,
      denominacion: conductaForm.denominacion.trim(),
      conducta_tipica: conductaForm.conducta_tipica.trim(),
      valor_desde: desde,
      valor_hasta: hasta
    }

    onChange(editIndex !== null ? conductas.map((c, i) => i === editIndex ? item : c) : [...conductas, item])
    setOpenConducta(false)
  }

  return (
    <>
      <div className='mb-4'>
        <div className='mb-2 flex items-center justify-between'>
          <Label value='Conductas' />
          <Button type='button' size='xs' onClick={() => onOpenConducta()}>Agregar conducta</Button>
        </div>
        <div className='border rounded-lg divide-y dark:border-gray-600 dark:divide-gray-600'>
          {conductas.length > 0
            ? conductas.map((c, i) => (
              <div key={i} className='flex items-center justify-between gap-4 p-2.5 text-sm dark:text-white'>
                <div className='flex-1'>
                  <p className='font-medium'>{c.denominacion}{c.sujeto_activo && ` (${c.sujeto_activo})`}</p>
                  <p>{c.conducta_tipica}</p>
                  <p className='text-gray-500 dark:text-gray-400'>{c.sancion || `Multa de ${Number(c.valor_desde)} a ${Number(c.valor_hasta)} UM`}</p>
                </div>
                <div className='flex gap-2'>
                  <Button type='button' size='xs' color='success' onClick={() => onOpenConducta(i)}>Editar</Button>
                  <Button type='button' size='xs' color='failure' onClick={() => onChange(conductas.filter((_, idx) => idx !== i))}>Quitar</Button>
                </div>
              </div>
            ))
            : <p className='p-2.5 text-sm text-gray-500 dark:text-gray-400'>Sin conductas agregadas</p>}
        </div>
      </div>

      <Modal show={openConducta} onClose={() => setOpenConducta(false)} size='lg'>
        <Modal.Header>{editIndex === null ? 'Agregar Conducta' : 'Editar Conducta'}</Modal.Header>
        <Modal.Body>
          <div className='mb-4'>
            <div className='mb-2 block'>
              <Label htmlFor='conducta_denominacion' value='Denominacion' /><strong className='obligatorio'>(*)</strong>
            </div>
            <TextInput
              id='conducta_denominacion'
              placeholder='Denominacion'
              value={conductaForm.denominacion}
              onChange={(e) => setConductaForm({ ...conductaForm, denominacion: e.target.value })}
            />
          </div>
          <div className='mb-4'>
            <div className='mb-2 block'>
              <Label htmlFor='conducta_sujeto' value='Sujeto activo' />
            </div>
            <TextInput
              id='conducta_sujeto'
              placeholder='Conductor, Titular...'
              value={conductaForm.sujeto_activo}
              onChange={(e) => setConductaForm({ ...conductaForm, sujeto_activo: e.target.value })}
            />
          </div>
          <div className='mb-4'>
            <div className='mb-2 block'>
              <Label htmlFor='conducta_tipica' value='Conducta tipica' /><strong className='obligatorio'>(*)</strong>
            </div>
            <Textarea
              id='conducta_tipica'
              rows={3}
              placeholder='Conducta tipica...'
              value={conductaForm.conducta_tipica}
              onChange={(e) => setConductaForm({ ...conductaForm, conducta_tipica: e.target.value })}
              className='p-2.5'
            />
          </div>
          <div className='mb-4'>
            <div className='mb-2 block'>
              <Label htmlFor='conducta_sancion' value='Sancion' />
            </div>
            <TextInput
              id='conducta_sancion'
              placeholder='Multa de 10 a 50 UM'
              value={conductaForm.sancion}
              onChange={(e) => setConductaForm({ ...conductaForm, sancion: e.target.value })}
            />
          </div>
          <div className='grid grid-cols-2 gap-4 mb-4'>
            <div>
              <div className='mb-2 block'><Label htmlFor='conducta_desde' value='Valor Desde (UM)' /></div>
              <TextInput
                id='conducta_desde'
                type='number'
                value={conductaForm.valor_desde}
                onChange={(e) => setConductaForm({ ...conductaForm, valor_desde: e.target.value })}
              />
            </div>
            <div>
              <div className='mb-2 block'><Label htmlFor='conducta_hasta' value='Valor Hasta (UM)' /></div>
              <TextInput
                id='conducta_hasta'
                type='number'
                value={conductaForm.valor_hasta}
                onChange={(e) => setConductaForm({ ...conductaForm, valor_hasta: e.target.value })}
              />
            </div>
          </div>
          {conductaError && <p className='text-sm text-red-600 mb-4'>{conductaError}</p>}
          <div className='flex justify-end'>
            <Button type='button' onClick={onSaveConducta}>Aceptar</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}
