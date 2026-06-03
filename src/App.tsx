import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './context/Theme/ThemeProvider'
import { AuthProvider } from './context/Auth/AuthProvider'
import { Routes } from './routes/Routes'

const App = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ThemeProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
