import {Router} from 'express'
import {getAllProducts} from '@/controller/ProductoController'
 
export const router = Router()

router.get('/',getAllProducts)