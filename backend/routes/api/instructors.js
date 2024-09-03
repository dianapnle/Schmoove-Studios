//holds route paths to /api/instructors
const express = require('express');
const { Op } = require('sequelize');
const { User, Instructor, Class } = require('../../db/models');
const { requireAuth, validateInstructorUser} = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateInstructor = [
    check('userId')
    .exists({ checkFalsy: true })
    .withMessage('userId is required'),
    handleValidationErrors
  ];

//Get all instructors
router.get("/", async (req, res) => {

    const instructors = await User.findAll({
            where: { isInstructor: true },
            attributes: ['id', 'firstName', 'lastName', 'email', 'username', 'isInstructor']
        });


    res.status(200);
    return res.json({
      Instructors:  instructors
    });
  })


//edit an instructor
router.put('/:instructorId', requireAuth, validateInstructor, validateInstructorUser, async (req, res) => {
    const { userId, profilePic } = req.body;
    const { instructorId } = req.params

    let result = await Instructor.findByPk(Number(instructorId), {
      include: { model: User, attributes: ["firstName", "lastName"] }
    });

     await result.update({
      id: instructorId,
      studioId: result.studioId,
      userId: userId,
      profilePic: profilePic
    });


    res.status(201);
    return res.json({
      id: result.id,
      userId: result.userId,
      studioId: result.studioId,
      profilePic: result.profilePic,
      firstName: result.User.firstName,
      lastName: result.User.lastName
    }
    );
})

async function checkNoClass (req, res, next) {
  const instructorId = Number(req.params.instructorId);

  // ensure the instructor doesn't own any classes before deleting - otherwise error
  const classes = await Class.findAll({
      where: { instructorId: instructorId }
  })
  if ( classes.length !== 0 ) {
      const err = new Error()
      err.message = `instructor owns ${classes.length} classes that need to be reassigned`;
      err.status = 400
      return next(err)
  }

  return next();
}



//delete instructor
router.delete('/:instructorId', requireAuth, validateInstructorUser, checkNoClass, async (req, res) => {
    //use param
    const instructorId = req.params.instructorId;

    let instructor = await Instructor.findByPk(Number(instructorId));
    await instructor.destroy();

    return res.json({
         message:"Successfully deleted"
      });

});


module.exports = router;
