import { Sequelize } from "sequelize";

const sequelize = new Sequelize("sistema_hospitalario", "root", "", {
  host: "localhost",
  dialect: "mysql",
  logging: false,
});

export default sequelize;
