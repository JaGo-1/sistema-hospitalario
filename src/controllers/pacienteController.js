import Paciente from "../models/Paciente.js";
import { Op } from "sequelize";

const getUltimosPacientes = async (req, res) => {
  try {
    //Obtiene los cuatro ultimos pacientes
    const pacientes = await Paciente.findAll({
      order: [["createdAt", "DESC"]],
      limit: 4,
    });

    //Obtiene la cantidad de pacientes en la bd
    const cantidadPacientes = await Paciente.count();

    //Obtiene cantidad de pacientes que lleguen por citas programadas
    const cantidadCitasProgramadas = await Paciente.count({
      where: {
        tipo_ingreso: "Cita programada",
      },
    });

    //Obtiene cantidad de pacientes en el dia
    const pacientesHoy = await Paciente.count({
      where: {
        createdAt: {
          [Op.gte]: new Date().setHours(0, 0, 0, 0),
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
    console.log("pacienteController: error: ", error);
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
      order: [["createdAt", "DESC"]],
    });

    res.render("pacientes", { pacientes });
  } catch (error) {
    res.render("pacientes", { pacientes: [] });
    console.log("Error al obtener todos los pacientes: ", error);
  }
};

export { getUltimosPacientes, getPacientes };
