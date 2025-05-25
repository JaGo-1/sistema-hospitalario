import { DataTypes, Model } from "sequelize";
import sequelize from "./db.js";

class Paciente extends Model {}

Paciente.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_ingreso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Paciente",
    tableName: "pacientes",
  }
);

export default Paciente;
