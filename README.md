````md
# proyecto etl y dashboard academico



## universidad mariana  
ingenieria de sistemas  
arquitectura e integracion de datos  



---

# introduccion



este proyecto fue realizado con el fin de integrar diferentes fuentes de informacion academica en un solo sistema visual

el sistema permite obtener datos desde postgresql mongodb y archivos csv para luego mostrarlos en un dashboard desarrollado con react

la idea principal fue construir un pequeño proceso etl donde los datos se extraen se limpian y finalmente se muestran de manera organizada



---

# objetivo general



desarrollar un sistema capaz de reunir informacion academica desde diferentes fuentes de datos y mostrarla en un dashboard visual e interactivo



---

# descripcion general del proyecto



el proyecto se encuentra dividido en varios microservicios

cada uno cumple una funcion distinta dentro del sistema



| microservicio       | funcion principal       | puerto |
|---                  |---                      | ---    |
| academic record     | informacion academica   | 3000   |
| backend biblioteca  | informacion biblioteca  | 4000   |
| backend laboratorios| procesamiento csv       | 3002   |
| core dwh            | integracion y dashboard | 3003   |
| dashboard dwh       | interfaz visual react   | 517    |



---

# funcionamiento general



el sistema funciona en varios pasos sencillos



### paso 1

academic record obtiene datos academicos desde postgresql



### paso 2

backend biblioteca obtiene informacion desde mongodb



### paso 3

backend laboratorios procesa archivos csv y limpia los datos



### paso 4

core dwh toma toda la informacion y la une en un solo lugar



### paso 5

el dashboard muestra la informacion mediante graficas y tarjetas visuales



---

# tecnologias utilizadas



| herramienta    |             uso             |
|---             |---                          |
| node js        | backend                     |
| express        | api rest                    |
| typescript     | estructura del codigo       |
| react          | frontend                    |
| tailwind css   | estilos                     |
| recharts       | graficas                    |
| mongodb        | base de datos no relacional |
| postgresql     | base de datos relacional    |
| neon           | almacenamiento postgres     |
| mongodb compass| manejo mongodb              |



---

# estructura general del proyecto



```text
proyecto-etl

academic-record
backend-biblioteca
backend-laboratorios
core-dwh
dashboard-dwh
````

---

# academic record

este microservicio se conecta a postgresql y retorna informacion academica de estudiantes materias cursos y calificaciones

## endpoints disponibles

| ruta                                                                                                   | descripcion             |
| ------------------------------------------------------------------------------------------------------ | ----------------------- |
| [http://localhost:3000/](http://localhost:3000/)                                                       | estado del servicio     |
| [http://localhost:3000/api/estudiantes](http://localhost:3000/api/estudiantes)                         | estudiantes registrados |
| [http://localhost:3000/api/estudiantes-colombia](http://localhost:3000/api/estudiantes-colombia)       | estudiantes colombia    |
| [http://localhost:3000/api/asignaturas](http://localhost:3000/api/asignaturas)                         | asignaturas             |
| [http://localhost:3000/api/materias-sistemas](http://localhost:3000/api/materias-sistemas)             | materias sistemas       |
| [http://localhost:3000/api/cursos](http://localhost:3000/api/cursos)                                   | cursos                  |
| [http://localhost:3000/api/matriculas](http://localhost:3000/api/matriculas)                           | matriculas              |
| [http://localhost:3000/api/calificaciones](http://localhost:3000/api/calificaciones)                   | calificaciones          |
| [http://localhost:3000/api/calificaciones-sistemas](http://localhost:3000/api/calificaciones-sistemas) | notas estudiantes       |

---

# backend biblioteca

este servicio se conecta a mongodb y devuelve informacion relacionada con el uso de biblioteca y recursos digitales

## endpoints disponibles

| ruta                                                                                           | descripcion            |
| ---------------------------------------------------------------------------------------------- | ---------------------- |
| [http://localhost:4000/](http://localhost:4000/)                                               | estado del servicio    |
| [http://localhost:4000/api/recursos-biblioteca](http://localhost:4000/api/recursos-biblioteca) | informacion biblioteca |

---

# backend laboratorios

este microservicio procesa archivos csv relacionados con laboratorios

los archivos son limpiados y convertidos a json

## procesos realizados

* limpieza de espacios
* validacion de ids
* limpieza de fechas
* calculo de horas
* eliminacion de errores

## endpoints disponibles

| ruta                                                                             | descripcion            |
| -------------------------------------------------------------------------------- | ---------------------- |
| [http://localhost:3002/](http://localhost:3002/)                                 | estado del servicio    |
| [http://localhost:3002/api/laboratorios](http://localhost:3002/api/laboratorios) | registros laboratorios |

---

# core dwh

este es el servicio principal del proyecto

su funcion es consumir toda la informacion de los otros servicios y consolidarla para el dashboard

## endpoints disponibles

| ruta                                                                               | descripcion         |
| ---------------------------------------------------------------------------------- | ------------------- |
| [http://localhost:3003/](http://localhost:3003/)                                   | estado del servicio |
| [http://localhost:3003/api/etl/status](http://localhost:3003/api/etl/status)       | estado etl          |
| [http://localhost:3003/api/etl/dashboard](http://localhost:3003/api/etl/dashboard) | dashboard completo  |

---

# dashboard dwh

el dashboard fue desarrollado con react y permite visualizar toda la informacion mediante graficas

## informacion mostrada

* total estudiantes
* uso biblioteca
* horas laboratorio
* rendimiento academico
* distribucion semestres
* uso de equipos

## url principal

| url                                            | descripcion      |
| ---------------------------------------------- | ---------------- |
| [http://localhost:5173](http://localhost:5173) | dashboard visual |

---

# resultados obtenidos

se logro integrar informacion desde diferentes fuentes de datos en un unico sistema

tambien se logro mostrar la informacion mediante un dashboard visual sencillo y funcional

el proyecto permitio comprender como funcionan los procesos de integracion limpieza y visualizacion de datos

---

# conclusiones

el desarrollo del proyecto permitio comprender el funcionamiento basico de un proceso etl

tambien se logro aprender la conexion entre diferentes tecnologias como react mongodb postgresql y node js

finalmente se pudo construir un dashboard funcional capaz de mostrar informacion academica de manera organizada

---

# integrantes

jhon fredy bolaños
esneyder ibarra
german andrade


ingenieria de sistemas
universidad mariana

```
```
