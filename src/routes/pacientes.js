import { Router } from "express";
import {
  getPacientes,
  formularioEditarPaciente,
  actualizarPaciente,
} from "../controllers/pacienteController.js";

const router = Router();

// Get
router.get("/", getPacientes);
router.get("/editar/:id", formularioEditarPaciente);

// Post
router.post("/:id", actualizarPaciente);

export default router;
