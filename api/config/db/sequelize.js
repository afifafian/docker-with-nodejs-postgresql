const Sequelize = require("sequelize");
const UserModel = require("../../models/sequelize/userModel");
const CarModel = require("../../models/sequelize/carModel");

const dbName = process.env.DB_NAME || "backend-test";
const dbPwd = process.env.DB_PWD || "postgres";
const dbUser = process.env.DB_USER || "postgres";

const sequelize = new Sequelize(dbName, dbUser, dbPwd, {
  host: "localhost",
  dialect: 'postgres',
  port: 5432,
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

//MODEL DEFINITION
const User = UserModel(sequelize, Sequelize);
const Car = CarModel(sequelize, Sequelize);

module.exports = {
  User,
  Car
};
