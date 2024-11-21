import { app } from './serve';
import {env} from './env'
//routes register
import {router as invetario} from '@/routes/inventario'

app.use('/api/inventario',invetario)



app.listen(env.PORT, () => {
    console.log(`API-Invetario  started on port ${env.PORT}`);
})