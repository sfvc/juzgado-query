import { ReactNode, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Tooltip } from 'flowbite-react'
import { AuthContext } from '../../../context/Auth/AuthContext'
import { icons } from '../../../shared'

enum ORGANISMO {
  JUZGADO1 = 1, 
  JUZGADO2 = 2, 
}

interface JuzgadoGuardProps {
  fechaActa: string;
  actaId: number;
  children: ReactNode;
}

export const JuzgadoGuard = ({ fechaActa, actaId, children }: JuzgadoGuardProps) => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const verifyJuzgado = (fechaActa: string) => {
    if (!fechaActa) return null
      
    const [dia, mes, anio] = fechaActa.split('-').map(Number)
    const fecha = new Date(anio, mes - 1, dia)
        
    // Validar fecha
    if (isNaN(fecha.getTime())) return null
    
    // Obtener el último día del mes
    const ultimoDiaMes = new Date(anio, mes, 0).getDate()
    
    // Determinar a qué período pertenece la fecha
    if (dia >= 1 && dia <= 15) {
      return ORGANISMO.JUZGADO1
    } else if (dia >= 16 && dia <= ultimoDiaMes) {
      return ORGANISMO.JUZGADO2
    }
  } 

  const juzgado = verifyJuzgado(fechaActa)

  if (juzgado === null) {
    return <>{children}</>
  }
 
  return juzgado === user?.juzgado.id 
    ? <>{children}</> 
    : (
      <div className='min-w-[94px] flex flex-col items-center gap-2'>
        <span className='bg-red-500/30 text-red-600 rounded-full px-2 py-0.5 font-semibold'>Juzgado N°{juzgado}</span>
        <Tooltip content='Estados'>
          <Button
            color='warning'
            onClick={() => navigate(`/acta/${actaId}/estados`)}
            className='w-8 h-8 flex items-center justify-center'
          >
            <icons.Status />
          </Button>
        </Tooltip>
      </div>
    )
}