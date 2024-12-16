import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Label, Select, Spinner, TextInput } from 'flowbite-react'
import { useUsuario } from '../hooks/useUsuario'
import { icons } from '../../../../shared'
import { useUsuarioParams } from '../hooks/useUsuarioParams'
import type { FormUsuario, IUsuario } from '../interfaces'

const validationSchema = yup.object().shape({
  nombre: yup.string().required('El pais es requerido'),
  dni: yup.string().required('El dni es requerido'),
  username: yup.string().required('El usuario es requerido'),
  password: yup.string().required('La contraseña es requerida'),
  juzgado_id: yup.string().required('El juzgado es requerido'),
  role: yup.string().required('El rol es requerido'),
})

interface Props {
    usuario: IUsuario | null
    onSucces: () => void
  }
  
const UsuarioForm = ({ usuario, onSucces }: Props) => {
  const { createUsuario, updateUsuario } = useUsuario()
  const { data, isLoading } = useUsuarioParams()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { 
      nombre: usuario?.nombre || '',
      dni: usuario?.dni || '',
      username: usuario?.username || '',
      password: usuario?.username || '',
      juzgado_id: usuario?.juzgado?.id.toString() || '',
      role: usuario?.role?.id.toString() || '',
    },
    resolver: yupResolver(validationSchema)
  })

  const onSubmit: SubmitHandler<FormUsuario> = async (data: FormUsuario) => {
    if (usuario) await updateUsuario.mutateAsync({id: usuario.id, usuario: data})
    else await createUsuario.mutateAsync(data)
  
    onSucces()
  }

  if (isLoading) return <div className='flex justify-center'><Spinner size='lg'/></div>
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-2 gap-4'>
        <div className='mb-4'>
          <div className='mb-2 block dark:text-white'>
            <Label color='gray' htmlFor='nombre' value='Nombre' /><strong className='obligatorio'>(*)</strong>
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
            <Label color='gray' htmlFor='username' value='Usuario' /><strong className='obligatorio'>(*)</strong>
          </div>
          <TextInput
            {...register('username')}
            placeholder='Usuario'
            helperText={errors?.username && errors?.username?.message} 
            color={errors?.username && 'failure'}
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
            className='absolute top-1/3 right-2 transform h-full'
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


        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label htmlFor='juzgado_id' value='Juzgado' /><strong className='obligatorio'>(*)</strong>
          </div>
          <Select
            {...register('juzgado_id')}
            helperText={errors?.juzgado_id && errors.juzgado_id.message}
            color={errors?.juzgado_id && 'failure'}
          >
            <option value='' hidden>Seleccione el juzgado</option>
            {data?.juzgados.map((juzgado: any) => (
              <option key={juzgado.id} value={juzgado.id}>
                {juzgado.nombre}
              </option>
            ))}
          </Select>
        </div>

        <div className='mb-4'>
          <div className='mb-2 block'>
            <Label htmlFor='role' value='Rol' /><strong className='obligatorio'>(*)</strong>
          </div>
          <Select
            {...register('role')}
            helperText={errors?.role && errors.role.message}
            color={errors?.role && 'failure'}
          >
            <option value='' hidden>Seleccione el rol</option>
            {data?.roles.map((rol: any) => (
              <option key={rol.id} value={rol.id}>
                {rol.nombre}
              </option>
            ))}
          </Select>
        </div>
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
