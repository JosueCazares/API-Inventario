import {Router} from 'express'
import {getAllPublic,createProduccion,getAllProReceta,updateProduccion,getAllPublicTodo} from '@/controller/ProduccionController'
 
export const router = Router()


router.get('/',getAllPublic)

router.get('/AllPublic',getAllPublicTodo)

router.post('/',createProduccion)

router.put('/',updateProduccion)