//holds route paths to /api/events
const express = require('express');
const { Op } = require('sequelize');
const { Class, ClassDanceStyle, ClassEvent } = require('../../db/models');
const { requireAuth, validateClassUser, validateClassEventUser} = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateClassEvent = [];

//check if class event exists
async function classEventExist (req, res, next) {
    //use param class id to look for the class
    const eventId = req.params.eventId;

    const search = await ClassEvent.findByPk(Number(classId));
    //if there is no class that matches the given classid from parameter -> throw an error
    if (search === null) {
      const err = new Error();
      err.message = "Class couldn't be found";
      err.status = 404;
      return next(err);
    };
    return next()
}


//get a specific class event based on id
router.get("/:eventId", classEventExist, async (req, res) => {
    const { eventId } = req.params;
    const el = await ClassEvent.findByPk(eventId, {
        attributes: ['id', 'classId', 'price', 'startTime', 'endTime']
    })

    res.status(200);
    return res.json({
       id: el.id,
       classId: el.classId,
       price: el.price,
       startTime: el.startTime,
       endTime: el.endTime
    })
});


//edit a class event
router.put('/:eventId', requireAuth, validateClassEvent, validateClassEventUser, async (req, res) => {
    const { price, startTime, endTime } = req.body;
    const { eventId } = req.params

    let result = await ClassEvent.findByPk(Number(eventId));

     await result.update({
      id: eventId,
      classId: result.classId,
      price: price,
      startTime: startTime,
      endTime: endTime
    });


    res.status(201);
    return res.json({
      id: result.id,
      classId: result.classId,
      price: result.price,
      startTime: result.startTime,
      endTime: result.endTime
    }
    );
});

//delete class event
router.delete('/:eventId', requireAuth, validateClassEventUser, async (req, res) => {
    //use param class  eventid to look for the class
    const eventId = req.params.eventId;
     await ClassEvent.destroy({
       where: {id: eventId}
        })

    return res.json({
         message:"Successfully deleted"
      });

});



module.exports = router;
