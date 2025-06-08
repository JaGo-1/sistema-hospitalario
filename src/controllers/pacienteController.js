import Paciente from "../models/Paciente.js";
import Admision from "../models/Admision.js";
import { Op } from "sequelize";

const getUltimosPacientes = async (req, res) => {
  try {
    // Últimos 4 pacientes admitidos (ordenados por fecha de admisión)
    const pacientes = await Paciente.findAll({
      include: {
        model: Admision,
        where: { estado: "Activa" },
        required: true,
      },
      order: [[Admision, "createdAt", "DESC"]],
      limit: 4,
    });

    // Total de pacientes registrados
    const cantidadPacientes = await Paciente.count();

    // Cantidad de pacientes admitidos por "Programado"
    const cantidadCitasProgramadas = await Admision.count({
      where: {
        tipo_ingreso: "Programado",
      },
    });

    // Pacientes admitidos hoy (por fecha de admisión)
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const pacientesHoy = await Admision.count({
      where: {
        createdAt: {
          [Op.gte]: hoy,
        },
      },
    });

    res.render("index", {
      pacientes,
      cantidadPacientes,
      cantidadCitasProgramadas,
      pacientesHoy,
    });
  } catch (error) {
    console.log("Error en getUltimosPacientes: ", error);
    res.render("index", {
      pacientes: [],
      cantidadPacientes: 0,
      cantidadCitasProgramadas: 0,
      pacientesHoy: 0,
    });
  }
};

const getPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll({
      include: Admision,
      order: [["createdAt", "DESC"]],
    });

    res.render("pacientes", { pacientes });
  } catch (error) {
    console.log("Error al obtener todos los pacientes: ", error);
    res.render("pacientes", { pacientes: [] });
  }
};

const formularioEditarPaciente = async (req, res) => {
  const { id } = req.params;
  try {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
      return res.status(404).send("Paciente no encontrado");
    }

    res.render("editarPaciente", { paciente });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error al obtener al paciente");
  }
};

const actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const {
    nombre,
    apellido,
    edad,
    dni,
    sexo,
    direccion,
    telefono,
    telefono_emergencia,
  } = req.body;

  try {
    const paciente = await Paciente.findByPk(id);
    if (!paciente) {
      return res.status(404).send("Paciente no encontrado");
    }

    await paciente.update({
      nombre,
      apellido,
      edad,
      dni,
      sexo,
      direccion,
      telefono,
      telefono_emergencia,
    });

    res.redirect("/pacientes");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al actualizar paciente");
  }
};

export {
  getUltimosPacientes,
  getPacientes,
  formularioEditarPaciente,
  actualizarPaciente,
};
