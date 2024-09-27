'use strict'

let options = {}

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Studios',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING(50),
        },
        ownerId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Users' },
        },
        logo: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        pic: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        description: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      },
      options,
    )
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Studios'
    await queryInterface.dropTable(options)
  },
}
