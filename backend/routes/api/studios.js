//holds route paths to /api/studios
const express = require('express');
const { Op } = require('sequelize');
const { Studio, Class, ClassDanceStyle, Review, Instructor, User, DanceStyle } = require('../../db/models');
const { requireAuth, validateStudioUser } = require('../../utils/auth');
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
    }

    let page = 1;
    let size = 20;

    const pagination = {};
    //if there are size and page queries in req -> add to pagination object
    pagination.limit=size;
    pagination.offset=size * (page - 1);



    // if no req.params/search filters

    const studios = await Studio.findAll({
            ...pagination
          });

    const modifiedResult = []
        for (const entry of studios) {

          const modifiedEntry = entry.toJSON();
           //find the sum stars each studio using reviews
           const sumStars = await Review.sum('rating', {
             where: {studioId: entry.id}
           })
           const count = await Review.count( { where: {studioId: entry.id } });
           const average = count > 0 ? (sumStars/count) : 0;

           modifiedEntry.numReviews = count;
           modifiedEntry.avgStarRating = average;
           modifiedResult.push(modifiedEntry)
        }

      res.status(200);
      return res.json({
              Studios:  modifiedResult,
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


// get studios by current user
router.get('/current', requireAuth, async (req, res) => {

    const studios = await Studio.findAll({
      where: { ownerId: req.user.id},
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
   const average = count > 0 ? (sumStars/count) : 0;

   modifiedEntry.numReviews = count;
   modifiedEntry.avgStarRating = average;
   modifiedResult.push(modifiedEntry)
}
    res.status(200)
    return res.json({
      Studios:  modifiedResult
    });
  });




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
      name: studio.name,
      ownerId: studio.ownerId,
      description: studio.description,
      logo: studio.logo,
      pic: studio.pic
    }
    );
});




