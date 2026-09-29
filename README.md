# Academic Data Integration & Analytics Platform

![Node.js](https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-8884D8?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

<p align="center">
  <img src="assets/banner.png" alt="Academic Data Integration & Analytics Platform" width="100%">
</p>

## Descripción

Plataforma de integración de datos que reúne información académica dispersa en **tres fuentes distintas**: una base de datos relacional PostgreSQL, una base de datos no relacional MongoDB y archivos planos CSV. Cada fuente tiene su propio microservicio; un servicio **core** las consulta y las unifica, y un tablero React las presenta como indicadores y gráficas.

El objetivo es resolver el problema clásico de la integración: cada sistema guarda la información con su propio formato, su propio esquema y su propio protocolo de acceso, y reunirlos exige un proceso de extracción, transformación y carga.

Proyecto de portafolio para la asignatura de **Arquitectura e Integración de Datos** de la Universidad Mariana, programa de Ingeniería de Sistemas.

## Arquitectura

La plataforma sigue un patrón de **agregación REST en tiempo real**: cada fuente se expone como un servicio independiente y el servicio core las consulta en paralelo y fusiona la respuesta.

```mermaid
flowchart LR
  subgraph FUENTES["Fuentes de datos"]
    PG[("PostgreSQL<br/>Neon")]
    MG[("MongoDB<br/>Atlas")]
    CSV[["Archivo CSV"]]
  end

  subgraph SERVICIOS["Microservicios de extracción"]
    AR["academic-record<br/>puerto 3000"]
    BB["backend-biblioteca<br/>puerto 4000"]
    BL["backend-laboratorios<br/>puerto 3002"]
  end

  CORE["core-dwh<br/>puerto 3003"]
  DASH["dashboard-dwh<br/>puerto 5173"]

  PG --> AR
  MG --> BB
  CSV --> BL

  AR -->|"GET /api/estudiantes"| CORE
  BB -->|"GET /api/recursos-biblioteca"| CORE
  BL -->|"GET /api/laboratorios"| CORE

  CORE -->|"GET /api/etl/dashboard"| DASH
```

| Servicio | Función | Puerto | Origen de los datos |
|----------|---------|--------|---------------------|
| `academic-record` | Información académica: estudiantes, asignaturas, cursos, matrículas y calificaciones | 3000 | PostgreSQL |
| `backend-biblioteca` | Uso de la biblioteca: horas de lectura digital por estudiante | 4000 | MongoDB |
| `backend-laboratorios` | Limpieza y procesamiento de los registros de acceso a laboratorios | 3002 | Archivo CSV |
| `core-dwh` | Consulta los tres servicios en paralelo y unifica la respuesta | 3003 | Los tres servicios |
| `dashboard-dwh` | Tablero con tarjetas de indicadores y gráficas | 5173 | `core-dwh` |

### El recorrido de los datos

1. Cada microservicio consulta su propia fuente de datos.
2. `backend-laboratorios` limpia el CSV: normaliza fechas, descarta duplicados y calcula la duración de cada visita.
3. `core-dwh` lanza las tres consultas en paralelo con `Promise.all` y fusiona los resultados en un único objeto, calculando además los totales del tablero.
4. El dashboard pide ese objeto una sola vez y dibuja cada indicador.

## El tablero

| Indicador o gráfica | Qué representa |
|----------------------|----------------|
| **Total Estudiantes** | Número de estudiantes registrados en PostgreSQL |
| **Recursos Biblioteca** | Registros de uso de biblioteca obtenidos de MongoDB |
| **Horas Laboratorio** | Suma de las horas de todos los registros limpios del CSV |
| **Registros Laboratorio** | Cantidad de registros válidos después de la limpieza |
| **Estudiantes por Semestre** | Distribución de estudiantes, en gráfica de dona |
| **Distribución de Semestres** | La misma distribución en gráfica de barras |
| **Uso Biblioteca** | Horas de lectura digital por estudiante |
| **Horas por Equipo de Laboratorio** | Equipos más utilizados, en barras horizontales |
| **Horas de Laboratorio por Estudiante** | Uso de laboratorios por estudiante, en vista de radar |

El tablero maneja tres estados: carga con indicador giratorio, error de conexión con botón **Reintentar**, y la vista principal con los datos.

## APIs

Toda la plataforma es de solo lectura: expone únicamente endpoints `GET`.

### `academic-record` — puerto 3000

| Ruta | Devuelve |
|------|----------|
| `GET /` | Estado del servicio |
| `GET /health` | Estado de la conexión a la base de datos |
| `GET /api/estudiantes` | Estudiantes registrados |
| `GET /api/asignaturas` | Asignaturas |
| `GET /api/cursos` | Cursos |
| `GET /api/matriculas` | Matrículas |
| `GET /api/calificaciones` | Calificaciones |

**Modelos:** `Estudiante` (id, nombres, apellidos, correo, semestre), `Asignatura` (id, nombre, créditos), `Curso` (id, asignatura, grupo), `Matricula` (id, estudiante, curso) y `Calificacion` (id, estudiante, asignatura, tres seguimientos y nota final).

### `backend-biblioteca` — puerto 4000

| Ruta | Devuelve |
|------|----------|
| `GET /` | Estado del servicio |
| `GET /api/recursos-biblioteca` | Uso de la biblioteca desde la colección `recursos_biblioteca` |

### `backend-laboratorios` — puerto 3002

| Ruta | Devuelve |
|------|----------|
| `GET /` | Estado del servicio |
| `GET /api/laboratorios` | Registros limpios de laboratorio |
| `GET /api/laboratorios/estadisticas` | Horas totales, estudiantes únicos y equipos más usados |

### `core-dwh` — puerto 3003

| Ruta | Devuelve |
|------|----------|
| `GET /` | Estado del servicio |
| `GET /api/etl/status` | Estado de cada servicio origen |
| `GET /api/etl/dashboard` | Toda la información unificada para el tablero |

## La limpieza del CSV

El archivo de origen trae registros con errores a propósito, para demostrar el proceso de transformación. `csvCleaner.service.ts` aplica estas reglas:

1. Elimina espacios sobrantes al inicio y al final de los textos.
2. Descarta los registros cuyo documento no sea un número válido.
3. Descarta los registros sin nombre.
4. Normaliza las fechas al formato ISO `AAAA-MM-DD`, aceptando los tres formatos que aparecen en el archivo.
5. Descarta los duplicados usando la combinación documento y fecha.
6. Calcula la duración en horas a partir de la hora de entrada y la de salida.
7. Descarta los registros con duración cero, negativa o mayor a 24 horas.

El archivo `data/raw/laboratorios_acceso_completo.csv` tiene seis registros y el resultado son tres:

| Fila | Problema del registro | Resultado |
|------|-----------------------|-----------|
| 1 | Espacios sobrantes en el nombre | Se conserva: 2.5 h |
| 2 | Fecha en formato `DD-MM-YYYY` | Se conserva: fecha normalizada a `2026-05-10`, 1.75 h |
| 3 | Registro válido | Se conserva: 2.5 h |
| 4 | Duplicado exacto de la fila 1 | Se descarta |
| 5 | Documento no numérico y duración negativa | Se descarta |
| 6 | Nombre vacío | Se descarta |

El resultado se escribe en `data/clean/laboratorios_clean.json` y se guarda en memoria, de modo que el archivo se procesa una sola vez por sesión.

## Tecnologías utilizadas

| Capa | Tecnología | Uso |
|------|------------|-----|
| Lenguaje | TypeScript 6 | Todo el backend y el tablero |
| Backend | Express 5 | Las cuatro APIs REST |
| Conexión relacional | `pg` 8 | Servicio de información académica |
| Conexión NoSQL | `mongodb` 7 | Servicio de biblioteca |
| Cliente HTTP | `axios` | `core-dwh` hacia los demás servicios |
| CSV | `csv-parse` | Lectura y análisis del archivo de laboratorios |
| Frontend | React 19 + Vite 8 | Tablero de indicadores |
| Gráficas | Recharts 3 | Dona, barras, barras horizontales y radar |
| Estilos | Tailwind CSS 3 | Tema oscuro del tablero |
| Orquestación | `concurrently` | Levantar los cinco servicios a la vez |

## Requisitos previos

- **Node.js 20.19 o superior** (o 22 LTS en adelante). El tablero usa Vite 8, que no funciona en versiones anteriores.
- **npm 10 o superior**.
- **Conexión a internet**, porque las bases de datos están alojadas en la nube.

No hace falta instalar PostgreSQL ni MongoDB localmente: los dos servicios de base de datos apuntan a instancias en la nube ya configuradas.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/printEsneyder/academic-data-integration-platform.git
cd academic-data-integration-platform
```

### 2. Instalar las dependencias de los cinco servicios

```bash
npm run install:all
```

### 3. Revisar la configuración de conexión

Cada servicio tiene su archivo `.env` con las variables que usa. Si quieres apuntar a tus propias bases de datos, copia el `.env.example` correspondiente y reemplaza los valores.

```bash
# academic-record
PORT=3000
DATABASE_URL=postgresql://usuario:password@host:5432/nombre_base?sslmode=require

# backend-biblioteca
MONGO_URI=mongodb+srv://usuario:password@cluster.mongodb.net/?appName=mi-cluster

# backend-laboratorios
PORT=3002

# core-dwh
PORT=3003
ACADEMIC_API=http://localhost:3000/api
BIBLIOTECA_API=http://localhost:4000/api
LABORATORIOS_API=http://localhost:3002/api
```

### 4. Levantar todo

```bash
npm run dev
```

El comando usa `concurrently` para iniciar los cinco servicios a la vez, cada uno con su propio color en la terminal. Cuando termine de cargar, abre **http://localhost:5173** en el navegador.

### 5. Levantar servicio por servicio

Si necesitas depurar un componente aislado, cada servicio se ejecuta por separado:

```bash
npm run dev:academic        # http://localhost:3000
npm run dev:biblioteca      # http://localhost:4000
npm run dev:laboratorios    # http://localhost:3002
npm run dev:core            # http://localhost:3003
npm run dev:dashboard       # http://localhost:5173
```

### Comprobar que todo responde

```bash
curl http://localhost:3003/api/etl/status
```

Devuelve el estado de cada servicio origen. Si los tres aparecen `online`, la integración está completa.

## Estructura del proyecto

```text
academic-data-integration-platform/
├── package.json              Orquestación con concurrently
├── assets/                   Banner del README
├── academic-record/          API de información académica (PostgreSQL)
│   └── src/
│       ├── app.ts
│       ├── config/           Pool de conexiones
│       ├── controllers/
│       ├── models/
│       ├── repositories/
│       └── routes/
├── backend-biblioteca/       API de biblioteca (MongoDB)
│   └── src/
│       ├── app.ts
│       ├── config/
│       └── routes/
├── backend-laboratorios/     Procesamiento del archivo CSV
│   ├── data/
│   │   ├── raw/              CSV original
│   │   └── clean/            JSON ya limpio
│   └── src/
│       ├── app.ts
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       └── services/         Lógica de limpieza
├── core-dwh/                 Agregación de los tres servicios
│   └── src/
│       ├── app.ts
│       ├── routes/
│       └── services/         Fusión de la respuesta
└── dashboard-dwh/            Tablero React
    ├── src/
    │   ├── components/       Gráficas, tarjetas, barra y pie
    │   ├── services/
    │   ├── types/
    │   ├── App.tsx
    │   └── main.tsx
    ├── tailwind.config.js
    └── vite.config.ts
```

Los cuatro backends siguen la misma estructura en capas: **routes → controllers → services/repositories → fuente de datos**. El tablero llama a `core-dwh` a través del proxy de Vite, que redirige `/api` al puerto 3003, por lo que no hay problemas de CORS en desarrollo.

## Estado del proyecto

| Aspecto | Estado |
|---------|--------|
| Microservicios | 4 APIs REST y 1 tablero, operativos |
| Integración | Las tres fuentes unificadas en una sola respuesta |
| Limpieza de datos | 6 registros crudos se reducen a 3 válidos |
| Gráficas | 5 tipos: dona, barras, barras horizontales y radar |
| Tipado | TypeScript con `strict: true` en los cinco paquetes |
| Pruebas automatizadas | No implementadas |

## Preguntas frecuentes

**¿Por qué el tablero muestra un error de conexión?**
El frontend consulta a `core-dwh`, y ese servicio necesita a los tres microservicios de extracción encendidos. Levanta los cinco con `npm run dev` o revisa el estado con `curl http://localhost:3003/api/etl/status`.

**¿Dónde se configura a qué base de datos apunta cada servicio?**
En el archivo `.env` de cada uno, con una plantilla disponible en `.env.example`. `core-dwh` además lleva las URL de los otros tres servicios en sus variables `ACADEMIC_API`, `BIBLIOTECA_API` y `LABORATORIOS_API`.

**¿El JSON limpio se genera automáticamente?**
Sí. `backend-laboratorios` lo escribe en la primera petición a `/api/laboratorios` y lo mantiene en memoria durante el resto de la sesión. Si reemplazas el CSV, reinicia ese servicio.

**¿Qué pasa si una de las fuentes falla?**
La agregación es de todo o nada: si una de las tres consultas falla, `core-dwh` propaga el error y el tablero muestra la pantalla de error con el botón **Reintentar**.

**¿El proyecto necesita las bases de datos levantadas localmente?**
No. PostgreSQL corre en Neon y MongoDB en Atlas, ambos en la nube. El único almacenamiento local es el archivo CSV.

**¿Cómo agrego una fuente de datos nueva?**
Crea un servicio más con Express en un puerto libre, expón un endpoint `GET` con tus datos y agrégalo a las variables de `core-dwh` y a la lista de consultas de `dashboard.service.ts`.

## Autor

**Esneyder Ibarra Rosero** — Ingeniero de Sistemas

- **Correo:** [esneydribarra1970@gmail.com](mailto:esneydribarra1970@gmail.com)
- **LinkedIn:** [esneyder-ibarra-rosero](https://www.linkedin.com/in/esneyder-ibarra-rosero)
- **GitHub:** [printEsneyder](https://github.com/printEsneyder)

---

<p align="center">
  <strong>Universidad Mariana</strong> · Facultad de Ingeniería · Programa de Ingeniería de Sistemas<br>
  Arquitectura e Integración de Datos
</p>

<p align="center">
  <a href="https://www.linkedin.com/in/esneyder-ibarra-rosero">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
  <a href="mailto:esneydribarra1970@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail">
  </a>
  <a href="https://github.com/printEsneyder">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
</p>
