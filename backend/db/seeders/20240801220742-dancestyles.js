'use strict';

const { DanceStyle } = require("../models")

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await DanceStyle.bulkCreate([
      {
        name: "Beginner/Intermediate Heels",
        description: "Focuses on basic heels techniques. Choreo is often slower-paced and steady."
      },
      {
        name: "Intermediate/Advanced Heels",
        description: "There will be across the floors practicing some heels techniques. Choreo will be faster paced. Prior experience in heels recommended."
      },
      {
        name: "Beginner/Intermediate Hiphop",
        description: "This class will focus on basic hip hop grooves."
      },
      {
        name: "Intermediate/Advanced Hiphop",
        description: "Classes will be focused on faster-paced choreography."
      },
      {
        name: "Beginner/Intermediate Jazzfunk",
        description: "Introduction to jazz-like moves!"
      },
      {
        name: "Intermediate/Advanced Jazzfunk",
        description: "Choreography will be faster-paced but moves will be jazzy!"
      },
      {
        name: "Beginner/Intermediate Contemporary",
        description: "Contemporary dance, unlike classical dance, is an expressive form of the body based on free movements and improvisation. Choreo will be focused on techniques such as turns."
      },
      {
        name: "Intermediate/Advanced Contemporary",
        description: "More advanced choreography of contemporary dance expressions."
      },
      {
        name: "Beginner/Intermediate Dancehall",
        description: "Beginner dancehall includes simpler dances characterized by fluid, natural movements, attitude, and exaggerated movements."
      },
      {
        name: "Intermediate/Advanced Dancehall",
        description: "More advanced choreography with upbeat tempo, catchy melodies, and energetic dance moves."
      },
      {
        name: "Beginner/Intermediate Choreography",
        description: "Beginner and intermediate choreography that can includes many different styles."
      },
      {
        name: "Intermediate/Advanced Choreography",
        description: "More advanced choreography that can include many different styles."
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'DanceStyles';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Beginner/Intermediate Heels', 'Intermediate/Advanced Heels', 'Beginner/Intermediate Hiphop', 'Intermediate/Advanced Hiphop', 'Beginner/Intermediate Jazzfunk', 'Intermediate/Advanced Jazzfunk', 'Beginner/Intermediate Contemporary', 'Intermediate/Advanced Contemporary', 'Beginner/Intermediate Dancehall', 'Intermediate/Advanced Dancehall', 'Beginner/Intermediate Choreography', 'Intermediate/Advanced Choreography'] }
    }, {})
  }
};
