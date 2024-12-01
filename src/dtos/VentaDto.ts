import type {ESTADOVENTA,METODOPAGO} from '@/lib/types'

export interface CreateVentaDto{
    sucursal: string
    estado: ESTADOVENTA
    metodoPago: METODOPAGO
}