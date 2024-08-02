'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instructor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Instructor.belongsTo(models.User, {foreignKey: "userId"})
      Instructor.belongsTo(models.Studio, {foreignKey: "studioId"})
      Instructor.hasMany(models.Class, {foreignKey: "instructorId", onDelete: "CASCADE", hooks: true})
    }
  }
  Instructor.init({
    profilePic: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    studioId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Instructor',
  });
  return Instructor;
};
