import {Router} from 'express'
import {getAllProduccion} from '@/controller/ProduccionController'
 
export const router = Router()

router.get('/',getAllProduccion)