# 📊 Dashboard ETL Académico

Sistema de integración de datos académicos que consume información desde **PostgreSQL**, **MongoDB** y archivos **CSV**, la procesa mediante un pipeline **ETL** y la visualiza en un dashboard interactivo construido con **React**.

Proyecto desarrollado para la asignatura de **Arquitectura e Integración de Datos** de la **Universidad Mariana** (Ingeniería de Sistemas).

---

## 🚀 Características

| Componente          | Descripción                                                       | Puerto |
| ------------------- | ----------------------------------------------------------------- | ------ |
| `academic-record`   | Información académica desde PostgreSQL                            | 3000   |
| `backend-biblioteca`| Información de uso de biblioteca desde MongoDB                    | 4000   |
| `backend-laboratorios` | Procesamiento y limpieza de archivos CSV                        | 3002   |
| `core-dwh`          | Orquestador: unifica los datos y alimenta el dashboard            | 3003   |
| `dashboard-dwh`     | Interfaz visual (React + Tailwind + Recharts)                     | 5173   |

### Lógica del sistema

```text
PostgreSQL ──► academic-record ─┐
MongoDB ────► backend-biblioteca ─┼──► core-dwh ──► dashboard-dwh
CSV ────────► backend-laboratorios ─┘
```

1. **Extract:** cada microservicio obtiene datos de su fuente (PostgreSQL, MongoDB, CSV).
2. **Transform:** se limpian, validan y normalizan los datos (ids, fechas, horas, duplicados).
3. **Load:** `core-dwh` consolida todo y lo entrega como una sola API al dashboard.

---

## 🛠️ Tecnologías

| Herramienta     | Uso                     |
| --------------- | ----------------------- |
| Node.js         | Backend                 |
| Express         | API REST                |
| TypeScript      | Estructura del código   |
| React           | Frontend                |
| Tailwind CSS    | Estilos                 |
| Recharts        | Gráficas                |
| MongoDB         | Base de datos no relacional |
| PostgreSQL      | Base de datos relacional |
| Neon            | Almacenamiento PostgreSQL en la nube |
| MongoDB Compass | Gestión visual de MongoDB |

---

## 📦 Requisitos previos

- Node.js **18+**
- npm
- Acceso a una base de datos **PostgreSQL** (por ejemplo Neon)
- Opcional: instancia **MongoDB**

### Configuración de variables de entorno

Copia cada archivo `.env.example` a `.env` dentro de su microservicio y completa los valores:

```bash
# academic-record/.env
DATABASE_URL=postgresql://usuario:clave@host:5432/base?sslmode=require
```

```bash
# backend-biblioteca/.env
MONGO_URI=mongodb+srv://usuario:clave@cluster.mongodb.net/?appName=mi-cluster
```

```bash
# core-dwh/.env
ACADEMIC_API=http://localhost:3000/api
BIBLIOTECA_API=http://localhost:4000/api
LABORATORIOS_API=http://localhost:3002/api
```

> ⚠️ **Seguridad:** los `.env` no deben subirse al repositorio. Quedan ignorados por `.gitignore`.

---

## ▶️ Instalación y puesta en marcha

Desde la raíz del proyecto:

```bash
# 1. Instalar dependencias de todos los microservicios
npm run install:all

# 2. Levantar los 5 servicios a la vez
npm run dev
```

O en cada microservicio por separado:

```bash
npm run dev --prefix academic-record
npm run dev --prefix backend-biblioteca
npm run dev --prefix backend-laboratorios
npm run dev --prefix core-dwh
npm run dev --prefix dashboard-dwh
```

---

## 🔌 Endpoints disponibles

### Academic Record (3000)

| Ruta                                            | Descripción                  |
| ----------------------------------------------- | ---------------------------- |
| `GET /`                                         | Estado del servicio          |
| `GET /health`                                   | Estado de la conexión a PostgreSQL |
| `GET /api/estudiantes`                          | Estudiantes registrados      |
| `GET /api/asignaturas`                          | Asignaturas                  |
| `GET /api/cursos`                               | Cursos                       |
| `GET /api/matriculas`                           | Matrículas                   |
| `GET /api/calificaciones`                       | Calificaciones               |

### Backend Biblioteca (4000)

| Ruta                                            | Descripción                          |
| ----------------------------------------------- | ------------------------------------ |
| `GET /`                                         | Estado del servicio                  |
| `GET /api/recursos-biblioteca`                  | Información de uso de la biblioteca  |

### Backend Laboratorios (3002)

| Ruta                                            | Descripción                     |
| ----------------------------------------------- | ------------------------------- |
| `GET /`                                         | Estado del servicio             |
| `GET /api/laboratorios`                         | Registros limpios de laboratorios |
| `GET /api/laboratorios/estadisticas`            | Horas, equipos y estudiantes únicos |

### Core DWH (3003)

| Ruta                                            | Descripción                   |
| ----------------------------------------------- | ----------------------------- |
| `GET /`                                         | Estado del servicio           |
| `GET /api/etl/status`                           | Estado del proceso ETL        |
| `GET /api/etl/dashboard`                        | Datos consolidados del dashboard |

### Dashboard (5173)

| URL                        | Descripción       |
| -------------------------- | ----------------- |
| `http://localhost:5173`    | Dashboard visual  |

---

## 📊 Lo que muestra el dashboard

- Total de estudiantes
- Horas de uso de laboratorio y equipos más usados
- Uso de biblioteca (horas de lectura digital)
- Distribución de estudiantes por semestre
- Horas de laboratorio por estudiante

<img width="1920" height="1080" alt="Vista principal del dashboard" src="https://github.com/user-attachments/assets/3afbfe3f-361a-4998-8e7e-343a7685a11e" />

---

## 🧹 Procesos del ETL

- Limpieza de espacios y normalización de datos
- Validación de ids de estudiantes
- Normalización de fechas a formato ISO
- Cálculo de duración de permanencia en laboratorio
- Eliminación de registros duplicados y con errores
- Consolidación de fuentes heterogéneas en un único modelo

---

## 📁 Estructura del proyecto

```text
proyecto-etl/
├── academic-record/           # API académica (PostgreSQL)
├── backend-biblioteca/        # API biblioteca (MongoDB)
├── backend-laboratorios/      # Procesamiento de CSV
│   └── data/
│       ├── raw/               # CSV original
│       └── clean/             # JSON resultante del ETL
├── core-dwh/                  # Orquestador y consolidación
├── dashboard-dwh/             # Frontend React
└── README.md
```

---

## 👤 Autor

**Esneyder Ibarra**

- GitHub: [@printEsneydr](https://github.com/printEsneydr)

---

## 📄 Licencia

Este proyecto fue desarrollado con fines **académicos**. Su uso está orientado únicamente al aprendizaje de arquitectura e integración de datos.