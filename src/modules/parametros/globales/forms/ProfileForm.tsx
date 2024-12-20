import { useContext, useState } from 'react'
import { Alert, Button, Label, TextInput } from 'flowbite-react'
import { AuthContext, UserContext } from '../../../../context/Auth/AuthContext'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useProfile } from '../hooks/useProfile'
import { icons } from '../../../../shared'
import type { FormPassword } from '../interfaces'
import { useNavigate } from 'react-router-dom'

const validationSchema = yup.object().shape({
  password: yup.string().required('La contraseña es requerida')
})
  
const ProfileForm = () => {
  const navigate = useNavigate()
  const { user } = useContext<UserContext>(AuthContext)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { modifyPassword } = useProfile()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { 
      password: ''
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormPassword> = async (data: FormPassword) => {
    console.log(data)
    modifyPassword.mutateAsync({id: user!.id, data})
    // onSucces()
  }

  if(!user) return (
    <Alert color="failure" icon={icons.Error}>
      <span className="font-medium">Error! </span> No se pudo obtener los datos del usuario.
    </Alert>
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-2 gap-4'>
        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='nombre' value='Nombre' />
          </div>
          <TextInput
            name='nombre'
            value={user.nombre}
            readOnly
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='dni' value='Dni' />
          </div>
          <TextInput
            name='dni'
            value={user.dni}
            readOnly
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='username' value='Usuario' />
          </div>
          <TextInput
            name='username'
            value={user.username}
            readOnly
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='juzgado' value='Juzgado' />
          </div>
          <TextInput
            name='juzgado'
            value={user.juzgado?.nombre}
            readOnly
          />
        </div>

        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='rol' value='Rol' />
          </div>
          <TextInput
            name='rol'
            value={user.role?.name}
            readOnly
          />
        </div>

        <div className='relative mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='password' value='Contraseña' /><strong className='obligatorio'>(*)</strong>
          </div>
          <TextInput
            {...register('password')}            
            type={showPassword ? 'text' : 'password'}
            placeholder='Contraseña'
            helperText={errors?.password && errors?.password?.message} 
            color={errors?.password && 'failure'}
          />
          
          <button
            type='button'
            className='absolute top-1/4 right-2 transform h-full'
            title='Mostrar Contraseña'
            onClick={() => setShowPassword(!showPassword)}
          >
            {
              showPassword
                ? <icons.Eye />
                : <icons.EyeClose />
            }
          </button>
        </div>

      </div>

      <div className='flex justify-end gap-2'>
        <Button color="failure" onClick={() => navigate('/')}>Cancelar</Button>
        <Button 
          size='md'
          type='submit' 
          color="gray"
          disabled={isSubmitting}
          isProcessing={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : 'Guardar'}
        </Button>
      </div>
    </form>
  )
}

export default ProfileForm
