import { apiJuzgado } from '../../../../api/config'
import { setUrlParams } from '../../../../shared/helpers/setUrlParams'
import { FormPassword, FormUsuario } from '../interfaces'

export const getUsuarios = async (filters: object) => {
  const params = setUrlParams(filters)

  const response = await apiJuzgado.get('/usuarios', { params })
  const { data, meta } = response.data
  return { data, meta }
}

export const getUsuarioById = async (id: number) => {
  const response = await apiJuzgado.get(`/usuarios/${id}`)
  const { data } = response.data
  return data
}

export const createUsuario =  async (data: FormUsuario) => {
  const response = await apiJuzgado.post('/usuarios', data)
  const { data: usuario } = response.data
  return usuario
}

export const updateUsuario =  async (id: number, data: FormUsuario) => {
  const response = await apiJuzgado.put(`/usuarios/${id}`, data)
  const { data: usuario } = response.data
  return usuario
}

export const deleteUsuario =  async (id: number) => {
  const response = await apiJuzgado.delete(`/usuarios/${id}`)
  const { data: usuario } = response.data
  return usuario
}

export const resetPassword =  async (id: number) => {
  const response = await apiJuzgado.get(`/usuarios/reset/${id}`)
  const { data: usuario } = response.data
  return usuario
}

export const modifyPassword =  async (id: number, form: FormPassword) => {
  const response = await apiJuzgado.post(`/usuarios/profile/${id}`, form)
  const { data: usuario } = response.data
  return usuario
}

export const getRoles = async () => {
  const response = await apiJuzgado.get('/roles')
  const { data } = response.data
  return data
}

export const getJuzgados = async () => {
  const response = await apiJuzgado.get('/juzgados')
  const { data } = response.data
  return data
}
