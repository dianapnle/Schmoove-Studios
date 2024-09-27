'use strict'

let options = {}

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Classes',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
        },
        studioId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Studios' },
        },
        instructorId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Instructors' },
        },
        description: {
          type: Sequelize.TEXT,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      },
      options,
    )
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'Classes'
    await queryInterface.dropTable(options)
  },
}
