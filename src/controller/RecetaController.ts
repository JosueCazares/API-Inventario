import type {Request,Response} from 'express'
import {PrismaRecetaDao} from '@/dao/PrismaRecetaDao'
import type {APIResponse} from '@/lib/types'
import {z, type ZodIssue} from 'zod'
import type {Receta} from '@prisma/client'

const recetaDao = new PrismaRecetaDao()


export const getAllReceta = async (req: Request, res: Response) => {
    try{
        const receta = await recetaDao.getAllReceta()

        let responeOk:APIResponse<Receta[]> = {
            status:'success',
            data: receta
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