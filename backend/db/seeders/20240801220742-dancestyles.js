'use strict'

const { DanceStyle } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await DanceStyle.bulkCreate(
      [
        {
          name: 'Beginner',
        },
        {
          name: 'Intermediate',
        },
        {
          name: 'Advanced',
        },
        {
          name: 'Hiphop',
        },
        {
          name: 'Jazzfunk',
        },
        {
          name: 'Heels',
        },
        {
          name: 'Contemporary',
        },
        {
          name: 'Dancehall',
        },
        {
          name: 'Choreography',
        },
      ],
      { validate: true },
    )
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'DanceStyles'
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(
      options,
      {
        name: {
          [Op.in]: [
            'Beginner',
            'Intermediate',
            'Advanced',
            'Heels',
            'Hiphop',
            'Jazzfunk',
            'Contemporary',
            'Dancehall',
            'Choreography',
          ],
        },
      },
      {},
    )
  },
}
