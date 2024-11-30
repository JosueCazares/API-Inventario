import {Router} from 'express'
import {getAllReceta,createReceta} from '@/controller/RecetaController'
 
export const router = Router()

router.get('/',getAllReceta)

router.post('/',createReceta)