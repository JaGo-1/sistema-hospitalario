import { DataTypes, Model } from "sequelize";
import sequelize from "./db.js";

class Cama extends Model {}

Cama.init(
  {
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ocupada: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    sexoPaciente: {
      type: DataTypes.ENUM("M", "F"),
      allowNull: true,
    },
    higienizada: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "Cama",
    tableName: "camas",
  }
);

export default Cama;
