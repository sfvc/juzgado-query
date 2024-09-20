import axios from 'axios'

const apiJuzgado = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`
})

// apiJuzgado.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
apiJuzgado.defaults.headers.common['Authorization'] = 'Bearer 248|ThzpfkHGejeXNslZ0PqqoIF5L6nbheNshVF0pmk949a4393c'
export {apiJuzgado}