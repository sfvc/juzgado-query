import React from 'react'
import ProfileForm from '../forms/ProfileForm'

export const Profile = () => {
  return (
    <React.Fragment>
      <div className='md:flex md:justify-between mb-4'>
        <h1 className='text-2xl font-semibold items-center dark:text-white mb-4 md:mb-0'>Perfil de usuario</h1>
      </div>

      <div className='grid col-span-1 md:col-span-2 gap-4'>
        <ProfileForm />
      </div>
    </React.Fragment>
  )
}
