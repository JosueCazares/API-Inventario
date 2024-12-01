import {z} from 'zod'
import {ESTADOVENTA,METODOPAGO} from '@prisma/client'


export const ZodDetalleVentaObj = z.object({
    sucursal: z.string(),
    estado: z.enum([ESTADOVENTA.PAGADO,ESTADOVENTA.PENDIENTE,ESTADOVENTA.CANCELADO]),
    metodoPago:z.enum([METODOPAGO.EFECTIVO,METODOPAGO.TARJETA,METODOPAGO.TRANSFERENCIA]),
    producto_Id: z.number().positive(),
    cantidad: z.number().positive(),
    precio: z.number().positive()

})