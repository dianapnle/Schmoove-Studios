'use strict';

const { Studio } = require("../models");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}


module.exports = {
  async up (queryInterface, Sequelize) {
    await Studio.bulkCreate([
      {
        name: "Drip Studio",
        ownerId: 1,
        logo: "https://urbanstepsproject.s3.us-east-2.amazonaws.com/DRIP_combined-logo_black.png",
        pic: "https://images.squarespace-cdn.com/content/v1/66143ec9dd92fc3c01535c05/7454502c-3f5a-4343-83c5-c5da589c9bbe/IMG_3934.JPG",
        description: "Here, we take creatives seriously. We invite you to use our space to unleash your inner artist, push the boundaries of movement and level up your visuals. Join us in blending passion with a whole lotta DRIP."
      },
      {
        name: "Level 8",
        ownerId: 2,
        logo: "https://static.wixstatic.com/media/b0f727_3f939e8b77fc4ebe95271e6fae562c60~mv2.png/v1/fill/w_361,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Black.png",
        pic: "https://static.giggster.com/images/location/b097274c-b6a3-406c-aac4-37683a39572d/3de8a9e1-d966-4064-b90b-05864a00fe7c/mid_x3.jpeg",
        description: "Level 8 is a two room, 3,742 square feet dance facility equip with sprung, StageStep marley flooring, a dressing room for dancers and a reception area with seating for parents. Located in Kearny Mesa near the 163 and 52 freeways, our tucked away location is a safe, convenient place for dancers to thrive."
      },
      {
        name: "La Vie",
        ownerId: 3,
        logo: "https://speedy.uenicdn.com/901a46d0-00e6-44f1-ac39-e743d2d1a973/n300_140a/image/upload/v1695323091/business/901a46d0-00e6-44f1-ac39-e743d2d1a973/logo-clearpng.png",
        pic: "https://www.tagvenue.com/resize/1e/9d/fit-535-358;43782-the-studio-room.jpg",
        description: "La Vie Dance Studios is the perfect destination in San Diego for people of all ages. As a woman-owned business, we pride ourselves on providing exceptional customer service and a welcoming supportive environment for our guests. Our studio offers a wide range of space rentals and classes ranging from Hip Hop to Tango, from Brazilian to African styles and much more! Whether you’re looking for a place to grow and develop your business, or to continue your dance journey, we invite you to a unique experience at La Vie Dance Studios."
      }
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Studios';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['Drip Studio', 'Level 8', 'La Vie'] }
    }, {})
  }
};
