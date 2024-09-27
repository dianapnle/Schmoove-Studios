'use strict'

let options = {}

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'Bookings',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        classId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Classes' },
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: { model: 'Users' },
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
    options.tableName = 'Bookings'
    await queryInterface.dropTable(options)
  },
}
