import {Router} from 'express'
import {getAllVenta} from '@/controller/VentaController'
 
export const router = Router()

router.get('/',getAllVenta)