import express from "express";
import "dotenv/config";
import { syncModels } from "./src/models/sync.js";

import indexRoutes from "./src/routes/index.js";
import pacienteRoutes from "./src/routes/pacientes.js";
import admisionRoutes from "./src/routes/admision.js";
import habitacionRoutes from "./src/routes/habitacion.js";

const app = express();

//Middleware
app.use(express.urlencoded({ extended: true }));

//Configuracion de PUG
app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(express.static("public"));

//Rutas
app.use("/", indexRoutes);
app.use("/pacientes", pacienteRoutes);
app.use("/admisiones", admisionRoutes);
app.use("/habitaciones", habitacionRoutes);

//Inicio del servidor
syncModels(); //sincronizar modelos
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server on PORT ${PORT}`);
});
