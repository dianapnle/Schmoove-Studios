//holds route paths to /api/events
const express = require('express');
const { Op } = require('sequelize');
const { Class, ClassDanceStyle, ClassEvent } = require('../../db/models');
const { requireAuth, validateClassUser} = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



//check if class event exists
async function classEventExist (req, res, next) {
    //use param class id to look for the class
    const classId = req.params.classId;

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


module.exports = router;
