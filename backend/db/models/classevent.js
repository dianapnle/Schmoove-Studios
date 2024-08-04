'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClassEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ClassEvent.belongsTo(models.Class, {foreignKey: "classId"})
    }
  }
  ClassEvent.init({
    price:{
      allowNull: false,
      type:DataTypes.DECIMAL,
      isNumeric: true,
      validate: {
        min: {args: ["0.0"], msg: "Price per day must be positive"}
      }
    },
    classId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startTime: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        isAfter(value) {
          const modifiedValue = new Date(value)
          let current = new Date()
          if(modifiedValue < current){
            throw new Error("startTime cannot be in the past")
          }
        }
      }
    },
    endTime: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        isGreaterThanstartDate(value) {
          //both values should be in utc time
          if (value <= this.startTime) {
            throw new Error("endTime cannot be on or before startTime");
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'ClassEvent',
  });
  return ClassEvent;
};
