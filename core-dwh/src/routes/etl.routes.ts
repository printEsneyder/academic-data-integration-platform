import { Router } from "express";

const router = Router();

router.get("/status", (req, res) => {
  res.json({ success: true, message: "ETL Core funcionando" });
});

export default router;