//holds route paths to /api/spots
const express = require('express');
const { Op } = require('sequelize');
const { Studio, Class, ClassDanceStyle, Review } = require('../../db/models');
const { requireAuth, validateUser } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



const validateStudio = [
    check('name')
    .exists({ checkFalsy: true })
    .withMessage('Name must be between 2 and 50 characters in length'),
    check('logo')
    .exists({ checkFalsy: true })
    .withMessage('Logo img url is required'),
    check('pic')
    .exists({ checkFalsy: true })
    .withMessage('Picture img url is required'),
    check('description')
    .exists({ checkFalsy: true })
    .withMessage('Description is required'),
    handleValidationErrors
  ];



//check if studio exists
async function studioExist (req, res, next) {
    //use param studio id to look for the studio
    const studioId = req.params.studioId;

    const search = await Studio.findByPk(Number(studioId));
    //if there is no studio that matches the given studioid from parameter -> throw an error
    if (search === null) {
      const err = new Error();
      err.message = "Studio couldn't be found";
      err.status = 404;
      return next(err);
    };
    return next()
}




//get all studios with query params
router.get('/', async (req, res) => {
    //if there are query parameters
    if (Object.keys(req.query).length !== 0) {
        validateQueryParams()
    }

    let page = 1;
    let size = 20;

    const pagination = {};
    //if there are size and page queries in req -> add to pagination object
    pagination.limit=size;
    pagination.offset=size * (page - 1);


    if (req.params) {

        let {page, size, dancestyleId} = req.query

        page = Number(page)
        size = Number(size)

        //if the given value is not a number OR less than 1, set default to 1
        if (isNaN(page) || page < 1) page = 1;

        if (isNaN(size) || size < 1) size = 20;
        // If the size parameter is greater than 20, then the size should be set and limited to 20
        if (size > 20) size = 20;


        const studios = await Studio.findAll({
            include: [{
                model: Class,
                include: [{
                      model: ClassDanceStyle,
                      where: {danceStyleId: dancestyleId},
                      required: true
                }],
                required: true
            }],
             ...pagination });

        res.status(200);
        return res.json({
            Studios: studios,
            page: page,
            size: size
        });
    }
    // if no req.params/search filters
    const studios = await Studio.findAll({
            ...pagination
          });
    res.status(200);
    return res.json({
        Studios: studios,
        page: page,
        size: size
    });
})



async function validateQueryParams (req, res, next) {
    //this middle ware validates each query parameter if they exist
    let {page, size, style } = req.query;
    const err = new Error();
    err.message ="Bad Request";
    err.errors = {};

    if (page) {
      if (page < 1 ) {
        err.errors.page = "Page must be greater than or equal to 1";
      }};

    if (size) {
      if (size < 1 ) {
        err.errors.size = "Size must be greater than or equal to 1";
      }};


    if (Object.values(err.errors).length !== 0 ){
    res.status(400);
    return res.json({
          message: err.message,
          errors: err.errors
    })} else {
      return next();
    };
  };


  //Get details of a studio based on id
router.get('/:studioId', studioExist, async(req, res) => {
    //use param studio id to look for the studio
    const { studioId } = req.params;
    const studio = await Studio.findByPk(studioId,
        { attributes: ['id', 'ownerId', 'name', 'logo', 'pic', 'description'] }
    );

    const modifiedResult = studio.toJSON();

      const sum = await Review.sum('rating',
        {where: {studioId: studioId} }
      )
      const count = await Review.count(
       { where: {studioId: studioId } }
      );

      const average = count > 0 ? (sum/count) : 0;

      modifiedResult.numReviews = count;
      modifiedResult.avgStarRating = average;

      res.status(200);
      return res.json(modifiedResult);
});


//create a studio
router.post('/', requireAuth, validateStudio, async (req, res) => {
    const { name, logo, pic, description } = req.body;

    const studio = await Studio.create({
      ownerId: req.user.id,
      name: name,
      description: description,
      logo: logo,
      pic: pic
    });

    res.status(201);
    return res.json({
      id: studio.id,
      ownerId: studio.ownerId,
      description: studio.description,
      logo: studio.logo,
      pic: studio.pic
    }
    );
});




//edit a studio
router.put("/:studioId", requireAuth, validateStudio, validateUser, async (req, res) => {
    const { name, logo, pic, description } = req.body;
    //use param spot id to look for the spot
    const studioId = req.params.studioId;

    let result = await Studio.findByPk(Number(studioId));

     await result.update({
      id: studioId,
      ownerId: req.user.id,
      name: name,
      description: description,
      logo: logo,
      pic: pic
    });

    res.status(200);

    return res.json ({
      id: result.id,
      ownerId: result.ownerId,
      name: result.name,
      description: result.description,
      logo: result.logo,
      pic: result.pic
    });
  });


//delete a studio
router.delete("/:studioId", requireAuth, validateUser, async (req, res) => {
    //use param studio id to look for the studio
    const studioId = req.params.studioId;
    await Studio.destroy({
      where: {id: studioId}
    })

    res.status(200);
    return res.json({
      message:"Successfully deleted"
      });
  });



// get studios by current user
router.get('/current', requireAuth, async (req, res) => {
    const studios = await Studio.findAll({
      where: {
          ownerId: req.user.id
      },
      attributes: ['id', 'ownerId', 'name', 'logo', 'pic', 'description'],
    });

  const modifiedResult = []
  for (const entry of studios) {
   const modifiedEntry = entry.toJSON();
   //find the sum stars each studio using reviews
   const sumStars = await Review.sum('rating', {
     where: {studioId: entry.id}
   })
   const count = await Review.count( { where: {studioId: entry.id } });
   const average = count > 0 ? (sum/count) : 0;

   modifiedEntry.numReviews = count;
   modifiedEntry.avgStarRating = average;
   modifiedResult.push(modifiedEntry)
}
    return res.json({
      Studios:  modifiedResult
    });
  });



  module.exports = router;
