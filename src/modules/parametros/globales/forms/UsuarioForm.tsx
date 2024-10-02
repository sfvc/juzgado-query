import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Label, TextInput } from 'flowbite-react'
import { useUsuario } from '../hooks/useUsuario'
import { FormUsuario, IUsuario } from '../interfaces'

const validationSchema = yup.object().shape({
  nombre: yup.string().required('El pais es requerido'),
  dni: yup.string().required('El dni es requerido'),
  username: yup.string().required('El usuario es requerido'),
  password: yup.string().required('La contraseña es requerida'),
  juzgado_id: yup.string().required('El juzgado es requerido'),
  rol_id: yup.string().required('El rol es requerido'),
})

interface Props {
    usuario: IUsuario | null
    onSucces: () => void
  }
  
const UsuarioForm = ({ usuario, onSucces }: Props) => {
  const { createUsuario, updateUsuario } = useUsuario()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { 
      nombre: usuario?.nombre || '',
      dni: usuario?.dni || '',
      username: usuario?.username || '',
      juzgado_id: usuario?.juzgado?.id.toString() || '',
      rol_id: usuario?.role.id.toString() || '',
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormUsuario> = async (data: FormUsuario) => {
    if (usuario) await updateUsuario.mutateAsync({id: usuario.id, usuario: data})
    else await createUsuario.mutateAsync(data)
  
    onSucces()
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='nombre' value='Pais' /><strong className='obligatorio'>(*)</strong>
        </div>
        <TextInput
          {...register('nombre')}
          placeholder='Nombre'
          helperText={errors?.nombre && errors?.nombre?.message} 
          color={errors?.nombre && 'failure'}
        />
      </div>

      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='dni' value='Dni' /><strong className='obligatorio'>(*)</strong>
        </div>
        <TextInput
          {...register('dni')}
          placeholder='Dni'
          helperText={errors?.dni && errors?.dni?.message} 
          color={errors?.dni && 'failure'}
        />
      </div>

      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='username' value='Username' /><strong className='obligatorio'>(*)</strong>
        </div>
        <TextInput
          {...register('username')}
          placeholder='Username'
          helperText={errors?.username && errors?.username?.message} 
          color={errors?.username && 'failure'}
        />
      </div>

      <div className='mb-4'>
        <div className='mb-2 block dark:text-white'>
          <Label color='gray' htmlFor='password' value='Password' /><strong className='obligatorio'>(*)</strong>
        </div>
        <TextInput
          {...register('password')}
          type='password'
          placeholder='Password'
          helperText={errors?.password && errors?.password?.message} 
          color={errors?.password && 'failure'}
        />
      </div>

      <div className='flex justify-end gap-2'>
        <Button color="failure" onClick={onSucces}>Cancelar</Button>
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

export default UsuarioForm
