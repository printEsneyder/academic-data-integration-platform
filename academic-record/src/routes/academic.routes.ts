import { Router } from "express";

import {
  estudiantesController,
  asignaturasController,
  cursosController,
  matriculasController,
  calificacionesController
} from "../controllers/academic.controller";

const router = Router();

router.get("/estudiantes", estudiantesController);

router.get("/asignaturas", asignaturasController);

router.get("/cursos", cursosController);

router.get("/matriculas", matriculasController);

router.get("/calificaciones", calificacionesController);

export default router;