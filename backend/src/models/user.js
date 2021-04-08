"use strict";
const { Model } = require("sequelize");

const { userAuthentication } = require("../services/authentication");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: "userId" });
    }

    softDestroy() {
      return this.update({
        deleted: true,
        imageUrl: null,
        firstName: " ",
        lastName: " ",
      });
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: DataTypes.STRING,
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  userAuthentication(User);

  return User;
};
