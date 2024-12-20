import type {Request,Response} from 'express'
import {PrismaInventarioDao} from '@/dao/PrismaInventarioDao'
import {createInventarioCommand} from '@/commands/inventarios/CreateInventarioCommands'
import {updateInventarioCommand} from '@/commands/inventarios/UpdateInventarioCommands'
import {GetByIdInventarioCommand} from '@/commands/inventarios/GetByIdInventarioCOmands'
import type {APIResponse} from '@/lib/types'
import {z, type ZodIssue} from 'zod'
import type {Inventario} from '@prisma/client'
import {CustomError} from '@/errors/CustomError'

const inventarioDao = new PrismaInventarioDao()

export const getAllInvetario = async (req: Request, res: Response) => {
    try{
        const inventario = await inventarioDao.getAllInventario()

        let responeOk:APIResponse<Inventario[]> = {
            status:'success',
            data: inventario
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

export const getInvetarioById = async (req: Request, res: Response) => {
    try{

        const command = new GetByIdInventarioCommand();
        const inventario = await command.execute(req.body)

        let responeOk:APIResponse<Inventario> = {
            status:'success',
            data: inventario
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

export const createInventario = async (req: Request, res: Response) => {
    try{
        const command =  new createInventarioCommand();
        const newInventario = await command.execute(req.body)

        let responeOk:APIResponse<Inventario> = {
            status:'success',
            data: newInventario
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

export const updateInventario = async (req: Request, res: Response) => {
    try{
        const command =  new updateInventarioCommand();
        const updateInventario = await command.execute(req.body)

        let responeOk:APIResponse<Inventario> = {
            status:'success',
            data: updateInventario
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