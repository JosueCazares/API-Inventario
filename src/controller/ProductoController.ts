import type {Request,Response} from 'express'
import {PrismaProductoDao} from '@/dao/PrismaProductoDao'
import type {APIResponse} from '@/lib/types'
import {z, type ZodIssue} from 'zod'
import type {Producto} from '@prisma/client'

const productoDao = new PrismaProductoDao()


export const getAllProducts = async (req: Request, res: Response) => {
    try{
        const producto = await productoDao.getAllProducto()

        let responeOk:APIResponse<Producto[]> = {
            status:'success',
            data: producto
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