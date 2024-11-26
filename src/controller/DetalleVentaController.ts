import type {Request,Response} from 'express'
import {PrismaDetalleVentaDao} from '@/dao/PrismaDetalleVentaDao'
import type {APIResponse} from '@/lib/types'
import {z, type ZodIssue} from 'zod'
import type {DetalleVenta} from '@prisma/client'

const detalleVentaDao = new PrismaDetalleVentaDao()


export const getAllDetalleVenta = async (req: Request, res: Response) => {
    try{
        const detalleVenta = await detalleVentaDao.getAllDetalleVenta()

        let responeOk:APIResponse<DetalleVenta[]> = {
            status:'success',
            data: detalleVenta
        }

        return res.status(200).json(responeOk)
    }catch(error){
        let responseError: APIResponse<Error> = {
            status: "error",
            error: "Error en el servidor"
        }
        if (error instanceof z.ZodError) {
            let responseErrorZod:APIResponse<ZodIssue[]> = {
                status: "error",
                error: "Datos invalidos",
                data: error.errors
            }
            console.log(error);
            return res.status(400).json(responseErrorZod)
        }
        console.log(error);
        return res.status(500).json(responseError)
    }
}