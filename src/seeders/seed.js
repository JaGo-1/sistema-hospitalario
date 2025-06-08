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
      edad: 30,
      sexo: "M",
      direccion: "Calle Falsa 123",
      telefono: "2664000001",
      telefono_emergencia: "2664000011",
    },
    {
      nombre: "Ana",
      apellido: "Gómez",
      dni: "87654321",
      edad: 28,
      sexo: "F",
      direccion: "Av. Siempre Viva 742",
      telefono: "2664000002",
      telefono_emergencia: "2664000021",
    },
    {
      nombre: "Carlos",
      apellido: "Díaz",
      dni: "11223344",
      edad: 25,
      sexo: "M",
      direccion: "Mitre 100",
      telefono: "2664000003",
      telefono_emergencia: "2664000031",
    },
    {
      nombre: "Lucía",
      apellido: "Martínez",
      dni: "44332211",
      edad: 19,
      sexo: "F",
      direccion: "Belgrano 456",
      telefono: "2664000004",
      telefono_emergencia: "2664000041",
    },
  ]);

  // Habitaciones
  const habitaciones = await Habitacion.bulkCreate([
    { numero: "101", ala: "Ala Norte" },
    { numero: "102", ala: "Ala Norte" },
    { numero: "201", ala: "Ala Sur" },
    { numero: "202", ala: "Ala Sur" },
    { numero: "301", ala: "Pediatría" },
    { numero: "302", ala: "Pediatría" },
    { numero: "401", ala: "Maternidad" },
    { numero: "402", ala: "Maternidad" },
    { numero: "501", ala: "Cuidados Intensivos" },
    { numero: "502", ala: "Cuidados Intensivos" },
  ]);

  // Camas
  for (const habitacion of habitaciones) {
    const cantidadCamas = habitacion.numero.endsWith("1") ? 2 : 1;
    for (let i = 1; i <= cantidadCamas; i++) {
      await Cama.create({
        numero: `${i}`,
        HabitacionId: habitacion.id,
      });
    }
  }

  // Admisiones
  const camas = await Cama.findAll({
    order: [["id", "ASC"]],
  });

  await Admision.create({
    tipo_ingreso: "Emergencia",
    estado: "Activa",
    motivo: "Accidente automovilístico",
    provienente_guardia: true,
    PacienteId: pacientes[0].id,
    CamaId: camas[0].id,
  });
  await camas[0].update({ ocupada: true, sexoPaciente: "M" });

  await Admision.create({
    tipo_ingreso: "Programado",
    estado: "Activa",
    motivo: "Cirugía de rodilla",
    provienente_guardia: false,
    PacienteId: pacientes[1].id,
    CamaId: camas[1].id,
  });
  await camas[1].update({ ocupada: true, sexoPaciente: "F" });

  console.log("Datos insertados correctamente.");
  process.exit();
}

seed();
