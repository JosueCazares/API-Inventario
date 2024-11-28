import type {Request,Response} from 'express'
import {PrismaRecetaDao} from '@/dao/PrismaRecetaDao'
import type {APIResponse} from '@/lib/types'
import {z, type ZodIssue} from 'zod'
import type {Receta} from '@prisma/client'
import {createProductoCommand} from '@/commands/receta/CreateRecetaCommands'
import {CustomError} from '@/errors/CustomError'

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

export const createReceta = async (req: Request, res: Response) => {
    try{
        const command =  new createProductoCommand();
        const newReceta = await command.execute(req.body)

        let responeOk:APIResponse<Receta> = {
            status:'success',
            data: newReceta
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
    if (error instanceof CustomError){
        const responseErrorCustom:APIResponse<String> = {
            status: "error",
            error: error.message
        }
        return res.status(error.statusCode).json(responseErrorCustom)
    }
    console.log(error);
    return res.status(500).json(responseError)
}

}