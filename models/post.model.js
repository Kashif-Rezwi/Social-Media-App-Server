const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const { User } = require("./user.model");

const Post = sequelize.define("Post", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  content: {
    type: DataTypes.STRING(300),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  user_Id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  created_at: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  as: "User",
});

module.exports = { Post };
