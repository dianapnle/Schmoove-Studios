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
        name: "Beginner Heels",
        description: "Class focuses on heels technique with slower-paced dances.",
        studioId: 1,
        instructorId: 1,
      },
      {
        name: "Intermediate Heels",
        description: "Class focuses on heels technique, across the floors, with decently-paced dances.",
        studioId: 1,
        instructorId: 1,
      },
      {
        name: "Beginner Hip Hop",
        description: "Get your grooves!",
        studioId: 2,
        instructorId: 4,
      },
      {
        name: "Advanced Hip Hop",
        description: "Throw backs",
        studioId: 3,
        instructorId: 3,
      },
      {
        name: "Intermediate Jazzfunk",
        description: "Get your jazz on! Choreo will be decently-paced.",
        studioId: 2,
        instructorId: 2,
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Classes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Beginner Heels", "Intermediate Heels", "Beginner Hip Hop", "Advanced Hip Hop", "Intermediate Jazzfunk"] }
    }, {})
  }
};
