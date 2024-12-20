# api-inventario

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run
```

This project was created using `bun init` in bun v1.1.20. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## ENDPOINTS DISPONIBLES

#### PRODUCTOS

```http
  GET /api/producto
```

```http
  GET /api/producto/terminado
```

```http
  POST /api/producto/
```

Este ENDPOINT tipo post de va pedir por el json varias propiedades
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `json` | `string, number` | **Required**. |

#### RECETA

```http
  GET /api/receta/
```

```http
  POST /api/receta/
```

El endpoint tipo POST de receta te pedira varias propiedades en el cuerpo JSON
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `json` | `string, number` | **Required**. |

#### VENTA

```http
  GET /api/venta/
```

#### PRODUCCION

```http
  GET /api/produccion/
```

```http
  POST /api/produccion/
```

El ENDPOINT tipo POST de poruccion pedira varias propiedades por el cuerpo JSON
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `json` | `string, number` | **Required**.|

#### INVENTARIO

```http
  GET /api/inventario/
```

Retorna todo el inventario sin importar el tipo de producto

```http
  POST /api/produccion/
```

ENDPOINT para la ccreacion de nuevo inventario, no recomendado usarlo ya que ocupa un realcion con producto
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `json` | `string, number` | **Required**.|

```http
  POST /api/produccion/ById
```

Retorna el inventario por id del producto
| Parameter | Type | Description |
| :-------- | :------- | :------------------------- |
| `json` | `number` | **Required**.|

#### DETALLE VENTA

```http
  GET /api/detalleVenta/
```

Todos los registros de ventas, Detalle Venta

```http
  POST /api/detalleVenta/
```

Creacion de un detalleVenta, que es la venta como tal
Te pedira varias propiedades, las cuales van en el cuerpo en **JSON**

#### CONSUMO DE ENDPOINT PUBLICO Y APP SERVICE

Para poder tener un endpoint de todos los invetarios se tiene que hacer la peticion al

```http
  GET /api/produccion/AllPublic
```

Para poder unir los poryectos es necesario registrar en el .env las url de los demas enpoits,
para esto exponemos el puerto con el servicio de clouflared, despues de que obtienes la url de cloudflared tines que agregare

```http
  GET /api/produccion/
```

Esto al final de la url, para que el AppService haga la peticion a el endpoitn publico del otro proyecto y retorne la union de los endpoitns publicos
