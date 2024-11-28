import {Router} from 'express'
import {getAllProducts,createProducto} from '@/controller/ProductoController'
 
export const router = Router()

//ENDPOINT DE CONSULTA DE PRODUCTOS
router.get('/',getAllProducts)
//ENDPOINT DE CREACION DE PRODUCTOS
router.post('/',createProducto) 