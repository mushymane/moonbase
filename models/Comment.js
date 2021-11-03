const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,  // auto-inc
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING, // pulled from a behind the scenes 
      allowNull: false,
    },
    text_body: {
      type: DataTypes.STRING,  // user entered. Currently capped at 255 characters. Do we want this to be TEXT to have more?
    },
    post_id: {
        type: DataTypes.INTEGER,  // pulled from a behind the scenes 
      references: {
        model: 'post',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,  // pulled from a behind the scenes 
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
    modelName: 'comment',
  }
);

module.exports = Comment;
