const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER, // auto-inc
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING, // user entered
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,  // pulled from a behind the scenes query?
      allowNull: false,
    },
    change: {
      type: DataTypes.DECIMAL, // pulled from a behind the scenes query?
      allowNull: false,
    },
    percent_change: {
      type: DataTypes.DECIMAL, // pulled from a behind the scenes query?
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,  // user entered. Currently capped at 255 characters. Do we want this to be TEXT to have more?
    },
    hype_count: {
      type: DataTypes.FLOAT,  // auto-set to 0 or 1. Then increments from there.
      allowNull: false,
    },
    stock_id: {
      type: DataTypes.STRING, // user entered
      references: {
        model: "stock",
        key: "ticker",
      },
    },
    user_id: {
      type: DataTypes.INTEGER, // pulled from a behind the scenes /// QUESTION: Do we want a username on this model too (like comment)?
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
