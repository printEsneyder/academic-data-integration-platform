# Academic Data Integration & Analytics Platform

Plataforma de integracion de datos academicos que reúne informacion de una base de datos relacional (PostgreSQL), una base de datos no relacional (MongoDB) y archivos planos (CSV). Toda esa informacion es procesada, unificada y mostrada en un tablero visual e interactivo.

Proyecto desarrollado como portafolio academico para la asignatura de Arquitectura e Integracion de Datos de la Universidad Mariana, programa de Ingenieria de Sistemas.

---

## ¿Que hace el proyecto?

| Parte del sistema          | Que hace                                                    | Puerto |
| -------------------------- | ----------------------------------------------------------- | ------ |
| academic-record            | Entrega informacion academica desde PostgreSQL               | 3000   |
| backend-biblioteca         | Entrega informacion de uso de biblioteca desde MongoDB       | 4000   |
| backend-laboratorios       | Limpia y procesa archivos CSV de laboratorios                | 3002   |
| core-dwh                   | Une toda la informacion y la prepara para el tablero         | 3003   |
| dashboard-dwh              | Muestra la informacion con graficas y tarjetas               | 5173   |

### Como es el recorrido de los datos

```text
PostgreSQL ---- academic-record ----+
MongoDB ------ backend-biblioteca --+---- core-dwh ---- dashboard-dwh
CSV ---------- backend-laboratorios-+
```

El camino es sencillo:

1. Cada servicio consulta su propia fuente de datos (base de datos o archivo).
2. La informacion se limpia y se ordena (se corrigen fechas, se quitan duplicados, se calculan horas).
3. El servicio core junta todo y lo entrega como una sola respuesta.
4. El tablero dibuja graficas y tarjetas con esa informacion.

---

## Tecnologias usadas

| Tecnologia     | Para que se usa              |
| -------------- | ---------------------------- |
| Node.js        | Lenguaje del backend         |
| Express        | Crear las APIs               |
| TypeScript     | Dar estructura al codigo     |
| React          | Pantalla del tablero         |
| Tailwind CSS   | Diseno y estilos             |
| Recharts       | Graficas del tablero         |
| PostgreSQL     | Base de datos relacional     |
| MongoDB        | Base de datos no relacional  |
| Neon           | PostgreSQL en la nube        |
| MongoDB Compass| Administrar MongoDB          |

---

## Requisitos para usarlo

- Node.js (version 18 o superior)
- npm
- Conexion a internet (las bases de datos estan en la nube)

No hace falta instalar ni configurar bases de datos locales: el proyecto ya incluye los datos de conexion necesarios en cada servicio.

---

## Como levantarlo

### Opcion 1: todo a la vez (recomendada)

Desde la carpeta principal del proyecto:

```bash
npm run install:all
npm run dev
```

Esto instala las dependencias de los cinco servicios y los enciende todos juntos.

### Opcion 2: servicio por servicio

En una terminal para cada servicio:

```bash
npm run dev --prefix academic-record
npm run dev --prefix backend-biblioteca
npm run dev --prefix backend-laboratorios
npm run dev --prefix core-dwh
npm run dev --prefix dashboard-dwh
```

Cuando todo este corriendo, abra en el navegador:

| Pantalla                  | Direccion         |
| ------------------------- | ----------------- |
| Tablero principal         | http://localhost:5173 |

---

## Que informacion entrega cada servicio

### Academic Record (puerto 3000)

| Ruta                          | Que devuelve               |
| ----------------------------- | -------------------------- |
| GET /                         | Estado del servicio        |
| GET /health                   | Estado de la base de datos |
| GET /api/estudiantes          | Estudiantes registrados    |
| GET /api/asignaturas          | Asignaturas                |
| GET /api/cursos               | Cursos                     |
| GET /api/matriculas           | Matriculas                 |
| GET /api/calificaciones       | Calificaciones             |

### Backend Biblioteca (puerto 4000)

| Ruta                          | Que devuelve                          |
| ----------------------------- | ------------------------------------- |
| GET /                         | Estado del servicio                   |
| GET /api/recursos-biblioteca  | Informacion de uso de la biblioteca   |

### Backend Laboratorios (puerto 3002)

| Ruta                                   | Que devuelve                        |
| -------------------------------------- | ----------------------------------- |
| GET /                                  | Estado del servicio                 |
| GET /api/laboratorios                  | Registros limpios de laboratorio    |
| GET /api/laboratorios/estadisticas     | Horas, equipos y estudiantes unicos |

### Core DWH (puerto 3003)

| Ruta                     | Que devuelve                          |
| ------------------------ | ------------------------------------- |
| GET /                    | Estado del servicio                   |
| GET /api/etl/status      | Estado de cada servicio conectado     |
| GET /api/etl/dashboard   | Toda la informacion unida del tablero |

---

## Que muestra el tablero

- Total de estudiantes
- Horas de uso de laboratorio y equipos mas usados
- Uso de biblioteca (horas de lectura digital)
- Distribucion de estudiantes por semestre
- Horas de laboratorio por estudiante
- Estado de cada servicio conectado

<img width="1920" height="1080" alt="Vista principal del tablero" src="https://github.com/user-attachments/assets/3afbfe3f-361a-4998-8e7e-343a7685a11e" />

---

## Como se limpian los datos

- Se quitan espacios en blanco de mas.
- Se valida que los documentos de los estudiantes sean numeros validos.
- Se normalizan las fechas a un mismo formato.
- Se descartan registros duplicados.
- Se calcula cuantas horas paso cada estudiante en el laboratorio.
- Se eliminan registros con errores.

---

## Estructura del proyecto

```text
academic-data-integration-platform/
├── academic-record/            # API de informacion academica (PostgreSQL)
├── backend-biblioteca/         # API de biblioteca (MongoDB)
├── backend-laboratorios/       # Procesamiento de archivos CSV
│   └── data/
│       ├── raw/                # Archivo CSV original
│       └── clean/              # Archivo JSON ya limpio
├── core-dwh/                   # Servicio que une toda la informacion
├── dashboard-dwh/              # Tablero interactivo (React)
└── README.md
```

---

## Autor y contacto

**Esneyder Ibarra**

- Telefono: +57 323 215 7962
- Correo: esneydribarra1970@gmail.com
- LinkedIn: [esneyder-ibarra-rosero](https://www.linkedin.com/in/esneyder-ibarra-rosero)
- GitHub: [printEsneydr](https://github.com/printEsneydr)

---

## Acerca del proyecto

Este repositorio es un proyecto academico de portafolio. Se publica con el objetivo de mostrar el proceso completo de integracion de datos y de compartir el codigo para quien quiera revisarlo o probarlo. Las bases de datos usadas pertenecen al proyecto y han sido configuradas para permitir su consulta remota, por eso el proyecto funciona apenas se levanta y no requiere instalaciones adicionales.