import {Router} from 'express'
import {getAllProduccion,createProduccion,getAllProReceta,updateProduccion} from '@/controller/ProduccionController'
 
export const router = Router()


router.get('/',getAllProReceta)

router.post('/',createProduccion)

router.put('/',updateProduccion)