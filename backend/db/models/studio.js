'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Studio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Studio.belongsTo(models.User, {foreignKey: "ownerId"})
      Studio.hasMany(models.Instructor, {foreignKey: "studioId", onDelete: "CASCADE", hooks: true})
      Studio.hasMany(models.Class, {foreignKey: "studioId", onDelete: "CASCADE", hooks: true})
      Studio.hasMany(models.Review, {foreignKey: "studioId", onDelete: "CASCADE", hooks: true});
    }
  }
  Studio.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha: true,
      validate: {
        len: {args:[0,49], msg: "Name must be less than 50 characters"}
    }
  },
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    logo: {
      type:DataTypes.TEXT,
      allowNull: false
    },
    pic: {
      type:DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Studio',
    validate: true
  });
  return Studio;
};
