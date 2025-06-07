// src/seeders/seed.js
import sequelize from "../models/db.js";
import Paciente from "../models/Paciente.js";
import Habitacion from "../models/Habitacion.js";
import Cama from "../models/Cama.js";
import Admision from "../models/Admision.js";
import setRelations from "../models/relations.js";

async function seed() {
  setRelations();
  await sequelize.sync({ force: true });

  // Pacientes
  const pacientes = await Paciente.bulkCreate([
    {
      nombre: "Juan",
      apellido: "Pérez",
      dni: "12345678",
      sexo: "M",
      direccion: "Calle Falsa 123",
      telefono: "2664000001",
    },
    {
      nombre: "Ana",
      apellido: "Gómez",
      dni: "87654321",
      sexo: "F",
      direccion: "Av. Siempre Viva 742",
      telefono: "2664000002",
    },
    {
      nombre: "Carlos",
      apellido: "Díaz",
      dni: "11223344",
      sexo: "M",
      direccion: "Mitre 100",
      telefono: "2664000003",
    },
    {
      nombre: "Lucía",
      apellido: "Martínez",
      dni: "44332211",
      sexo: "F",
      direccion: "Belgrano 456",
      telefono: "2664000004",
    },
  ]);

  // Habitaciones
  const habitacionA = await Habitacion.create({ numero: "101", ala: "A" });
  const habitacionB = await Habitacion.create({ numero: "102", ala: "B" });

  // Camas
  const cama1 = await Cama.create({
    numero: "1",
    habitacion_id: habitacionA.id,
  });
  const cama2 = await Cama.create({
    numero: "2",
    habitacion_id: habitacionA.id,
  });
  const cama3 = await Cama.create({
    numero: "1",
    habitacion_id: habitacionB.id,
  });

  // Admisiones
  await Admision.create({
    tipo_ingreso: "Emergencia",
    estado: "Activa",
    motivo: "Accidente automovilístico",
    provienente_guardia: true,
    paciente_id: pacientes[0].id,
    cama_id: cama1.id,
  });
  await cama1.update({ ocupada: true, sexoPaciente: "M" });

  await Admision.create({
    tipo_ingreso: "Programado",
    estado: "Activa",
    motivo: "Cirugía de rodilla",
    provienente_guardia: false,
    paciente_id: pacientes[1].id,
    cama_id: cama2.id,
  });
  await cama2.update({ ocupada: true, sexoPaciente: "F" });

  console.log("Datos insertados correctamente.");
  process.exit();
}

seed();
