const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Hype extends Model {}

Hype.init(
  {
    id: {
      type: DataTypes.INTEGER, // auto-inc
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_id: {
        type: DataTypes.INTEGER, // id of what was hyped
      references: {
        model: 'post',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,  // id of who hyped it
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'hype',
  }
);

module.exports = Hype;
