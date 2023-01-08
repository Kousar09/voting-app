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
        foreignKey: "adminId",
      });

      Election.hasMany(models.Questions, {
        foreignKey: "electionID",
      });
    }

    static newElection({ electionName, adminId }) {
      return this.create({
        electionName,
        adminId,
      });
    }
    static electionsList(adminId) {
      return this.findAll({
        where: {
          adminId,
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
