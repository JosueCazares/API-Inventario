import {Router} from 'express'
import {getAllProducts,createProducto,getProductoTerminado,getAllProductoPublic} from '@/controller/ProductoController'
 
export const router = Router()

//ENDPOINT DE CONSULTA DE PRODUCTOS
router.get('/',getAllProducts)
//ENDPOINT PARA CONSULTA DE PRODUCTOS TERMINADOS
router.get('/terminado',getProductoTerminado)
//ENDPOINT DE RETORNO DE TODOS LOS PRODUCTOS DE TODAS LAS SUCURSALES
router.get('/allPublic',getAllProductoPublic)
//ENDPOINT DE CREACION DE PRODUCTOS
router.post('/',createProducto) 