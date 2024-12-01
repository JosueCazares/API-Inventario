import type{ Produccion,Inventario} from '@prisma/client'
import type {CreateProduccionDto} from '@/dtos/ProduccionDto'
import type {CreateProductoDto} from '@/dtos/ProductoDtos'
import type {CreateInventarioDto} from '@/dtos/InventarioDto'
import {ZodProduccionObj} from '@/validation/ZodProduccion'
import {z, type ZodIssue} from 'zod'
import {PrismaRecetaDao} from '@/dao/PrismaRecetaDao'
import {PrismaInventarioDao} from '@/dao/PrismaInventarioDao'
import {PrismaRecetaProductoDao} from '@/dao/PrismaRecetaProducto'
import {PrismaProduccionDao} from '@/dao/PrismaProduccionDao'
import {PrismaProductoDao} from '@/dao/PrismaProductoDao'
import {CustomError} from '@/errors/CustomError'

const recetaDao = new PrismaRecetaDao()
const inventarioDao = new PrismaInventarioDao()
const recetaProductoDao = new PrismaRecetaProductoDao()
const produccionDao = new PrismaProduccionDao()
const productoDao = new PrismaProductoDao()

//COMMANDS PARA LAE CRECAION DE PORUDCCION OSE A GALLETAS, SRECUARDA EL ORDEN DE CHECAR LA EXISTENCIA DE INVENRAIO
export class createProduccionCommand{
    async execute(data: CreateProduccionDto): Promise<Produccion>{
        const dataValidate = ZodProduccionObj.parse(data)

        //VERIFICAR EXISTENCIA DE RECETA 
        const receta = await recetaDao.getById(dataValidate.receta_Id)
        if(!receta ){
            throw new CustomError(`Receta con id: ${dataValidate.receta_Id} no encontrada`,404)
        }
        //OBETNER LOS PRODUCTOS DE LA RECETA
        const productosReceta = await recetaProductoDao.getRecetaById(dataValidate.receta_Id)
        console.log(productosReceta);
        if(!productosReceta|| productosReceta.length === 0){
            throw new CustomError(`La receta con id: ${dataValidate.receta_Id} no tiene productos asociados`, 404);
        }
        //VERIFICAR EXISTENCIA DE INVENTARIO DE CADA PRODUCTO
        const productosFaltantes: {productoId:number;cantidadFaltante:number}[] = []
        for(const { producto_Id, cantidad } of productosReceta){
            //console.log(producto_Id,cantidad);
            const inventario = await inventarioDao.getByProductoId(producto_Id);
            //console.log(inventario);
            if(!inventario || inventario.cantidad < cantidad){
                productosFaltantes.push({productoId:producto_Id,cantidadFaltante:cantidad})
                //console.log({productoId:producto_Id,cantidadFaltante:cantidad});
            }
        }
        //SI NO HAY SUFICIENTE INVENTARIO LANZAR ERROR
        if (productosFaltantes.length > 0) {
            throw new CustomError(
                `No hay suficiente inventario para los productos: ${productosFaltantes.map((p) => p.productoId).join(', ')}`,
                400
            );
        }
        //DESCONTAMOS INVENTARIO 
        //hacer un bublce para que cada producto on id de receta se descuantre de inventario
        for(const {producto_Id, cantidad} of productosReceta){
            await inventarioDao.reduceInventario(producto_Id,cantidad)
        }

        //CREAR PRODUCCION
        const dataPro:Omit<Produccion,'id'|'createdAt'|'updatedAt'>={
            receta_Id:dataValidate.receta_Id,
            estado:'EN_PROCESO',
            fecha_inicio: new Date(),
            fecha_fin:new Date(),

        }
        //CREAR PRODUCTO TERMIANDO
        const productoObj:CreateProductoDto={
            nombre:receta.nombre,
            precio:0,
            cantidad:receta.cantidad,
            sucursal:dataValidate.sucursal,
            estatus:true,
            descripcion:receta.descripcion,
            unidadMedida:'KG',
            tipo:'PRODUCTO_TERMINADO'
        }
        const newProduct =  await productoDao.create(productoObj)
        //ACTUALIZAR INVENTARIO CON NUEVO PROUCTO DE TIPO PRODUCTO TERMINADO
        const inventarioObj:CreateInventarioDto={
            producto_Id: newProduct.id,
            cantidad: receta.cantidad,
        }
        await inventarioDao.create(inventarioObj)
        
        return await produccionDao.create(dataPro);
    }
}