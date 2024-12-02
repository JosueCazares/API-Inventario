import {z} from 'zod';

export const ZodInventarioObj = z.object({
    cantidad: z.number().positive(),
    producto_Id: z.number().positive(),
})
export const ZodInventarioIdObj = z.object({
    id: z.number().positive(),
})

export const ZodInventarioObjUpdate = z.object({
    cantidad: z.number().positive(),
    idInventario: z.number().positive(),
})