import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

import { LaboratorioRegistro } from "../models/laboratorio.model";

const RAW_PATH = path.join(__dirname, "../../data/raw/laboratorios_acceso_completo.csv");
const CLEAN_JSON_PATH = path.join(__dirname, "../../data/clean/laboratorios_clean.json");

function calcularDuracion(horaEntrada: string, horaSalida: string): number {
  const entrada = new Date(`2026-01-01 ${horaEntrada}`);
  const salida = new Date(`2026-01-01 ${horaSalida}`);

  const diferencia = salida.getTime() - entrada.getTime();

  return diferencia / (1000 * 60 * 60);
}

export function limpiarCSV(): LaboratorioRegistro[] {
  const archivo = fs.readFileSync(RAW_PATH);

  const registros = parse(archivo, {
    columns: true,
    skip_empty_lines: true,
  });

  const datosLimpios: LaboratorioRegistro[] = [];

  const idsProcesados = new Set();

  for (const registro of registros) {
    const id = registro.id_estudiante?.trim();
    const nombre = registro.nombre?.trim();

    if (!/^\d+$/.test(id)) continue;

    if (!nombre) continue;

    const clave = `${id}-${registro.fecha}`;

    if (idsProcesados.has(clave)) continue;

    const duracion = calcularDuracion(
      registro.hora_entrada,
      registro.hora_salida
    );

    if (duracion <= 0) continue;

    idsProcesados.add(clave);

    datosLimpios.push({
      id_estudiante: id,
      nombre,
      semestre: Number(registro.semestre),
      fecha: registro.fecha,
      hora_entrada: registro.hora_entrada,
      hora_salida: registro.hora_salida,
      equipo: registro.equipo,
      duracion_horas: duracion,
    });
  }

  fs.writeFileSync(
    CLEAN_JSON_PATH,
    JSON.stringify(datosLimpios, null, 2)
  );

  return datosLimpios;
}