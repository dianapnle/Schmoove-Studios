'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class ClassDanceStyle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ClassDanceStyle.belongsTo(models.Class, { foreignKey: 'classId' })
      ClassDanceStyle.belongsTo(models.DanceStyle, {
        foreignKey: 'danceStyleId',
      })
    }
  }
  ClassDanceStyle.init(
    {
      classId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      danceStyleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ClassDanceStyle',
    },
  )
  return ClassDanceStyle
}
