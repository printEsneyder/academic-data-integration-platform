import { Router } from "express";

const router = Router();

router.get("/recursos-biblioteca", (req, res) => {

  const recursos = [
    {
      numero_documento: "1085500001",
      nombre_estudiante: "Esneyder Ibarra",
      total_horas_lectura_digital: 15,
      nivel_actividad: "ALTO"
    },
    {
      numero_documento: "1085500002",
      nombre_estudiante: "Jhon Bolaños",
      total_horas_lectura_digital: 8,
      nivel_actividad: "MEDIO"
    },
    {
      numero_documento: "1085500003",
      nombre_estudiante: "German Andrade",
      total_horas_lectura_digital: 3,
      nivel_actividad: "BAJO"
    }
  ];

  res.json({
    success: true,
    total: recursos.length,
    data: recursos
  });

});

export default router;