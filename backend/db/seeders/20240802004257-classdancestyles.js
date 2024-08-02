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
        danceStyleId: 1,
        createdAt: new Date("2024-08-01T00:00:00Z")
      },
      {
        classId: 1,
        danceStyleId: 6,
        createdAt: new Date("2024-08-02T00:00:00Z")
      },
      {
        classId: 2,
        danceStyleId: 2,
        createdAt: new Date("2024-08-03T00:00:00Z")
      },
      {
        classId: 2,
        danceStyleId: 6,
        createdAt: new Date("2024-08-04T00:00:00Z")
      },
      {
        classId: 3,
        danceStyleId: 1,
        createdAt: new Date("2024-08-05T00:00:00Z")
      },
      {
        classId: 3,
        danceStyleId: 4,
        createdAt: new Date("2024-08-06T00:00:00Z")
      },
      {
        classId: 4,
        danceStyleId: 3,
        createdAt: new Date("2024-08-07T00:00:00Z")
      },
      {
        classId: 4,
        danceStyleId: 4,
        createdAt: new Date("2024-08-08T00:00:00Z")
      }
      ,
      {
        classId: 5,
        danceStyleId: 2,
        createdAt: new Date("2024-08-09T00:00:00Z")
      },
      {
        classId: 5,
        danceStyleId: 5,
        createdAt: new Date("2024-08-10T00:00:00Z")
      }
    ], { validate: true })
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ClassDanceStyles';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      createdAt: { [Op.in]: [new Date("2024-08-01T00:00:00Z"), new Date("2024-08-02T00:00:00Z"), new Date("2024-08-03T00:00:00Z"), new Date("2024-08-04T00:00:00Z"), new Date("2024-08-05T00:00:00Z"), new Date("2024-08-06T00:00:00Z"), new Date("2024-08-07T00:00:00Z"), new Date("2024-08-08T00:00:00Z"), new Date("2024-08-09T00:00:00Z"), new Date("2024-08-10T00:00:00Z")] }
    }, {})
  }
};
