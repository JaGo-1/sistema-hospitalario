import sequelize from "./db.js";
import Paciente from "./Paciente.js";
import Admision from "./Admision.js";
import setRelations from "./relations.js";

setRelations();

async function syncModels() {
  try {
    await sequelize.sync({ alter: true });
    console.log("bd sincronizada");
  } catch (error) {
    console.log("error al sincronizar ", error);
  }
}

export { Paciente, Admision, syncModels };
