import {Router} from 'express'
import {getAllInvetario} from '@/controller/InventarioController'
export const router = Router()
//ENDPOINT QUE OBTIENE TODO EL INVENTARIO
router.get('/',getAllInvetario)

router