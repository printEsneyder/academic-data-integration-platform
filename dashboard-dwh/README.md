# Dashboard de Integracion de Datos

Pantalla principal del proyecto Academic Data Integration & Analytics Platform. Construido con React, TypeScript, Tailwind CSS y Recharts.

## Que muestra

- Tarjetas con las metricas principales (estudiantes, biblioteca, horas de laboratorio, registros)
- Grafica de estudiantes por semestre
- Distribucion de estudiantes por semestre
- Horas de lectura digital en biblioteca
- Horas por equipo de laboratorio
- Horas de laboratorio por estudiante
- Estado de carga, pantalla de error y boton para reintentar

## Como se usa

```bash
npm install
npm run dev
```

La aplicacion corre en http://localhost:5173 y usa un proxy de Vite hacia el servicio core (puerto 3003), por lo que solo necesita que ese servicio este encendido para funcionar.

## Comandos

| Comando             | Descripcion                    |
| ------------------- | ------------------------------ |
| npm run dev         | Servidor de desarrollo         |
| npm run build       | Compilacion de produccion      |
| npm run preview     | Previsualizar la compilacion   |
| npm run lint        | Revision del codigo con ESLint |

## Autor

**Esneyder Ibarra**

- Telefono: +57 323 215 7962
- Correo: esneydribarra1970@gmail.com
- LinkedIn: https://www.linkedin.com/in/esneyder-ibarra-rosero
- GitHub: https://github.com/printEsneydr