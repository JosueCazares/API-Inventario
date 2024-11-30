import type {Request,Response} from 'express'
import {PrismaVentaDao} from '@/dao/PrismaVentaDao'
import type {APIResponse} from '@/lib/types'
import {z, type ZodIssue} from 'zod'
import type {Venta} from '@prisma/client'

const ventaDao = new PrismaVentaDao()


export const getAllVenta = async (req: Request, res: Response) => {
    try{
        const venta = await ventaDao.getAllVenta()

        let responeOk:APIResponse<Venta[]> = {
            status:'success',
            data: venta
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