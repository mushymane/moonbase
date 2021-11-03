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
      type: DataTypes.STRING, // From axios-search or axios-all-symbol. 'displaySymbol' on both. Could be easily seeded. Might be the best way. Instead on having to [ Run axios-search {slooow 1-5 sec} > run axios-quote {near-instant} > POST ], [ run axios-quote {near-instant} > PUT ]. Would allow for easier search validation. 
      unique: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,  // From axios-search or axios-all-symbol. 'description' on both. Could be easily seeded.
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL, // From axios-quote 'c'. QUESTION: When do we get this info? When the stock in mentioned in a post?
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
  },   /// Add more meta data from axios-metric. Display on the Trending ticker feed. Not on post?
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "stock",
  }
);

module.exports = Stock;
