import Habitacion from "../models/Habitacion.js";
import Cama from "../models/Cama.js";
import Admision from "../models/Admision.js";
import Paciente from "../models/Paciente.js";

export const mostrarHabitaciones = async (req, res) => {
  const habitaciones = await Habitacion.findAll({
    include: {
      model: Cama,
      include: {
        model: Admision,
        where: { estado: "Activa" },
        required: false,
        include: Paciente,
      },
    },
    order: [["numero", "ASC"]],
  });

  res.render("habitacion/habitaciones", { habitaciones });
};

export const actualizarHigienizacion = async (req, res) => {
  const cama = await Cama.findByPk(req.params.id);
  if (cama) {
    cama.higienizada = !cama.higienizada;
    await cama.save();
  }
  res.redirect("/habitaciones");
};
