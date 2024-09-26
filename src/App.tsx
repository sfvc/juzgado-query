import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { Routes } from './routes/Routes'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
