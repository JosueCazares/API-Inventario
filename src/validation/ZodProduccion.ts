import { z } from 'zod';
import {ESTADOPROD} from '@prisma/client';
export const ZodProduccionObj = z.object({
    estado: z.enum([ESTADOPROD.EN_PROCESO,ESTADOPROD.PENDIENTE,ESTADOPROD.TERMINADO]),
    receta_Id: z.number().positive(),
    sucursal: z.string()
});

export const ZodProduccionObjUpdate = z.object({
    estado: z.enum([ESTADOPROD.EN_PROCESO,ESTADOPROD.PENDIENTE,ESTADOPROD.TERMINADO]),
    id: z.number().positive(),
    fechaFin: z.string(),
});