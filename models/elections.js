"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Elections extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Elections.belongsTo(models.Admins, {
        foreignKey: "adminID",
      });
    }

    static newElection({ electionName, adminID }) {
      return this.create({
        electionName,
        adminID,
      });
    }
    static electionsList(adminID) {
      return this.findAll({
        where: {
          adminID,
        },
        order: [["id", "ASC"]],
      });
    }

    static getelection(id) {
      return this.fineOne({
        where: {
          id,
        },
      });
    }
  }
  Elections.init(
    {
      electionName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      ongoing: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Elections",
    }
  );
  return Elections;
};
