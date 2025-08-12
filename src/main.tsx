import { createRoot } from 'react-dom/client'
import TanStackProvider from './plugins/TanStackProvider.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <TanStackProvider>
    <App />
  </TanStackProvider>
)
