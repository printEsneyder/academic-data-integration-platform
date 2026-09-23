import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

import { LaboratorioRegistro } from "../models/laboratorio.model";

interface RegistroCSV {
  id_estudiante?: string;
  nombre?: string;
  semestre?: string;
  fecha?: string;
  hora_entrada?: string;
  hora_salida?: string;
  equipo?: string;
}

const RAW_PATH = path.join(__dirname, "../../data/raw/laboratorios_acceso_completo.csv");
const CLEAN_JSON_PATH = path.join(__dirname, "../../data/clean/laboratorios_clean.json");

let cacheLaboratorios: LaboratorioRegistro[] | null = null;

function calcularDuracion(horaEntrada: string, horaSalida: string): number {
  const entrada = new Date(`2026-01-01 ${horaEntrada}`);
  const salida = new Date(`2026-01-01 ${horaSalida}`);

  const diferencia = salida.getTime() - entrada.getTime();

  return diferencia / (1000 * 60 * 60);
}

function normalizarFecha(fecha: string): string | null {
  const aIso = (anio: string, mes: string, dia: string) =>
    `${anio.padStart(4, "0")}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;

  let iso: string | null = null;

  if (/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/.test(fecha)) {
    const [anio, mes, dia] = fecha.split(/[\/-]/);
    iso = aIso(anio, mes, dia);
  } else if (/^\d{1,2}[\/-]\d{1,2}[\/-]\d{4}$/.test(fecha)) {
    const [dia, mes, anio] = fecha.split(/[\/-]/);
    iso = aIso(anio, mes, dia);
  }

  if (iso) {
    const date = new Date(`${iso}T00:00:00`);
    if (!Number.isNaN(date.getTime())) return iso;
  }

  return null;
}

export function limpiarCSV(): LaboratorioRegistro[] {
  if (cacheLaboratorios) return cacheLaboratorios;

  const archivo = fs.readFileSync(RAW_PATH);

  const registros = parse(archivo, {
    columns: true,
    skip_empty_lines: true,
  }) as RegistroCSV[];

  const datosLimpios: LaboratorioRegistro[] = [];

  const idsProcesados = new Set();

  for (const registro of registros) {
    const id = registro.id_estudiante?.trim() ?? "";
    const nombre = registro.nombre?.trim() ?? "";
    const semestre = Number(registro.semestre);
    const horaEntrada = registro.hora_entrada ?? "";
    const horaSalida = registro.hora_salida ?? "";
    const equipo = registro.equipo ?? "";

    if (!/^\d+$/.test(id)) continue;

    if (!nombre) continue;

    if (!Number.isInteger(semestre) || semestre <= 0) continue;

    const fecha = normalizarFecha(registro.fecha ?? "");

    if (!fecha) continue;

    const clave = `${id}-${fecha}`;

    if (idsProcesados.has(clave)) continue;

    const duracion = calcularDuracion(horaEntrada, horaSalida);

    if (!(duracion > 0) || duracion > 24) continue;

    idsProcesados.add(clave);

    datosLimpios.push({
      id_estudiante: id,
      nombre,
      semestre,
      fecha,
      hora_entrada: horaEntrada,
      hora_salida: horaSalida,
      equipo,
      duracion_horas: duracion,
    });
  }

  fs.writeFileSync(
    CLEAN_JSON_PATH,
    JSON.stringify(datosLimpios, null, 2)
  );

  cacheLaboratorios = datosLimpios;

  return datosLimpios;
}

export function obtenerEstadisticas(): {
  totalRegistros: number;
  totalHoras: number;
  estudiantesUnicos: number;
  equiposMasUsados: Record<string, number>;
} {
  const datos = limpiarCSV();

  const estudiantesUnicos = new Set(datos.map((d) => d.id_estudiante)).size;

  const totalHoras = datos.reduce((acc, d) => acc + d.duracion_horas, 0);

  const equiposMasUsados: Record<string, number> = {};

  for (const dato of datos) {
    equiposMasUsados[dato.equipo] = (equiposMasUsados[dato.equipo] || 0) + 1;
  }

  return {
    totalRegistros: datos.length,
    totalHoras: Math.round(totalHoras * 100) / 100,
    estudiantesUnicos,
    equiposMasUsados
  };
}