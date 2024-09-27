'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsTo(models.Studio, { foreignKey: 'studioId' })
      Review.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Review.init(
    {
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: { args: 1, msg: 'Stars must be an integer from 1 to 5' },
          max: { args: 5, msg: 'Stars must be an integer from 1 to 5' },
        },
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      studioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Review',
    },
  )
  return Review
}
