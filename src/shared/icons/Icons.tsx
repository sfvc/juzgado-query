export const Pencil = () => {
  return (
    <div>
      <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-edit' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1' />
        <path d='M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z' />
        <path d='M16 5l3 3' />
      </svg>
    </div>
  )
}

export const Trash = () => {
  return (
    <div>
      <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-x' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M18 6l-12 12' />
        <path d='M6 6l12 12' />
      </svg>
    </div>
  )
}

export const Search = () => {
  return (
    <div className='absolute top-3 right-2'>
      <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-search dark:stroke-white' width='16' height='16' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#000000' fill='none' strokeLinecap='round' strokeLinejoin='round'>
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0' />
        <path d='M21 21l-6 -6' />
      </svg>
    </div>
  )
}

export const Warning = () => {
  return (
    <div className='flex justify-center'>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-14 text-red-700">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
    </div>
  )
}

export const Eye = () => {
  return (
    <div className='flex justify-center'>
      <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-eye' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1' stroke='#000000' fill='none' strokeLinecap='round' strokeLinejoin='round'>
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
        <path d='M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6' />
      </svg>
    </div>
  )
}

export const EyeClose = () => {
  return (
    <div className='flex justify-center'>
      <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-eye-closed' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1' stroke='#000000' fill='none' strokeLinecap='round' strokeLinejoin='round'>
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M21 9c-2.4 2.667 -5.4 4 -9 4c-3.6 0 -6.6 -1.333 -9 -4' />
        <path d='M3 15l2.5 -3.8' />
        <path d='M21 14.976l-2.492 -3.776' />
        <path d='M9 17l.5 -4' />
        <path d='M15 17l-.5 -4' />
      </svg>
    </div>
  )
}

export const Logout = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-logout dark:stroke-white mr-2' width='16' height='16' viewBox='0 0 24 24' strokeWidth='1.5' stroke='#000000' fill='none' strokeLinecap='round' strokeLinejoin='round'>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2' />
      <path d='M9 12h12l-3 -3' />
      <path d='M18 15l3 -3' />
    </svg>
  )
}