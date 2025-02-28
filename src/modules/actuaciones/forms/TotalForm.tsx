/* eslint-disable camelcase */
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Label, Radio, Textarea, TextInput } from 'flowbite-react'
import { AuthContext } from '../../../context/Auth/AuthContext'
import { useSentencia } from '../hooks/useSentencia'
import { Surcharge } from '../components/sentencia/Surcharge'
import { Discount } from '../components/sentencia/Discount'
import { ACTIONS } from '../constants'
import { ACTUACION } from '../../../shared/constants'
import { ConceptoForm } from './ConceptoForm'
import type { Concepto, ISentenciaForm, ITotal } from '../interfaces/sentencia'
import type { InfraccionesCometida } from '../interfaces'

const DISCOUNT = 40
const SURCHARGE = 0

const initialValues = {
  sub_total: 0,
  total: 0,
  descuento: DISCOUNT,
  recargo: SURCHARGE,
  observaciones: ''
}

interface Props {
  plantillaId: number,
  actas: number[]
  infracciones: InfraccionesCometida[]
}

export const TotalForm = ({ infracciones, plantillaId, actas }: Props) => {
  const { user } = useContext(AuthContext)
  const { createSentencia } = useSentencia()
  const [action, setAction] = useState<string>('NINGUNA')
  const [formState, setFormState] = useState<ITotal>(initialValues)
  const { sub_total, total, descuento, recargo, observaciones } = formState
  const [entries, setEntries] = useState<Concepto[]>([])

  const handleAction = (value: string) => {
    setAction(value)

    switch (value) {
    case ACTIONS.NINGUNA:
      calculateTotal()
      break
    case ACTIONS.DESCUENTO:
      applyDiscount()
      break
    case ACTIONS.RECARGO:
      applySurcharge()
      break
    default:
      calculateTotal()
      break
    }
  }

  const applyDiscount = (discount: number = DISCOUNT) => {
    if(discount > 100) return
    setFormState({ ...formState, recargo: 0, sub_total, descuento: discount, total })
  }

  const applySurcharge = (surcharge: number = SURCHARGE) => {
    setFormState({ ...formState, descuento: 0, sub_total, recargo: surcharge, total })
  }

  const calculateTotal = () => {
    const conceptoTotal = entries.reduce((acc, concepto) => acc + (concepto.monto || 0), 0)
  
    setFormState((prev) => {
      const nuevoSubTotal = infracciones.reduce((acc, infraccion) => acc + (infraccion.importe || 0), 0)
      const nuevoTotal = 
       action === 'DESCUENTO'
         ? Number((nuevoSubTotal - ((nuevoSubTotal * descuento) / 100)).toFixed(1))
         : action === 'RECARGO'
           ? Number((nuevoSubTotal + ((nuevoSubTotal * recargo) / 100)).toFixed(1))
           : nuevoSubTotal

      return {
        ...prev,
        sub_total: nuevoSubTotal,
        total: nuevoTotal + conceptoTotal
      }
    })
  }

  const onSubmit = async () => {
    const form: ISentenciaForm = {
      sub_total,
      total,
      descuento,
      recargo,
      observaciones,
      actas,
      plantilla_id: plantillaId,
      tipo_actuacion: ACTUACION.SENTENCIA,
      infracciones,
      user_id: user!.id,
      conceptos: entries
    }

    console.log(form)
    await createSentencia.mutateAsync(form)
  }

  useEffect(() => {
    calculateTotal()
  }, [infracciones, entries, action, descuento, recargo])
    
  return (
    <React.Fragment>
      <ConceptoForm entries={entries} setEntries={setEntries} />
      
      <div className='titulos rounded-md py-2 text-center my-6'>
        <h3 className='text-xl font-semibold text-white'>Totales</h3>
      </div>
      <div className='grid md:grid-cols-2 gap-4 grid-cols-1 mt-2'>
        <div className='mb-4 relative'>
          <div className='mb-2 block'>
            <Label className='text-sm font-medium' htmlFor='descuento'>Realizar descuento o recargo</Label>
          </div>
          <div className='flex justify-start gap-8'>
            <div className='flex items-center gap-2'>
              <Radio id='ninguna' name='acciones' value={ACTIONS.NINGUNA} checked={action === ACTIONS.NINGUNA} onChange={(e) => handleAction(e.target.value)} />
              <Label htmlFor='ninguna'>Ninguna</Label>
            </div>

            <div className='flex items-center gap-2'>
              <Radio id='descuento' name='acciones' value={ACTIONS.DESCUENTO} checked={action === ACTIONS.DESCUENTO} onChange={(e) => handleAction(e.target.value)} />
              <Label htmlFor='descuento'>Descuento</Label>
            </div>

            <div className='flex items-center gap-2'>
              <Radio id='recargo' name='acciones' value={ACTIONS.RECARGO} checked={action === ACTIONS.RECARGO} onChange={(e) => handleAction(e.target.value)} />
              <Label htmlFor='recargo'>Recargo</Label>
            </div>
          </div>
        </div>

        { action === 'DESCUENTO' && <Discount descuento={descuento} applyDiscount={applyDiscount}/> }

        { action === 'RECARGO' && <Surcharge recargo={recargo} applySurcharge={applySurcharge}/> }

        <div className='mb-4 relative'>
          <div className='mb-2 block'>
            <Label className='text-sm font-medium' htmlFor='sub_total'>Sub Total</Label>
          </div>
          <div className='relative w-full'>
            <TextInput name='sub_total' type='number' value={sub_total} min={0} readOnly/>
          </div>
        </div>

        <div className='mb-4 relative'>
          <div className='mb-2 block'>
            <Label className='text-sm font-medium' htmlFor='total'>Total</Label>
          </div>
          <div className='relative w-full'>
            <TextInput name='total' type='number' value={total}  min={0} readOnly />
          </div>
        </div>

        <div className='mb-4 relative'>
          <div className='mb-2 block'>
            <Label className='text-sm font-medium' htmlFor='observaciones'>Observaciones</Label>
          </div>

          <div className='relative w-full'>
            <Textarea
              className='block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 
                focus:border-cyan-500 focus:ring-cyan-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 
                dark:focus:border-cyan-500 dark:focus:ring-cyan-500 p-2.5 text-sm rounded-lg'
              name='observaciones'
              placeholder='Observaciones'
              value={observaciones}
              onChange={(e) => setFormState({ ...formState, observaciones: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className='flex justify-end w-full'>
        <Link to={ -1 as unknown as string }>
          <Button type='button' color='failure' className='w-auto h-auto'>Cancelar</Button>
        </Link>
        <Button 
          type='button' 
          className='w-auto h-auto ml-4' 
          onClick={onSubmit} 
          isProcessing={createSentencia.isPending}
          disabled={createSentencia.isPending}
        >
          Finalizar
        </Button>
      </div>
    </React.Fragment>
  )
}
