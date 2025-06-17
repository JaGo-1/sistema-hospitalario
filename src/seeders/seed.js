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
      nombre: "Martín",
      apellido: "Alvarez",
      dni: "28546321",
      edad: 45,
      sexo: "M",
      direccion: "San Martín 456",
      telefono: "2664001010",
      telefono_emergencia: "2664001910",
    },
    {
      nombre: "Sofía",
      apellido: "Fernández",
      dni: "37482910",
      edad: 33,
      sexo: "F",
      direccion: "Rivadavia 789",
      telefono: "2664002020",
      telefono_emergencia: "2664002920",
    },
    {
      nombre: "Diego",
      apellido: "Moreno",
      dni: "19827364",
      edad: 60,
      sexo: "M",
      direccion: "Lavalle 321",
      telefono: "2664003030",
      telefono_emergencia: "2664003930",
    },
    {
      nombre: "Camila",
      apellido: "Ramírez",
      dni: "47281937",
      edad: 26,
      sexo: "F",
      direccion: "Paso de los Andes 210",
      telefono: "2664004040",
      telefono_emergencia: "2664004940",
    },
  ]);

  // Habitaciones
  const habitaciones = await Habitacion.bulkCreate([
    { numero: "101", ala: "Clínica Médica" }, // camas[0] camas[1]
    { numero: "102", ala: "Clínica Médica" }, // camas[2]
    { numero: "201", ala: "Cirugía" }, // camas[3] camas[4]
    { numero: "202", ala: "Cirugía" }, // camas[5]
    { numero: "301", ala: "Pediatría" }, // camas[6] camas[7]
    { numero: "302", ala: "Pediatría" }, // camas[8]
    { numero: "401", ala: "Maternidad" }, // camas[9] camas[10]
    { numero: "402", ala: "Maternidad" }, // camas[11]
    { numero: "501", ala: "Terapia Intensiva" }, // camas[12] camas[13]
    { numero: "502", ala: "Terapia Intensiva" }, // camas[14]
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
    motivo: "Neumonía",
    provienente_guardia: true,
    PacienteId: pacientes[0].id, // Martin Alvarez
    CamaId: camas[0].id, // Cama 1 de la habitacion 101
  });
  await camas[0].update({ ocupada: true, sexoPaciente: pacientes[0].sexo });

  await Admision.create({
    tipo_ingreso: "Programado",
    estado: "Activa",
    motivo: "Cesárea programada",
    provienente_guardia: false,
    PacienteId: pacientes[1].id, // Sofia Fernandez
    CamaId: camas[9].id, // Cama 1 de la habitacion 401
  });
  await camas[9].update({ ocupada: true, sexoPaciente: pacientes[1].sexo });

  await Admision.create({
    tipo_ingreso: "Emergencia",
    estado: "Activa",
    motivo: "Apendicitis",
    provienente_guardia: false,
    PacienteId: pacientes[2].id, // Diego Moreno
    CamaId: camas[3].id, // Cama 1 de la habitacion 201
  });
  await camas[3].update({ ocupada: true, sexoPaciente: pacientes[2].sexo });

  await Admision.create({
    tipo_ingreso: "Programado",
    estado: "Activa",
    motivo: "Control postparto",
    proveniente_guardia: false,
    PacienteId: pacientes[3].id, // Camila Ramirez
    CamaId: camas[10].id, // Cama 2 de la habitacion 401
  });
  await camas[10].update({ ocupada: true, sexoPaciente: pacientes[3].sexo });

  console.log("Datos insertados correctamente.");
  process.exit();
}

seed();
