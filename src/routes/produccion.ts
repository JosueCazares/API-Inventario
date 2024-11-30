import {Router} from 'express'
import {getAllProduccion,createProduccion} from '@/controller/ProduccionController'
 
export const router = Router()

router.get('/',getAllProduccion)

router.post('/',createProduccion)