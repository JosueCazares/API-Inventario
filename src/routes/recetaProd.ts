import {Router} from 'express'
import {getAllRecetaProducto} from '@/controller/RecetaProducto'
 
export const router = Router()

router.get('/',getAllRecetaProducto)