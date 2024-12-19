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

export const Dowloand = ({size = 24 }: {size?: number}) => {
  return (
    <div>
      <svg xmlns='http://www.w3.org/2000/svg' width={size} height={size} viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='icon icon-tabler icons-tabler-outline icon-tabler-download'>
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2' />
        <path d='M7 11l5 5l5 -5' /><path d='M12 4l0 12' />
      </svg>
    </div>
  )
}

export const Show = () => {
  return (
    <div>
      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='icon icon-tabler icons-tabler-outline icon-tabler-eye'>
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0' />
        <path d='M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6' />
      </svg>
    </div>
  )
}

export const Search = ({hidden = ''}: {hidden: string}) => {
  return (
    <div className={`absolute top-3 right-2 ${hidden && 'hidden'}`}>
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
      <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-eye dark:stroke-white' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1' stroke='#000000' fill='none' strokeLinecap='round' strokeLinejoin='round'>
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
      <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-eye-closed dark:stroke-white' width='24' height='24' viewBox='0 0 24 24' strokeWidth='1' stroke='#000000' fill='none' strokeLinecap='round' strokeLinejoin='round'>
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

export const Antecedente = () => {
  return (
    <svg viewBox='0 0 24.00 24.00' className='dark:stroke-white stroke-black' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g id='SVGRepo_bgCarrier' strokeWidth='0' />
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
      <g id='SVGRepo_iconCarrier'>
        <path
          d='M4 12C4 12 5.6 7 12 7M12 7C18.4 7 20 12 20 12M12 7V4M18 5L16 7.5M6 5L8 7.5M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  )
}

export const Status = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-status-change' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M6 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
      <path d='M18 18m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0' />
      <path d='M6 12v-2a6 6 0 1 1 12 0v2' />
      <path d='M15 9l3 3l3 -3' />
    </svg>
  )
}

export const Notification = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icons-tabler-outline icon-tabler-message' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M8 9h8' />
      <path d='M8 13h6' />
      <path d='M10.99 19.206l-2.99 1.794v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6' />
      <path d='M15 19l2 2l4 -4' />
    </svg>
  )
}

export const Actuacion = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' className='icon icon-tabler icon-tabler-gavel' width='24' height='24' viewBox='0 0 24 24' strokeWidth='2' stroke='currentColor' fill='none' strokeLinecap='round' strokeLinejoin='round'>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M13 10l7.383 7.418c.823 .82 .823 2.148 0 2.967a2.11 2.11 0 0 1 -2.976 0l-7.407 -7.385' />
      <path d='M6 9l4 4' />
      <path d='M13 10l-4 -4' />
      <path d='M3 21h7' />
      <path d='M6.793 15.793l-3.586 -3.586a1 1 0 0 1 0 -1.414l2.293 -2.293l.5 .5l3 -3l-.5 -.5l2.293 -2.293a1 1 0 0 1 1.414 0l3.586 3.586a1 1 0 0 1 0 1.414l-2.293 2.293l-.5 -.5l-3 3l.5 .5l-2.293 2.293a1 1 0 0 1 -1.414 0z' />
    </svg>
  )
}

export const Print = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='icon icon-tabler icons-tabler-outline icon-tabler-printer'>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M17 17h2a2 2 0 0 0 2 -2v-4a2 2 0 0 0 -2 -2h-14a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2' />
      <path d='M17 9v-4a2 2 0 0 0 -2 -2h-6a2 2 0 0 0 -2 2v4' />
      <path d='M7 13m0 2a2 2 0 0 1 2 -2h6a2 2 0 0 1 2 2v4a2 2 0 0 1 -2 2h-6a2 2 0 0 1 -2 -2z' />
    </svg>
  )
}

export const FilePlus = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-plus-2 mr-2">
      <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
      <path d="M3 15h6"/>
      <path d="M6 12v6"/>
    </svg>
  )
}

export const EllipsisVertical = () => {
  return (
    <svg className='w-5 h-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 4 15'>
      <path d='M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z' />
    </svg>
  )
}

export const Pdf = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='icon icon-tabler icons-tabler-outline icon-tabler-file-type-pdf'>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M14 3v4a1 1 0 0 0 1 1h4' />
      <path d='M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4' />
      <path d='M5 18h1.5a1.5 1.5 0 0 0 0 -3h-1.5v6' />
      <path d='M17 18h2' />
      <path d='M20 15h-3v6' />
      <path d='M11 15v6h1a2 2 0 0 0 2 -2v-2a2 2 0 0 0 -2 -2h-1z' />
    </svg>
  )
}

export const Plus = () => {
  return (
    <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-plus">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M12 5l0 14" />
      <path d="M5 12l14 0" />
    </svg>
  )
}


export const Filter = () => {
  return (
    <svg  xmlns="http://www.w3.org/2000/svg"  width="16"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-filter mr-1">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" />
    </svg>
  )
}

export const Eraser = () => {
  return (
    <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-eraser mr-1">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3" />
      <path d="M18 13.3l-6.3 -6.3" />
    </svg>
  )
}

export const Error = () => {
  return (
    <div className='flex justify-center'>
      <svg xmlns="http://www.w3.org/2000/svg" width="20"  height="20"  fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="mr-1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
      </svg>
    </div>
  )
}

export const History = () => {
  return (
    <div>
      <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-align-box-center-stretch">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 19v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
        <path d="M11 17h2" />
        <path d="M9 12h6" />
        <path d="M10 7h4" />
      </svg>
    </div>
  )
}

export const Reset = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='icon icon-tabler icons-tabler-outline icon-tabler-refresh'>
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4' />
      <path d='M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4' />
    </svg>
  )
}

export const Check = () => {
  return (
    <svg
      className="h-5 w-5 shrink-0 text-cyan-600 dark:text-cyan-500"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  )
}