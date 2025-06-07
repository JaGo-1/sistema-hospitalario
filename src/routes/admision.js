import { Router } from "express";
import {
  formularioAdmision,
  crearAdmision,
  cancelarAdmision,
} from "../controllers/admisionController.js";

const router = Router();

//Get
router.get("/nueva", formularioAdmision);

//Post
router.post("/crear", crearAdmision);
router.post("/cancelar/:id", cancelarAdmision);

export default router;
