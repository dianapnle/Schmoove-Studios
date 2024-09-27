'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Class.belongsTo(models.Studio, { foreignKey: 'studioId' })
      Class.belongsTo(models.Instructor, { foreignKey: 'instructorId' })
      Class.hasMany(models.ClassDanceStyle, {
        foreignKey: 'classId',
        onDelete: 'CASCADE',
        hooks: true,
      })
      Class.hasMany(models.ClassEvent, {
        foreignKey: 'classId',
        onDelete: 'CASCADE',
        hooks: true,
      })
      Class.hasMany(models.Booking, {
        foreignKey: 'classId',
        onDelete: 'CASCADE',
        hooks: true,
      })
    }
  }
  Class.init(
    {
      name: {
        type: DataTypes.STRING,
      },
      studioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      instructorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
    },
    {
      sequelize,
      modelName: 'Class',
    },
  )
  return Class
}
