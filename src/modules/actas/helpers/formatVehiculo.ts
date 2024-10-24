import { IVehiculo } from '../../vehiculos/interfaces'

export const formatVehiculo = (vehiculo: IVehiculo | undefined) => {
  if(!vehiculo) return null

  return {
    id: vehiculo.id,
    titular: vehiculo?.titular || null,
    dominio: vehiculo?.dominio || 'SIN DOMINIO',
    marca: vehiculo?.marca?.nombre || '-',
    modelo: vehiculo?.modelo || '-',
    tipo: vehiculo?.tipo?.nombre || '-',
    color: vehiculo?.color?.nombre || '-',
    numero_chasis: vehiculo?.numero_chasis || '-',
    numero_motor: vehiculo?.numero_motor || '-',
    numero_taxi_remis: vehiculo?.numero_taxi_remis || '',
  }
}