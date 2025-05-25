import express from "express";
import { getUltimosPacientes } from "../controllers/pacienteController.js";

const router = express.Router();

router.get("/", getUltimosPacientes);

export default router;
