import { app } from './serve';
import {env} from './env'
//routes register
import {router as invetario} from '@/routes/inventario'
import {router as producto} from '@/routes/producto'

app.use('/api/inventario',invetario)
app.use('/api/producto',producto)



app.listen(env.PORT, () => {
    console.log(`API-Invetario  started on port ${env.PORT}`);
})