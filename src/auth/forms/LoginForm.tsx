import { useContext, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TextInput, Button, Spinner } from 'flowbite-react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AuthContext } from '../../context/AuthContext'
import { icons } from '../../shared'
import { AuthForm } from '../interfaces/auth'

const schema = yup
  .object({
    username: yup.string().required('El usuario es requerido'),
    password: yup.string()
      .required('La contraseña es requerida')
      .min(6, 'La contraseña debe contener al menos 6 caracteres')
  })
  .required()

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const { loginUser } = useContext(AuthContext)

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(schema)
  })
  
  const onSubmit: SubmitHandler<AuthForm> = async (data: AuthForm) => await loginUser(data)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='relative'>
      <TextInput
        {...register('username')}
        className='mb-2'
        helperText={errors?.username && errors?.username?.message}
        color={errors?.username && 'failure'}
        placeholder='Usuario'
        autoComplete='username'
      />

      <TextInput
        {...register('password')}
        type={showPassword ? 'text' : 'password'}
        className='mb-2 mt-2'
        helperText={errors?.password && errors?.password?.message}
        color={errors?.password && 'failure'}
        placeholder='Contraseña'
        autoComplete='current-password'
      />

      <button
        type='button'
        className='absolute top-1/2 right-2 transform -translate-y-1/2'
        title='Mostrar Contraseña'
        onClick={() => setShowPassword(!showPassword)}
      >
        {
          showPassword
            ? <icons.Eye />
            : <icons.EyeClose />
        }
      </button>

      <Button 
        type='submit' 
        className='w-full mt-2' 
        color="blue"
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spinner /> : 'Iniciar Sesión'}
      </Button>
    </form>
  )
}
