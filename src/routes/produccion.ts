import {Router} from 'express'
import {getAllProduccion,createProduccion,getAllProReceta} from '@/controller/ProduccionController'
 
export const router = Router()


router.get('/',getAllProReceta)

router.post('/',createProduccion)