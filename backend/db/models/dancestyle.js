'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DanceStyle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DanceStyle.hasMany(models.ClassDanceStyle, {foreignKey: "danceStyleId", onDelete: "CASCADE", hooks: true})
    }
  }
  DanceStyle.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {args:[0,49], msg: "Name must be less than 50 characters"}
    }
    }
  }, {
    sequelize,
    modelName: 'DanceStyle',
  });
  return DanceStyle;
};
