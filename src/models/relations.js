import Admision from "./Admision.js";
import Paciente from "./Paciente.js";
import Cama from "./Cama.js";
import Habitacion from "./Habitacion.js";

const setRelations = () => {
  // Paciente.hasMany(Admision, { foreignKey: "paciente_id" });
  // Admision.belongsTo(Paciente, { foreignKey: "paciente_id" });
  Paciente.hasMany(Admision);
  Admision.belongsTo(Paciente);

  Habitacion.hasMany(Cama);
  Cama.belongsTo(Habitacion);

  Cama.hasOne(Admision);
  Admision.belongsTo(Cama);
};

export default setRelations;
