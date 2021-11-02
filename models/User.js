const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
    /**
     * Checks the password when user attempts to login
     * @param {String} loginPw 
     * @returns boolean if hashed password from db is equal to the inputted password
     */
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          name: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
              len: [1],
            },
          },
    },
    {
        hooks: {
            /**
             * 
             * @param {User object} newUserData 
             * @returns a new user with a hashed password
             */
          beforeCreate: async (newUserData) => {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
          /**
           * 
           * @param {User object} updatedUserData 
           * @returns an updated user with a hashed password
           */
          beforeUpdate: async (updatedUserData) => {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
          },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user',
      }
);
module.exports = User;
