import express from "express";
import { syncModels } from "./src/models/sync.js";
import indexRoutes from "./src/routes/index.js";

const app = express();

//Configuracion de PUG
app.set("view engine", "pug");
app.set("views", "./src/views");

app.use(express.static("public"));

//Rutas
app.use("/", indexRoutes);

//Inicio del servidor
syncModels(); //sincronizar modelos
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server on PORT ${PORT}`);
});
