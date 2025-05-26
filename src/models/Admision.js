import { DataTypes, Model } from "sequelize";
import sequelize from "./db.js";

class Admision extends Model {}

Admision.init(
  {
    tipo_ingreso: {
      type: DataTypes.ENUM("Programado", "Emergencia", "Derivacion"),
      allowNull: false,
    },
    estado: {
      type: DataTypes.ENUM("Activa", "Cancelada", "Finalizada"),
      defaultValue: "Activa",
    },
    motivo: {
      type: DataTypes.TEXT,
    },
    provienente_guardia: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "Admision",
    tableName: "admisiones",
  }
);

export default Admision;
