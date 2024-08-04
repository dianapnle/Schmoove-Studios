//holds route paths to /api/classes
const express = require('express');
const { Op } = require('sequelize');
const { Studio, Class, ClassDanceStyle, Review, Instructor } = require('../../db/models');
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


//edit a class
router.put('/:classId', requireAuth, validateClass, validateClassUser, async (req, res) => {
    const { name, instructorId, description } = req.body;
    const { classId } = req.params

    let result = await Class.findByPk(Number(classId));

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


//find a class' dance styles
router.get('/:classId/classDanceStyle', async (req, res) => {
    const classId = req.params.classId;

    const classDanceStyles = await ClassDanceStyle.findAll({
        where: { classId: classId },
        attributes: ['classId', 'danceStyleId']
    })
    res.status(200);
    return res.json({
        ClassDanceStyles: classDanceStyles
    })
})



module.exports = router;
