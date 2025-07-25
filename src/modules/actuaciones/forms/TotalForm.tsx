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
import { toast } from 'react-toastify'

const DISCOUNT = 40
const SURCHARGE = 0
const SIN_VALOR = 100

const initialValues = {
  sub_total: 0,
  total: 0,
  descuento: 0,
  recargo: 0,
  sinValor: SIN_VALOR,
  observacion: '',
  observaciones: ''
}

interface Props {
  plantillaId: number,
  actas: number[]
  infracciones: InfraccionesCometida[]
  sinValor?: boolean
  observacion?: string 
}

export const TotalForm = ({ infracciones, plantillaId, actas, observacion = '' }: Props) => {
  const { user } = useContext(AuthContext)
  const { createSentencia } = useSentencia()
  const [action, setAction] = useState<string>('NINGUNA')
  const [formState, setFormState] = useState<ITotal>(initialValues)
  const { sub_total, total, descuento, recargo, observaciones } = formState
  const [entries, setEntries] = useState<Concepto[]>([])

  useEffect(() => {
    if (observacion) {
      setFormState(prev => ({
        ...prev,
        observacion: observacion
      }))
    }
  }, [observacion])

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
    case ACTIONS.SIN_VALOR:
      applySinValor()
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

  const applySinValor = () => {
    setFormState((prev) => ({
      ...prev,
      sub_total: 0,
      total: 0,
      descuento: 0,
      recargo: 0
    }))
  }  

  const calculateTotal = () => {
    const conceptoTotal = entries.reduce((acc, concepto) => acc + (concepto.monto || 0), 0)

    if (action === ACTIONS.SIN_VALOR) {
      applySinValor()
      return
    }

    if (action === ACTIONS.NINGUNA) {
      setFormState((prev) => ({
        ...prev,
        recargo: 0,
        descuento: 0,
      }))
    }
  
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
    const invalidConcepto = entries.some(concepto => !concepto || !concepto.concepto || concepto.monto === null)
  
    if (invalidConcepto) {
      toast.error('Terminá de asignar el concepto.')
      return
    }
  
    if (!user) {
      console.error('No se encontro el usuario.')
      return
    }
  
    const form: ISentenciaForm & { observacion: string, sinValor: boolean } = {
      sub_total,
      total,
      descuento,
      recargo,
      actas,
      plantilla_id: plantillaId,
      tipo_actuacion: ACTUACION.SENTENCIA,
      user_id: user.id,
      conceptos: entries,
      sinValor: action === ACTIONS.SIN_VALOR,
      observaciones: action !== ACTIONS.SIN_VALOR ? observaciones.trim() : '',
      observacion: action === ACTIONS.SIN_VALOR ? observaciones.trim() : '',
      ...(actas.length === 1 && { infracciones })
    }      
  
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

            <div className='flex items-center gap-2'>
              <Radio id='sin_valor' name='acciones' value={ACTIONS.SIN_VALOR} checked={action === ACTIONS.SIN_VALOR} onChange={(e) => handleAction(e.target.value)} />
              <Label htmlFor='sin_valor'>Sin Valor</Label>
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