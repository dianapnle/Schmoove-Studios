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
        name: "Throwback 2000's",
        description: "Who doesn't love throw backs? Music will be focused on grooving to music made in the 2000's!",
        studioId: 1,
        instructorId: 1,
      },
      {
        name: "Tyla-Themed",
        description: "Time to get your groove on with songs to Tyla!!!",
        studioId: 2,
        instructorId: 2,
      },
      {
        name: "Beyonce-Themed",
        description: "Get ready to dance to the one and only QUEEN BEE!",
        studioId: 3,
        instructorId: 3,
      },
      {
        name: "Let's Get ROCKing",
        description: "Music focuses on bands!!",
        studioId: 1,
        instructorId: 4,
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Classes';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Throwback 2000's", "Tyla-Themed", "Beyonce-Themed", "Let's Get ROCKing"] }
    }, {})
  }
};
