import { DataTypes, Model } from "sequelize";
import sequelize from "./db.js";

class Paciente extends Model {}

Paciente.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    sexo: {
      type: DataTypes.ENUM("M", "F"),
      allowNull: false,
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    direccion: {
      type: DataTypes.STRING,
    },
    telefono: {
      type: DataTypes.STRING,
    },
    contacto_emergencia: {
      type: DataTypes.STRING,
    },
    telefono_emergencia: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Paciente",
    tableName: "pacientes",
  }
);

export default Paciente;
