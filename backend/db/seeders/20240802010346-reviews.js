'use strict'

const { Review } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    Review.bulkCreate(
      [
        {
          userId: 1,
          studioId: 2,
          review: 'Great studio!!!!',
          rating: 5,
          createdAt: new Date('2024-08-02T01:09:13Z'),
          updatedAt: new Date('2024-08-02T01:09:13Z'),
        },
        {
          userId: 2,
          studioId: 1,
          review: 'I enjoyed my time there :) very clean studio',
          rating: 5,
          createdAt: new Date('2024-08-02T01:09:13Z'),
          updatedAt: new Date('2024-08-02T01:09:13Z'),
        },
        {
          userId: 3,
          studioId: 1,
          review:
            'The dance studio is a lot smaller than expected. The room heated up really fast with no ac..',
          rating: 3,
          createdAt: new Date('2024-08-01T00:00:00Z'),
          updatedAt: new Date('2024-08-01T00:00:00Z'),
        },
        {
          userId: 3,
          studioId: 2,
          review:
            'It was a good first class here. Would come again!',
          rating: 5,
          createdAt: new Date('2024-08-05T00:00:00Z'),
          updatedAt: new Date('2024-08-05T00:00:00Z'),
        },
        {
          userId: 6,
          studioId: 5,
          review:
            'Cute and clean studio. Very friendly staff!',
          rating: 5,
          createdAt: new Date('2024-08-06T00:00:00Z'),
          updatedAt: new Date('2024-08-06T00:00:00Z'),
        },
        {
          userId: 5,
          studioId: 3,
          review:
            'It was just okay. Not a lot of styles offered yet.',
          rating: 3,
          createdAt: new Date('2024-08-07T00:00:00Z'),
          updatedAt: new Date('2024-08-07T00:00:00Z'),
        },
        {
          userId: 6,
          studioId: 4,
          review:
            'It was just okay. Would not come back again.',
          rating: 2,
          createdAt: new Date('2024-08-08T00:00:00Z'),
          updatedAt: new Date('2024-08-08T00:00:00Z'),
        },
      ],
      { validate: true },
    )
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(
      options,
      {
        createdAt: {
          [Op.in]: [
            new Date('2024-08-02T01:09:13Z'),
            new Date('2024-08-02T01:09:13Z'),
            new Date('2024-08-01T00:00:00Z'),
            new Date('2024-08-05T00:00:00Z'),
            new Date('2024-08-06T00:00:00Z'),
            new Date('2024-08-07T00:00:00Z'),
            new Date('2024-08-08T00:00:00Z'),
          ],
        },
      },
      {},
    )
  },
}
