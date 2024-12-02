import type {Request,Response} from 'express'
import {PrismaProduccionDao} from '@/dao/PrismaProduccionDao'
import type {APIResponse} from '@/lib/types'
import {z, type ZodIssue} from 'zod'
import type {Produccion} from '@prisma/client'
import {createProduccionCommand} from '@/commands/produccion/CreateProduccionCommands'
import {CustomError} from '@/errors/CustomError'

const produccionDao = new PrismaProduccionDao()


export const getAllProduccion = async (req: Request, res: Response) => {
    try{
        const produccion = await produccionDao.getAllProduccion()

        let responeOk:APIResponse<Produccion[]> = {
            status:'success',
            data: produccion
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
export const getAllProReceta = async (req: Request, res: Response) => {
    try{
        const produccion = await produccionDao.getAllProReceta()

        let responeOk:APIResponse<Produccion[]> = {
            status:'success',
            data: produccion
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

export const createProduccion = async (req: Request, res: Response) => {
    try{

        const command =  new createProduccionCommand();
        const newProduccion = await command.execute(req.body)

        let responeOk:APIResponse<Produccion> = {
            status:'success',
            data: newProduccion
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
        } if (error instanceof CustomError){
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


