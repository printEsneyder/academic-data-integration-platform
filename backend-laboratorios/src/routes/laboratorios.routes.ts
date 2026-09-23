import { Router } from "express";

import {
  obtenerLaboratorios,
  obtenerEstadisticasController
} from "../controllers/laboratorios.controller";

const router = Router();

router.get("/", obtenerLaboratorios);

router.get("/estadisticas", obtenerEstadisticasController);

export default router;