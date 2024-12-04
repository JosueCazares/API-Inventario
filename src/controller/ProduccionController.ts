import type {Request,Response} from 'express'
import {PrismaProduccionDao} from '@/dao/PrismaProduccionDao'
import type {APIResponse} from '@/lib/types'
import {z, type ZodIssue} from 'zod'
import type {Produccion} from '@prisma/client'
import {createProduccionCommand} from '@/commands/produccion/CreateProduccionCommands'
import {updateProduccionCommand} from '@/commands/produccion/UpdateProduccionCommands'
import {CustomError} from '@/errors/CustomError'
import { ProduccionViewModel } from '@/viewModel/ProduccionViewModel'
import {ProductosExpertnosAppService} from '@/AppService/ProduccionExternaAppService'
const produccionDao = new PrismaProduccionDao()

//RETORNA TODO EL INVENRTARIO CON UN MODELO PUBLICO
export const getAllPublic = async (req: Request, res: Response) => {
    try{
        const produccion = await produccionDao.getAllProduccion()
        const produccionPublic = produccion.map((produccion)=> ProduccionViewModel.toDto(produccion))


        let responeOk:APIResponse<ProduccionViewModel[]> = {
            status:'success',
            data: produccionPublic
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
//RETORNA LA UNION DE TODOS LOS ENPOIINS PUBLICOS
export const getAllPublicTodo = async (req: Request, res: Response) => {
    try{
        const produccionLocal = await produccionDao.getAllPublic();
        const produccionExterna = await new ProductosExpertnosAppService().getAll();

        const produccion:ProduccionViewModel[] = [...produccionLocal,...produccionExterna]

        let responeOk:APIResponse<ProduccionViewModel[]> = {
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

export const updateProduccion = async (req: Request, res: Response) => {
    try{

        const command =  new updateProduccionCommand();
        const updateProduction = await command.execute(req.body)

        let responeOk:APIResponse<Produccion> = {
            status:'success',
            data: updateProduction
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


