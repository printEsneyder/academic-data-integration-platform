# 📊 Dashboard ETL (dashboard-dwh)

Interfaz visual del proyecto **Dashboard ETL Académico**. Construida con React, TypeScript, Tailwind CSS y Recharts.

## Funcionalidades

- Tarjetas KPI con métricas principales
- Gráfica de estudiantes por semestre (donut)
- Distribución de semestres (barras)
- Horas de lectura digital en biblioteca (barras)
- Horas por equipo de laboratorio (barras horizontales)
- Horas de laboratorio por estudiante (radar)
- Estado de carga, de error y botón de reintento

## Puesta en marcha

```bash
npm install
npm run dev
```

La aplicación corre en `http://localhost:5173` y usa un proxy de Vite hacia `core-dwh` en el puerto `3003`, por lo que no requiere configuración adicional siempre que `core-dwh` esté corriendo.

## Scripts

| Comando          | Descripción                 |
| ---------------- | --------------------------- |
| `npm run dev`    | Servidor de desarrollo      |
| `npm run build`  | Compilación de producción   |
| `npm run preview`| Previsualizar el build      |
| `npm run lint`   | Análisis estático con ESLint|

## Autor

**Esneyder Ibarra** · [@printEsneydr](https://github.com/printEsneydr)