import type {Request,Response} from 'express'
import {PrismaProductoDao} from '@/dao/PrismaProductoDao'
import { createProductoCommand} from '@/commands/producto/CreateProductoCommands'
import type {APIResponse} from '@/lib/types'
import {z, type ZodIssue} from 'zod'
import type {Inventario, Producto} from '@prisma/client'
import { ProductosExpertnosAppService } from '@/AppService/ProductosExternosAppService'
import type { ProductoViewModel } from '@/viewModel/ProductoViewModel'

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

export const getProductoTerminado = async (req: Request, res: Response) => {
    try{
        const producto = await productoDao.getAllProductoTerminado()

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

export const getAllProductoPublic = async (req: Request, res: Response) => { 
    try{
        const productoLocal = await productoDao.getAllPublic();
        const productosExternos = await new ProductosExpertnosAppService().getAll();

        const productos:ProductoViewModel[] = [...productoLocal,...productosExternos]

        let responeOk:APIResponse<ProductoViewModel[]> = {
            status:'success',
            data: productos
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

export const createProducto = async (req: Request, res: Response) => {
    try{
        const command =  new createProductoCommand();
        const newProducto = await command.execute(req.body)

        let responeOk:APIResponse<{producto:Producto,inventario:Inventario}> = {
            status:'success',
            data: newProducto
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