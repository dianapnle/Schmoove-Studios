'use strict';

const { Class } = require("../models");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    await Class.bulkCreate([
      {
        name: "Beginner Heels with Courtney",
        description: "Class focuses on heels technique with slower-paced dances.",
        studioId: 1,
        instructorId: 1,
      },
      {
        name: "Intermediate Heels with Courtney",
        description: "Class focuses on heels technique, across the floors, with decently-paced dances.",
        studioId: 1,
        instructorId: 1,
      },
      {
        name: "Beginner Hip Hop with John",
        description: "Get your grooves on with John!",
        studioId: 2,
        instructorId: 4,
      },
      {
        name: "Advanced Hip Hop with Joseph",
        description: "Throw backs with Joseph!",
        studioId: 3,
        instructorId: 3,
      },
      {
        name: "Intermediate Jazzfunk with Josephine",
        description: "Get your jazz on with Josephine! Choreo will be decently-paced.",
        studioId: 3,
        instructorId: 2,
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Classes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Beginner Heels with Courtney", "Intermediate Heels with Courtney", "Beginner Hip Hop with John", "Advanced Hip Hop with Joseph", "Intermediate Jazzfunk with Josephine"] }
    }, {})
  }
};
