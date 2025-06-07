import { DataTypes, Model } from "sequelize";
import sequelize from "./db.js";

class Habitacion extends Model {}

Habitacion.init(
  {
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ala: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Habitacion",
    tableName: "habitaciones",
  }
);

export default Habitacion;
