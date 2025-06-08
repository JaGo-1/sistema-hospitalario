import { Router } from "express";
import {
  mostrarHabitaciones,
  actualizarHigienizacion,
} from "../controllers/habitacionController.js";

const router = Router();

// Get
router.get("/", mostrarHabitaciones);

// Post
router.post("/camas/:id/higienizar", actualizarHigienizacion);
export default router;
