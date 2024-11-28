import {z} from 'zod'
import {ZodProductoIdObj} from '@/validation/ZodProducto'

export const ZodRecetaObj = z.object({
    nombre: z.string().min(3),
    descripcion: z.string().min(3),
    cantidad: z.number().positive(),
    productos: z.array(ZodProductoIdObj).min(1)
})

