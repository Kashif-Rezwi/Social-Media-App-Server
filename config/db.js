const Sequelize = require("sequelize");
const mysql = require("mysql2");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: "mysql",
    dialectModule: mysql,
  }
);

module.exports = {
  sequelize,
};
