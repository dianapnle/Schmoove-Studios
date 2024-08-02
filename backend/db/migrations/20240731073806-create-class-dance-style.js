'use strict';

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}



module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ClassDanceStyles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      classId: {
        type: Sequelize.INTEGER,
        references: { model: "Classes" }
      },
      danceStyleId: {
        type: Sequelize.INTEGER,
        references: { model: "DanceStyles" }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "ClassDanceStyles"
    await queryInterface.dropTable(options);
  }
};
