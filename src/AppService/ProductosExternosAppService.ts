import type {ProductoViewModel} from '@/viewModel/ProductoViewModel'
import {httpAPI} from '@/lib/api' 
import type {APIResponse} from '@/lib/types'

const API_JASSO = import.meta.env.VITE_URL_API_JASO;
const API_ULISSES = import.meta.env.VITE_URL_API_ULISES;
const API_ISAC = import.meta.env.VITE_URL_API_ISAC;
const API_BERO = import.meta.env.VITE_URL_API_BERO;

export class ProductosExpertnosAppService {
    async getAll(): Promise<ProductoViewModel[]>{
    try{
        //console.log('hola',API_BERO);
        if(!API_JASSO || !API_ULISSES || !API_ISAC || !API_BERO){
            throw new Error('No se han definido las URL de los servicios externos');
        }
        const responseJasso = await this.fetchApi(API_JASSO);
        const responseUlises = await this.fetchApi(API_ULISSES);
        const responseIsac = await this.fetchApi(API_ISAC);
        console.log(responseIsac);
        const responseBero = await this.fetchApi(API_BERO);
        //console.log('API_ULISSES', API_ULISSES);
        //console.log(responseBero);
        const responsUnion = responseJasso.data?.concat(responseUlises.data ?? [], responseIsac.data ?? [], responseBero.data ?? []);
        return responsUnion ?? [];
    }catch(e){
        console.error('Error en getProductos =>', e);
        throw e;
    }}

    private async fetchApi(url: string): Promise<APIResponse<ProductoViewModel[]>>{
        try {
            const response = await httpAPI<APIResponse<ProductoViewModel[]>>('/',"GET",undefined,{},url);
            return {
                status: response.status,
                data: response.data??[],
            };
        }catch(e){
            console.log(`Error en fetchApi => ${e}`);
            return {status: 'error', error: e, data: []};
        }
    }

}