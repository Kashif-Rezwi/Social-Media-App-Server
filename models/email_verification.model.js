const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Email_verification = sequelize.define("Email_verification", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  otp: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  created_at: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = { Email_verification };
