//holds route paths to /api/spots
const express = require('express');
const { Op } = require('sequelize');
const { User, Studio, Class, ClassDanceStyle, Review, Instructor } = require('../../db/models');
const { requireAuth, validateClassUser} = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



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




module.exports = router;
