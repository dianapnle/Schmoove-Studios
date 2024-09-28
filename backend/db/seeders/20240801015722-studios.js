'use strict'

const { Studio } = require('../models')

let options = {}
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Studio.bulkCreate(
      [
        {
          name: 'Drip Studio',
          ownerId: 1,
          logo: 'https://urbanstepsproject.s3.us-east-2.amazonaws.com/DRIP_combined-logo_black.png',
          pic: 'https://images.squarespace-cdn.com/content/v1/66143ec9dd92fc3c01535c05/7454502c-3f5a-4343-83c5-c5da589c9bbe/IMG_3934.JPG',
          description:
            'Here, we take creatives seriously. We invite you to use our space to unleash your inner artist, push the boundaries of movement and level up your visuals. Join us in blending passion with a whole lotta DRIP.\n Located in La Mesa \n San Diego, California',
        },
        {
          name: 'Level 8',
          ownerId: 2,
          logo: 'https://static.wixstatic.com/media/b0f727_3f939e8b77fc4ebe95271e6fae562c60~mv2.png/v1/fill/w_361,h_84,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Black.png',
          pic: 'https://static.giggster.com/images/location/b097274c-b6a3-406c-aac4-37683a39572d/3de8a9e1-d966-4064-b90b-05864a00fe7c/mid_x3.jpeg',
          description:
            'Level 8 is a two room, 3,742 square feet dance facility equip with sprung, StageStep marley flooring, a dressing room for dancers and a reception area with seating for parents. Located in Kearny Mesa near the 163 and 52 freeways, our tucked away location is a safe, convenient place for dancers to thrive. \n Located in Kearny Mesa \n San Diego, California',
        },
        {
          name: 'La Vie',
          ownerId: 3,
          logo: 'https://speedy.uenicdn.com/901a46d0-00e6-44f1-ac39-e743d2d1a973/n300_140a/image/upload/v1695323091/business/901a46d0-00e6-44f1-ac39-e743d2d1a973/logo-clearpng.png',
          pic: 'https://www.tagvenue.com/resize/1e/9d/fit-535-358;43782-the-studio-room.jpg',
          description:
            'La Vie Dance Studios is the perfect destination in San Diego for people of all ages. As a woman-owned business, we pride ourselves on providing exceptional customer service and a welcoming supportive environment for our guests. Our studio offers a wide range of space rentals and classes ranging from Hip Hop to Tango, from Brazilian to African styles and much more! Whether you’re looking for a place to grow and develop your business, or to continue your dance journey, we invite you to a unique experience at La Vie Dance Studios.\n Located in Mission Bay \n San Diego, California',
        },
        {
          name: 'Studio Fx',
          ownerId: 3,
          logo: 'https://urbanstepsproject.s3.us-east-2.amazonaws.com/original_logo.gif',
          pic: 'https://urbanstepsproject.s3.us-east-2.amazonaws.com/cropped_studiofx.jpg',
          description:
            'Studio FX is the premier performing arts and dance studio serving the greater San Diego County area. Our primary goal is to expose the overall community to the various genres of dance and movement, with a distinct emphasis on Hip-Hop and Urban Choreography. We plan on utilizing our dance facility to introduce and pique the interest of children, teens and adults to a wide variety of dance forms. \n Located in Mira Mesa \n San Diego, California',
        },
        {
          name: 'Madhouse Dance',
          ownerId: 3,
          logo: 'https://urbanstepsproject.s3.us-east-2.amazonaws.com/2b12089658d99cc8a05f903d5b42084b.png',
          pic: 'https://urbanstepsproject.s3.us-east-2.amazonaws.com/f5fb43f03e83afb39f5a5d4ea940ddf6.jpg',
          description:
            'At Madhouse, our mission is to provide a powerful dance workout for the mind, booty, and soul. We foster an inclusive, no-pressure environment where people of all dance and fitness levels can feel strong and sexy. Our dance fitness choreography is designed to be easy, “follow along” dancing as you mirror the instructor. No experience necessary; no need to be intimidated. \n Located in Morena \n San Diego, California',
        },
        {
          name: 'Tap Fever Studios',
          ownerId: 3,
          logo: 'https://urbanstepsproject.s3.us-east-2.amazonaws.com/tapstudio.jpg',
          pic: 'https://urbanstepsproject.s3.us-east-2.amazonaws.com/Sweet-16-slider.png',
          description:
            'Tap Fever Studios provides accessible dance opportunities to people of all ages, with and without disabilities. We empower students to achieve their goals through the performing arts.  Anyone can dance if given the chance! \n Located in Pacific Beach \n San Diego, California',
        },
        {
          name: 'Studio K',
          ownerId: 3,
          logo: 'https://urbanstepsproject.s3.us-east-2.amazonaws.com/23e4ae54fcac928a4c9029e84bf7b24d.png',
          pic: 'https://urbanstepsproject.s3.us-east-2.amazonaws.com/2eafd28f241b27a24d54b91ae92064ef.jpg',
          description:
            'Studio K Dance and Fitness offers a place where people can learn to dance, workout, meet new people, have fun and feel comfortable all while improving their overall health and well-being. \n Located in TierraSanta \n San Diego, California',
        },
        {
          name: 'Creative Dance Studio',
          ownerId: 3,
          logo: 'https://urbanstepsproject.s3.us-east-2.amazonaws.com/d266ebadc880e972c068203f0a3515ba.png',
          pic: 'https://urbanstepsproject.s3.us-east-2.amazonaws.com/d50345a5903d41cfef335fe5af7683da.jpg',
          description:
            'Creative Dance Theatre is a positive environment where young people are encouraged to explore and develop their creativity through the art of dance. \n Located in Bay Park \n San Diego, California',
        },
      ],
      { validate: true },
    )
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Studios'
    const Op = Sequelize.Op
    return queryInterface.bulkDelete(
      options,
      {
        name: { [Op.in]: ['Drip Studio', 'Level 8', 'La Vie', 'Studio Fx', 'Madhouse Dance', 'Tap Fever Studios', 'Studio K', 'Creative Dance Studio'] },
      },
      {},
    )
  },
}
