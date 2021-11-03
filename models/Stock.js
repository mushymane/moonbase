const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Stock extends Model {
  /**
   *
   * @param {Double} change
   * @returns boolean if the stock is bullish or not
   */
  isBullish(change) {
    return change > 0;
  }
}

Stock.init(
  {
    ticker: {
      type: DataTypes.STRING, // From axios-search or axios-all-symbol. 'displaySymbol' on both
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,  // From axios-search or axios-all-symbol. 'description' on both
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL, // From axios-quote 'c'
      allowNull: false,
    },
    change: {
      type: DataTypes.DECIMAL, // From axios-quote 'p'
      allowNull: false,
    },
    percent_change: {
      type: DataTypes.DECIMAL, // From axios-quote 'dp'
      allowNull: false,
    },
    open: {
      type: DataTypes.DECIMAL, // From axios-quote 'o'
      allowNull: false,
    },
    high: {
      type: DataTypes.DECIMAL, // From axios-quote  'h'
      allowNull: false,
    },
    low: {
      type: DataTypes.DECIMAL, // From axios-quote  'l'
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
