import { Router } from "express";
import { getPacientes } from "../controllers/pacienteController.js";

const router = Router();

router.get("/", getPacientes);

export default router;
