import sequelize from "./db.js";
import Paciente from "./Paciente.js";

async function syncModels() {
  try {
    await sequelize.sync({ alter: true });
    console.log("bd sincronizada");
  } catch (error) {
    console.log("error al sincronizar ", error);
  }
}

export { Paciente, syncModels };
