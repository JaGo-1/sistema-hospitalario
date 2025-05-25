import sequelize from "../models/db.js";
import Paciente from "../models/Paciente.js";

async function seed() {
  await sequelize.sync({ force: true });

  const pacientes = await Paciente.bulkCreate([
    {
      nombre: "Juan Pérez",
      tipo_ingreso: "Emergencia",
    },
    {
      nombre: "Ana Gómez",
      tipo_ingreso: "Cita programada",
    },
    {
      nombre: "Carlos Díaz",
      tipo_ingreso: "Derivación médica",
    },
    {
      nombre: "Lucía Martínez",
      tipo_ingreso: "Emergencia",
    },
    {
      nombre: "Mario Torres",
      tipo_ingreso: "Cita programada",
    },
  ]);

  console.log("datos insertados");
  process.exit();
}

seed();
