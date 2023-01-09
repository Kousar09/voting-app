"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Questions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Questions.belongsTo(models.Elections, {
        foreignKey: "electionId",
      });
      Questions.hasMany(models.Options, {
        foreignKey: "questionId",
      });
    }

    static async noOfQuestions(electionId) {
      return await this.count({
        where: {
          electionId,
        },
      });
    }

    static async getQuestion(id) {
      return await this.findOne({
        where: {
          id,
        },
      });
    }

    static async questionsList(electionId) {
      return await this.findAll({
        where: {
          electionId,
        },
        order: [["id", "ASC"]],
      });
    }

    static newQuestion({ questionName, description, electionId }) {
      return this.create({
        questionName,
        description,
        electionsId,
      });
    }
  }
  Questions.init(
    {
      questionName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Questions",
    }
  );
  return Questions;
};
