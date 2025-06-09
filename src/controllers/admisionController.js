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
    include: Habitacion,
  });
  const tipoIngreso = req.query.tipo?.toLowerCase();

  res.render("admision/nueva", { camas, tipoIngreso });
};

export const crearAdmision = async (req, res) => {
  const {
    nombre,
    apellido,
    edad,
    dni,
    sexo,
    direccion,
    telefono,
    telefono_emergencia,
    tipo_ingreso,
    motivo,
    camaId,
    proveniente_guardia,
  } = req.body;

  const provieneDeGuardia = proveniente_guardia === "on";

  try {
    if (!provieneDeGuardia) {
      if (!nombre || !apellido || !edad || !dni || !sexo)
        return res.status(400).send("Faltan datos obligatorios del paciente");

      const cama = await Cama.findByPk(camaId, { include: Habitacion });
      if (!cama || cama.ocupada || !cama.higienizada) {
        return res.send("Cama no disponible");
      }

      const camasEnMismaHabitacion = await Cama.findAll({
        where: {
          HabitacionId: cama.HabitacionId,
          ocupada: true,
        },
      });

      const conflictoSexo = camasEnMismaHabitacion.some(
        (otraCama) => otraCama.sexoPaciente && otraCama.sexoPaciente !== sexo
      );

      if (conflictoSexo) {
        return res.render("admision/nueva", {
          camas: await Cama.findAll({
            where: { ocupada: false, higienizada: true },
            include: Habitacion,
          }),
          error:
            "No se puede asignar esta cama: la otra cama está ocupada por un paciente del otro sexo.",
        });
      }

      let paciente = await Paciente.findOne({ where: { dni } });
      if (!paciente) {
        paciente = await Paciente.create({
          nombre,
          apellido,
          edad,
          dni,
          sexo,
          direccion,
          telefono,
          telefono_emergencia,
        });
      }

      const admision = await Admision.create({
        motivo,
        tipo_ingreso,
        PacienteId: paciente.id,
        estado: "Activa",
        CamaId: cama.id,
      });

      await cama.update({ ocupada: true, sexoPaciente: sexo });

      return res.render("admision/nueva", {
        camas: await getCamasDisponibles(),
        success: "Paciente admitido correctamente.",
      });
    } else {
      await Admision.create({
        tipo_ingreso: "Emergencia",
        motivo: motivo || "Derivado de guardia",
        PacienteId: null,
        CamaId: null,
        estado: "Activa",
        proveniente_guardia: true,
      });

      return res.render("admision/nueva", {
        camas: await getCamasDisponibles(),
        success: "Admisión por guardia registrada.",
      });
    }
  } catch (error) {
    console.error("Error en crearAdmision:", error);
    return renderError(res, "Error al crear la admisión.");
  }
};

const getCamasDisponibles = async () => {
  return await Cama.findAll({
    where: { ocupada: false, higienizada: true },
    include: Habitacion,
  });
};

const renderError = async (res, mensaje) => {
  return res.render("admision/nueva", {
    camas: await getCamasDisponibles(),
    error: mensaje,
  });
};

export const cancelarAdmision = async (req, res) => {
  const admision = await Admision.findByPk(req.params.id);
  if (admision) {
    const cama = await Cama.findByPk(admision.CamaId);
    await cama.update({ ocupada: false, sexoPaciente: null });
    await admision.update({ estado: "Cancelada" });
  }
  res.redirect("/admisiones/nueva");
};

export const mostrarAdmisiones = async (req, res) => {
  try {
    const admisiones = await Admision.findAll({
      include: [
        {
          model: Paciente,
        },
        {
          model: Cama,
          include: [Habitacion],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.render("admision/admisiones", { admisiones });
  } catch (error) {
    console.error("Error al obtener admisiones:", error);
    res.status(500).send("Error del servidor");
  }
};
