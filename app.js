import express from "express";
import { syncModels } from "./src/models/sync.js";

import indexRoutes from "./src/routes/index.js";
import pacienteRoutes from "./src/routes/pacientes.js";
import admisionRoutes from "./src/routes/admision.js";

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

//Inicio del servidor
syncModels(); //sincronizar modelos
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server on PORT ${PORT}`);
});
