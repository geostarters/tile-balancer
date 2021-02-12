# Tile Balancer

[![Project Status: WIP – Initial development is in progress, but there has not yet been a stable, usable release suitable for the public.](https://www.repostatus.org/badges/latest/wip.svg)](https://www.repostatus.org/#wip)
![stability-experimental](https://img.shields.io/badge/stability-experimental-orange.svg)

Servicio que sirve para tener un único endpoint para servicios que vienen de diferentes fuentes y asi evitar tener que poner la lógica en el cliente. El típico caso de si estás en Catalunya muestra este servicio y si estás fuera muestra este otro.

## Demo

Ejecutar arrancar la aplicación en modo de desarrollo

    npm run dev

Para probar

Una tesela: http://localhost:3000/api/services/topo/12/2055/1519.png

visor de leaflet: http://localhost:3000

visor mapbox gl v1.13: http://localhost:3000/indexgl.html#14.03/42.2525/0.72195/-90.4/71

visor 3D mapbox gl v2: http://localhost:3000/index3d.html#14.03/42.2525/0.72195/-90.4/71


## Template 

Basado en el Express Project Template https://github.com/geostarters/express-project-template

## BackEnd

Node Server 