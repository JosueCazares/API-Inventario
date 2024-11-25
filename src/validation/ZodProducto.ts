import {z} from 'zod'
import { UNIDADMEDIDA} from '@prisma/client'

export const ZodProductoObj = z.object({
    nombre: z.string().min(3),
    descripcion: z.string().min(3).optional(),
    unidadMedida: z.enum([UNIDADMEDIDA.KG, UNIDADMEDIDA.GR, UNIDADMEDIDA.COSTAL, UNIDADMEDIDA.TN]),
    precio: z.number().positive(),
    cantidad: z.number().positive()
})

