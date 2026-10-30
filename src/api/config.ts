import axios from 'axios'

// Datos del localStorage que dependen de la sesion y se limpian al vencer el token
const SESSION_KEYS = ['token', 'infraccion', 'infractor', 'vehiculo']

const apiJuzgado = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`
})

// Interceptor de respuesta para manejar el token de respuesta
apiJuzgado.interceptors.request.use(
  (config) => {
    // Si la respuesta (config) es exitosa, agregamos el token
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
  },
  (error) => {
    console.log('Request Error:', error)
    return Promise.reject(error)
  }
)

// Interceptor de respuesta para manejar errores como el token expirado
apiJuzgado.interceptors.response.use(
  (response) => {
    // Si la respuesta es exitosa, la devolvemos tal cual
    return response
  },
  (error) => {
    const { response } = error

    if (response?.status === 401 || response?.status === 403) {
      // Solo se descarta la sesion y los filtros guardados. No se usa localStorage.clear()
      // porque tambien borraba preferencias del usuario, como el tema oscuro o claro.
      SESSION_KEYS.forEach((key) => localStorage.removeItem(key))
      window.location.href = '/login'
    }

    // Rechazar la promesa para que el código que haga la llamada pueda manejarlo si es necesario
    return Promise.reject(error)
  }
)

export { apiJuzgado }