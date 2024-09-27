'use strict'

const { Booking } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Booking.bulkCreate([
      {
        classId: 1,
        userId: 4,
      },
      {
        classId: 2,
        userId: 4,
      },
      {
        classId: 3,
        userId: 5,
      },
      {
        classId: 4,
        userId: 5,
      },
      {
        classId: 5,
        userId: 5,
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Bookings'
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