//edit a studio
router.put("/:studioId", requireAuth, validateStudio, validateStudioUser, async (req, res) => {
    const { name, logo, pic, description } = req.body;
    //use param studio id to look for the studio
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
router.delete("/:studioId", requireAuth, validateStudioUser, async (req, res) => {
    //use param studio id to look for the studio
    const studioId = req.params.studioId;
    let studio = await Studio.findByPk(Number(studioId));
    await studio.destroy();

    res.status(200);
    return res.json({
      message:"Successfully deleted"
      });
  });



//Get all classes of a specific studio
router.get("/:studioId/classes", async (req, res) => {
  const { studioId } = req.params;

  const search = await Studio.findByPk(Number(studioId));
  //if there is no studio that matches the given studioid from parameter -> throw an error
  if (search === null) {
      const err = new Error()
      err.message = "Studio couldn't be found";
      res.status(404);
      return res.json({
        message: err.message
    })
  };

  const classes = await Class.findAll({
      where: { studioId: studioId },
      attributes: ['id', 'studioId', 'name', 'description', 'instructorId'],
      include: [
        {
          model: Instructor,
          include: { model: User, attributes: ["firstName", "lastName"] },
          attributes: ['id', 'profilePic']
        },
        {
          model: ClassDanceStyle,
          include: { model: DanceStyle, attributes: ["id", "name"]},
        }
      ]
  })

  const modifiedResult = [];
  for (const entry of classes) {
      // flatten user data into instructor
      const modifiedEntry = entry.toJSON();
      modifiedEntry["Instructor"]["firstName"] = modifiedEntry["Instructor"]["User"]["firstName"];
      modifiedEntry["Instructor"]["lastName"] = modifiedEntry["Instructor"]["User"]["lastName"];
      delete modifiedEntry["Instructor"]["User"];

      // flatten DanceStyle information
      modifiedEntry["DanceStyles"] = []
      for(const danceEntry of modifiedEntry["ClassDanceStyles"]) {
          modifiedEntry["DanceStyles"].push(danceEntry["DanceStyle"])
      }

      delete modifiedEntry["ClassDanceStyles"]

      modifiedResult.push(modifiedEntry);
  }

  res.status(200);
  return res.json({
    Classes:  modifiedResult
  });
})




const validateClass = [
  check('name')
  .exists({ checkFalsy: true })
  .withMessage('Name must be between 1 to 100 characters'),
  check('instructorId')
  .exists({ checkFalsy: true })
  .withMessage('Must pick an instructor'),
  check('description')
  .exists({ checkFalsy: true })
  .withMessage('Description is required'),
  handleValidationErrors
];


const validateDanceStyle = [
  check('danceStyles')
  .exists({ checkFalsy: true })
  .withMessage('danceStyles are required'),
];

//create a class for a studio
router.post('/:studioId/classes', requireAuth, validateClass, validateDanceStyle, validateStudioUser, async (req, res) => {
  const { name, instructorId, description, danceStyles } = req.body;
  const { studioId } = req.params;

  let stylesToBulkCreate = [];

  const el = await Class.create({
    name: name,
    description: description,
    instructorId: instructorId,
    studioId: studioId
  });

  for (styleId of danceStyles) {
    stylesToBulkCreate.push({classId: el.id, danceStyleId: styleId})
   }


   await ClassDanceStyle.bulkCreate(stylesToBulkCreate);

  res.status(201);
  return res.json({
    id: el.id,
    studioId: el.studioId,
    description: el.description,
    instructorId: el.instructorId,
    name: el.name
  });
});




//Get all reviews of a specific studio
router.get("/:studioId/reviews", async (req, res) => {
  const { studioId } = req.params;

  const search = await Studio.findByPk(Number(studioId));
  //if there is no studio that matches the given studioid from parameter -> throw an error
  if (search === null) {
      const err = new Error()
      err.message = "Studio couldn't be found";
      res.status(404);
      return res.json({
        message: err.message
    })
  };

  const reviews = await Review.findAll({
      where: { studioId: studioId },
      attributes: ['id', 'studioId', 'userId', 'rating', 'description', 'createdAt', 'updatedAt']
  })

  res.status(200);
  return res.json({
    Reviews:  reviews
  });
})


const validateReview = [
  check('review')
  .exists({ checkFalsy: true })
  .withMessage('Review text is required'),
  check('rating')
  .exists({ checkFalsy: true })
  .withMessage('Must be an integer from 1 to 5')
  .isInt( {min: 1, max: 5})
  .withMessage('Must be an integer from 1 to 5'),
  handleValidationErrors
];


async function checkExist (req, res, next) {
  //use param studio to look for the studio
  const studioId = req.params.studioId;

  const search = await Studio.findByPk(Number(studioId));
  //if there is no studio that matches the given studioid from parameter -> throw an error
  if (search === null) {
    const err = new Error();
    err.message = "Studio couldn't be found";
    err.status = 404;
    return next(err);
  };
  //use the studioId to pull the review's userid to check if it matches with req.user
  const result = await Review.findOne(
    {where: {
      studioId: studioId,
      userId: req.user.id
    }} );


  //if it does match and its not null-> throw an error
  if (result) {
    const err = new Error('User already has a review for this studio');
    err.title = 'Already exists';
    err.status = 500;
    return next(err);
  }

  return next();
}

//create a review for a studio
router.post('/:studioId/reviews', requireAuth, validateReview, checkExist, async (req, res) => {

  const studioId = req.params.studioId;
  const {review, rating} = req.body;

  const newReview = await Review.create({
    userId: req.user.id,
    studioId: Number(studioId),
    review: review,
    rating: Number(rating),
  })
  res.status(201);
  return res.json({
    id: newReview.id,
    userId: newReview.userId,
    studioId: newReview.studioId,
    review: newReview.review,
    rating: newReview.rating,
    createdAt: newReview.createdAt,
    updatedAt: newReview.updatedAt
  })
});



//get all instructors for a studio
router.get("/:studioId/instructors", async (req, res) => {
  const { studioId } = req.params;

  const search = await Studio.findByPk(Number(studioId));
  //if there is no studio that matches the given studioid from parameter -> throw an error
  if (search === null) {
      const err = new Error()
      err.message = "Studio couldn't be found";
      res.status(404);
      return res.json({
        message: err.message
    })
  };

  const instructors = await Instructor.findAll({
      where: { studioId: studioId },
      include: { model: User, attributes: ["firstName", "lastName"] },
      attributes: ['id', 'studioId', 'userId', 'profilePic']
  })

  const modifiedResult = [];
  for (const entry of instructors) {
    // flatten user data into instructor
    const modifiedEntry = entry.toJSON();
    modifiedEntry["firstName"] = modifiedEntry["User"]["firstName"];
    modifiedEntry["lastName"] = modifiedEntry["User"]["lastName"];
    delete modifiedEntry["User"];

    modifiedResult.push(modifiedEntry);
  }

  res.status(200);
  return res.json({
    Instructors: modifiedResult
  });
})


const validateInstructor = [
  check('profilePic')
  .exists({ checkFalsy: true })
  .withMessage('Profile pic img url is required'),
  handleValidationErrors
];


async function checkIfDuplicate (req, res, next) {
  const studioId = Number(req.params.studioId);
  const { userId } = req.body;

  // ensure the instructor isnt already an instructor for this studio
  const instructor = await Instructor.findOne({
    where: { userId: userId, studioId: studioId }
  });

  if (instructor !== null ) {
  const err = new Error()
  err.message = `instructor already part of the studio!`;
  err.status = 400
  return next(err)
}
  return next();
}

//create an instructor for a studio
router.post('/:studioId/instructors', requireAuth, validateInstructor, checkIfDuplicate, validateStudioUser, async (req, res) => {
  const { userId, profilePic } = req.body;
  const { studioId } = req.params;

      const search = await Studio.findByPk(Number(studioId), {
        include: { model: User, attributes: ["firstName", "lastName"] }
      });

      //if there is no studio that matches the given studioid from parameter -> throw an error
      if (search === null) {
          const err = new Error()
          err.message = "Studio couldn't be found";
          res.status(404);
          return res.json({
            message: err.message
        })
      };

      const el = await Instructor.create({
        userId: userId,
        profilePic: profilePic,
        studioId: Number(studioId)
      });

      const userData = await el.getUser()//get the associations of user data

      res.status(201);
      return res.json({
        id: el.id,
        studioId: el.studioId,
        userId: el.userId,
        profilePic: el.profilePic,
        firstName: userData.firstName,
        lastName: userData.lastName
      });
});

  module.exports = router;
