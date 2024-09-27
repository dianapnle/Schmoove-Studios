'use strict'

const { Instructor } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Instructor.bulkCreate(
      [
        {
          userId: 1,
          studioId: 1,
          profilePic:
            'https://i.gyazo.com/5f7c83cb0fc82ea5036aced5a901f4d1.png',
        },
        {
          userId: 2,
          studioId: 2,
          profilePic:
            'https://i.gyazo.com/dda1a332327283c1784fca95bd78774b.png',
        },
        {
          userId: 3,
          studioId: 3,
          profilePic:
            'https://i.gyazo.com/fdd0347b28452a11c7b44d091b9fc266.png',
        },
        {
          userId: 4,
          studioId: 2,
          profilePic:
            'https://i.gyazo.com/fed75c3d54e9910bcb12e12d56ea1c29.png',
        },
      ],
      { validate: true },
    )
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Instructors'
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(
      options,
      {
        profilePic: {
          [Op.in]: [
            'https://i.gyazo.com/5f7c83cb0fc82ea5036aced5a901f4d1.png',
            'https://i.gyazo.com/dda1a332327283c1784fca95bd78774b.png',
            'https://i.gyazo.com/fdd0347b28452a11c7b44d091b9fc266.png',
            'https://i.gyazo.com/fed75c3d54e9910bcb12e12d56ea1c29.png',
          ],
        },
      },
      {},
    )
  },
}
