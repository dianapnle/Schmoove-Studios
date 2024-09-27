'use strict'

const { ClassEvent } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await ClassEvent.bulkCreate([
      {
        classId: 1,
        price: 25.0,
        startTime: new Date('2024-10-05T14:48:00.000Z'),
        endTime: new Date('2024-10-05T16:48:00.000Z'),
      },
      {
        classId: 2,
        price: 25.0,
        startTime: new Date('2024-10-05T14:48:00.000Z'),
        endTime: new Date('2024-10-05T16:48:00.000Z'),
      },
      {
        classId: 3,
        price: 30.0,
        startTime: new Date('2024-10-05T14:48:00.000Z'),
        endTime: new Date('2024-10-05T16:48:00.000Z'),
      },
      {
        classId: 4,
        price: 30.0,
        startTime: new Date('2024-10-05T14:48:00.000Z'),
        endTime: new Date('2024-10-05T16:48:00.000Z'),
      },
      {
        classId: 5,
        price: 30.0,
        startTime: new Date('2024-10-05T14:48:00.000Z'),
        endTime: new Date('2024-10-05T16:48:00.000Z'),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'ClassEvents'
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(
      options,
      {
        classId: { [Op.in]: [1, 2, 3, 4, 5] },
      },
      {},
    )
  },
}
