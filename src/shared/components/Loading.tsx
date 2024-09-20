import { Spinner } from 'flowbite-react'

export const Loading = () => {
  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
      <Spinner aria-label='Extra large spinner example' size='xl' />
    </div>
  )
}
