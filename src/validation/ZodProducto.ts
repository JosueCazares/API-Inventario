import {z} from 'zod'
import { UNIDADMEDIDA,TIPOPRODUCTO} from '@prisma/client'

export const ZodProductoObj = z.object({
    nombre: z.string().min(3),
    descripcion: z.string().min(3),
    unidadMedida: z.enum([UNIDADMEDIDA.KG, UNIDADMEDIDA.GR, UNIDADMEDIDA.COSTAL, UNIDADMEDIDA.TN,UNIDADMEDIDA.LITRO]),
    precio: z.number().positive(),
    cantidad: z.number().positive(),
    tipo: z.enum([TIPOPRODUCTO.PRODUCTO_TERMINADO, TIPOPRODUCTO.INGREDIENTE]),
    sucursal: z.string().min(3),
    estatus: z.boolean()
})

export const ZodProductoIdObj = z.object({
    producto_Id: z.number().positive(), // El ID del producto
    cantidad: z.number().positive(),    // Cantidad asociada al producto
  });
