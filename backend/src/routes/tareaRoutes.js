// src/routes/tareaRoutes.js

import express from "express";
import {
  listar,
  crear,
  obtener,
  editar,
  eliminar,
} from "../controllers/tareaController.js";

const router = express.Router();

router.get("/", listar);
router.post("/", crear);
router.get("/:id", obtener);
router.put("/:id", editar);
router.delete("/:id", eliminar);

export default router;