const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL,
      //allowNull: false,
    },
    change: {
      type: DataTypes.DECIMAL,
      //allowNull: false,
    },
    percent_change: {
      type: DataTypes.DECIMAL,
      //allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    hype_count: {
      type: DataTypes.INTEGER,
    },
    bull_count: {
      type: DataTypes.INTEGER
    },
    bear_count: {
      type: DataTypes.INTEGER
    },
    // stock_id: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: "stock",
    //     key: "ticker",
    //   },
    // },
    user_id: {
      type: DataTypes.INTEGER,
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
