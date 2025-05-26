import Admision from "./Admision.js";
import Paciente from "./Paciente.js";

const setRelations = () => {
  Paciente.hasMany(Admision, { foreignKey: "paciente_id" });
  Admision.belongsTo(Paciente, { foreignKey: "paciente_id" });
};

export default setRelations;
