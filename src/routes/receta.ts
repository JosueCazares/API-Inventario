import {Router} from 'express'
import {getAllReceta} from '@/controller/RecetaController'
 
export const router = Router()

router.get('/',getAllReceta)