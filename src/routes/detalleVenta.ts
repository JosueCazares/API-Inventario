import {Router} from 'express'
import {getAllDetalleVenta} from '@/controller/DetalleVentaController'
 
export const router = Router()

router.get('/',getAllDetalleVenta)