import {Router} from 'express'
import {getAllDetalleVenta,createDetalleVenta} from '@/controller/DetalleVentaController'
 
export const router = Router()

router.get('/',getAllDetalleVenta)

router.post('/',createDetalleVenta)