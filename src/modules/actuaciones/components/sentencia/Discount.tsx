import { Label, TextInput } from 'flowbite-react'

interface Props {
  descuento: number
  applyDiscount: (discount: number) => void
}

export const Discount = ({descuento, applyDiscount}: Props) => {
  return (
    <div className='mb-4 relative'>
      <div className='mb-2 block'>
        <Label className='text-sm font-medium' htmlFor='descuento'>Descuento (%)</Label>
      </div>
      <div className='flex justify-between'>
        <div className='relative w-full flex justify-between'>
          <TextInput
            id='descuento'
            name='descuento'
            className='w-full'
            type='number'
            placeholder='Descuento a aplicar (%)'
            min={0}
            step='0.01'
            value={descuento === 0 ? '' : descuento}
            onChange={(e) => applyDiscount(+e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
