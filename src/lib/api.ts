/* 
T representa un Tipo generico, es decir, permite al desarrollador definir el type de retorno de una funcion para castear de manera automatica.
Este type debe coincidir con el type que ustedes definan para las respuestas de la API y la respuesta siempre debe tener una misma estructura para funcionar correctamente.
*/
export async function httpAPI<T>(endpoint: string, method: 'GET' | 'POST' | 'DELETE' | 'PUT', body?: any, headers: HeadersInit = {},baseUrl?:string,isFormData: boolean = false): Promise<T> {
   // console.log('api'+baseUrl);
    const apiUrl = baseUrl || import.meta.env.VITE_API_URL
    const opciones: RequestInit = {
        method,
        headers: {
            ...headers,
            ...(isFormData ? {} : { 'Content-Type': 'application/json' })
        },
        body: isFormData 
        ? body // Enviar directamente FormData si es el caso
        : (method === 'POST' || method === 'PUT') 
            ? JSON.stringify(body) // Serializar JSON si no es FormData
            : undefined,
    };
 /*    if(file){
        const formData = new FormData();
        formData.append('pdf', file);

        if(body){
            for (const key in body) {
                formData.append(key, body[key]);
            }
        }
        opciones.body = formData;
    }else if(method === 'POST' || method === 'PUT'){
        opciones.body = JSON.stringify(body);
    } */
    return fetch(`${apiUrl}${endpoint}`, opciones)
        .then(response => {
            if (!response.ok) {
                console.log(response);
                throw new Error(response.statusText)
            }
            return response.json() as Promise<T>
        }).catch((error) => {
            console.log(error);
            throw new Error(error)
        })
}