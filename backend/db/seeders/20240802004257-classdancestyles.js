'use strict';

const { ClassDanceStyle } = require("../models");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up (queryInterface, Sequelize) {
    await ClassDanceStyle.bulkCreate([
      {
        classId: 1,
        danceStyleId: 11
      },
      {
        classId: 1,
        danceStyleId: 12
      },
      {
        classId: 2,
        danceStyleId: 1
      },
      {
        classId: 3,
        danceStyleId: 3
      },
      {
        classId: 4,
        danceStyleId: 5
      },
      {
        classId: 4,
        danceStyleId: 7
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ClassDanceStyles';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      danceStyleId: { [Op.in]: [11, 12, 1, 3, 5, 7] }
    }, {})
  }
};
