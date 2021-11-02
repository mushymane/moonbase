const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Stock extends Model {}

Stock.init(
  {
    ticker: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    change: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    percent_change: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    open: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    high: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    low: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "stock",
  }
);

module.exports = Stock;
