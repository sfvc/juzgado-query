import { Label, Select } from 'flowbite-react'

const SURCHARGES_AVALABLES = [
  { label: 'Sin recargo', value: 0 },
  { label: '10%', value: 10 },
  { label: '25%', value: 25 },
  { label: '50%', value: 50 },
  { label: '75%', value: 75 },
  { label: '100%', value: 100 }
]

interface Props {
    recargo: number
    applySurcharge: (value: number) => void
}

export const Surcharge = ({recargo, applySurcharge}: Props) => {
  return (
    <div className='mb-4 relative'>
      <div className='mb-2 block'>
        <Label className='text-sm font-medium' htmlFor='recargo'>Recargo (%)</Label>
      </div>
      <div className='flex'>
        <div className='relative w-full'>
          <Select name='recargo' id='recargo' className='w-full' defaultValue={recargo} onChange={(e) => applySurcharge(+e.target.value)}>
            {
              SURCHARGES_AVALABLES.map((surcharge, index) => (
                <option key={index} value={surcharge.value}>{surcharge.label}</option>
              ))
            }
          </Select>
        </div>
      </div>
    </div>
  )
}
