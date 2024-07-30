'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    await User.bulkCreate([
      {
        email: 'demo@gmail.com',
        username: 'demousername',
        firstName: 'DemoOne',
        lastName: 'UserOne',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user1@gmail.com',
        username: 'randomuser2',
        firstName: 'DemoTwo',
        lastName: 'UserTwo',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'user2@user.io',
        username: 'demouser3',
        firstName: 'DemoThree',
        lastName: 'UserThree',
        hashedPassword: bcrypt.hashSync('password')
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['demousername', 'randomuser2', 'demouser3'] }
    }, {});
  }
};
