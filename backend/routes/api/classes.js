//holds route paths to /api/classes
const express = require('express');
const { Op } = require('sequelize');
const { Class, ClassDanceStyle, ClassEvent } = require('../../db/models');
const { requireAuth, validateClassUser} = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


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

//check if class exists
async function classExist (req, res, next) {
    //use param class id to look for the class
    const classId = req.params.classId;

    const search = await Class.findByPk(Number(classId));
    //if there is no class that matches the given classid from parameter -> throw an error
    if (search === null) {
      const err = new Error();
      err.message = "Class couldn't be found";
      err.status = 404;
      return next(err);
    };
    return next()
}



//get a specific class based on id
router.get("/:classId", classExist, async (req, res) => {
    const { classId } = req.params;
    const el = await Class.findByPk(classId, {
        attributes: ['id', 'studioId', 'description', 'instructorId', 'name'],
        include: [ { model: Instructor } ],
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

    const danceStyles = [];
    for (const danceEntry of el.ClassDanceStyles) {
      danceStyles.push(danceEntry["DanceStyle"]);
    }

    res.status(200);
    return res.json({
        id: el.id,
        studioId: el.studioId,
        instructorId: el.instructorId,
        name: el.name,
        description: el.description,
        Instructor: {
          "id": el.Instructor.id,
          "profilePic": el.Instructor.profilePic,
          "firstName": el.Instructor.User.firstName,
          "lastName": el.Instructor.User.lastName,
        },
        DanceStyles: danceStyles,
    })
});

const validateDanceStyle = [
    check('danceStyles')
    .exists({ checkFalsy: true })
    .withMessage('danceStyles are required'),
  ];

//edit a class
router.put('/:classId', requireAuth, validateClass, validateDanceStyle, validateClassUser, async (req, res) => {
    const { name, instructorId, description, danceStyles } = req.body;
    const { classId } = req.params

    let result = await Class.findByPk(Number(classId));

    ClassDanceStyle.destroy({
        where: { classId: classId}
    });

    let stylesToBulkCreate = []
    for (styleId of danceStyles) {
        stylesToBulkCreate.push({classId: classId, danceStyleId: styleId})
       }

    const styles = ClassDanceStyle.bulkCreate(stylesToBulkCreate);


     await result.update({
      id: classId,
      studioId: result.studioId,
      name: name,
      description: description,
      instructorId: instructorId
    });


    res.status(201);
    return res.json({
      id: result.id,
      instructorId: result.ownerId,
      description: result.description,
      name: result.name,
      studioId: result.studioId
    }
    );
});


//delete class
router.delete('/:classId', requireAuth, validateClassUser, async (req, res) => {
    //use param class id to look for the class
    const classId = req.params.classId;
     await Class.destroy({
       where: {id: classId}
        })

    return res.json({
         message:"Successfully deleted"
      });

});




//get all events a class has
router.get('/:classId/events', async (req, res) => {
    const classId = req.params.classId;

    const events = await ClassEvent.findAll({
        where: { classId: classId },
        attributes: ['id', 'classId', 'price', 'startTime', 'endTime']
    });

    res.status(200);
    return res.json({
        ClassEvents: events
    })
})


const validateEvent = [
    check('price')
    .exists({ checkFalsy: true })
    .withMessage('Price is required'),
    check('startTime')
    .exists({ checkFalsy: true })
    .withMessage('Start time is required'),
    check('endTime')
    .exists({ checkFalsy: true })
    .withMessage('End time is required'),
    handleValidationErrors
  ];


//create a class event
router.post('/:classId/events', requireAuth, validateEvent, validateClassUser, async (req, res) => {
    const classId = req.params.classId;
    const { price, startTime, endTime } = req.body

    const event = await ClassEvent.create({
        classId: classId,
        price: price,
        startTime: startTime,
        endTime: endTime
    });

    res.status(201);
    return res.json({
      id: event.id,
      price: event.price,
      startTime: event.startTime,
      endTime: event.endTime
    });
});

module.exports = router;
