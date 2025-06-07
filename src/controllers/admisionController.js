import Paciente from "../models/Paciente.js";
import Habitacion from "../models/Habitacion.js";
import Cama from "../models/Cama.js";
import Admision from "../models/Admision.js";

export const formularioAdmision = async (req, res) => {
  const camas = await Cama.findAll({
    where: {
      ocupada: false,
      higienizada: true,
    },
  });
  res.render("admision/nueva", { camas });
};

export const crearAdmision = async (req, res) => {
  const { nombre, apellido, dni, sexo, motivo, camaId } = req.body;

  let paciente = await Paciente.findOne({ where: { dni } });
  if (!paciente) {
    paciente = await Paciente.create({ nombre, apellido, dni, sexo });
  }

  const cama = await Cama.findByPk(camaId);
  if (!cama || cama.ocupada || !cama.higienizada) {
    return res.send("Cama no disponible");
  }

  const camaOcupadaPorPacienteOtroSexo = await Admision.findOne({
    where: { camaId },
    include: [{ model: Cama }],
  });

  if (
    camaOcupadaPorPacienteOtroSexo &&
    camaOcupadaPorPacienteOtroSexo.Cama.sexoPaciente !== sexo
  ) {
    return res.send("La cama está ocupada por paciente de sexo distinto.");
  }

  const admision = await Admision.create({
    motivo,
    PacienteId: paciente.id,
    CamaId: cama.id,
  });
  await cama.update({ ocupada: true, sexoPaciente: sexo });

  res.redirect("/admisiones/nueva");
};

export const cancelarAdmision = async (req, res) => {
  const admision = await Admision.findByPk(req.params.id);
  if (admision) {
    const cama = await Cama.findByPk(admision.CamaId);
    await cama.update({ ocupada: false, sexoPaciente: null });
    await admision.update({ estado: "cancelada" });
  }
  res.redirect("/admisiones/nueva");
};
