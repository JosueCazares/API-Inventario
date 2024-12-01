import {Router} from 'express'
import {getAllProducts,createProducto,getProductoTerminado} from '@/controller/ProductoController'
 
export const router = Router()

//ENDPOINT DE CONSULTA DE PRODUCTOS
router.get('/',getAllProducts)
//ENDPOINT PARA CONSULTA DE PRODUCTOS TERMINADOS
router.get('/terminado',getProductoTerminado)
//ENDPOINT DE CREACION DE PRODUCTOS
router.post('/',createProducto) 