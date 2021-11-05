const { Model, DataTypes } = require("sequelize");
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
      // allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL, // From axios-quote 'c'
      // allowNull: false,
      // default: Number.MIN_VALUE
    },
    change: {
      type: DataTypes.DECIMAL, // From axios-quote 'p'
      // allowNull: false,
      // default: Number.MIN_VALUE
    },
    percent_change: {
      type: DataTypes.DECIMAL, // From axios-quote 'dp'
      // allowNull: false,
      // default: Number.MIN_VALUE
    },
    open: {
      type: DataTypes.DECIMAL, // From axios-quote 'o'
      // allowNull: false,
      // default: Number.MIN_VALUE
    },
    high: {
      type: DataTypes.DECIMAL, // From axios-quote  'h'
      // allowNull: false,
      // default: Number.MIN_VALUE
    },
    low: {
      type: DataTypes.DECIMAL, // From axios-quote  'l'
      // allowNull: false,
      // default: Number.MIN_VALUE
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
