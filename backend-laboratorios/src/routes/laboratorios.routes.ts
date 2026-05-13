import { Router } from "express";

import { obtenerLaboratorios } from "../controllers/laboratorios.controller";

const router = Router();

router.get("/", obtenerLaboratorios);

export default router;