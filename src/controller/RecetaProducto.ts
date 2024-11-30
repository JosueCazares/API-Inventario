import type {Request,Response} from 'express'
import {PrismaRecetaProductoDao} from '@/dao/PrismaRecetaProducto'
import type {APIResponse} from '@/lib/types'
import {z, type ZodIssue} from 'zod'
import type {RecetaProducto} from '@prisma/client'

const recetaProdDao = new PrismaRecetaProductoDao()


export const getAllRecetaProducto = async (req: Request, res: Response) => {
    try{
        const recetaPrdo = await recetaProdDao.getAllRecetaProd()

        let responeOk:APIResponse<RecetaProducto[]> = {
            status:'success',
            data: recetaPrdo
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