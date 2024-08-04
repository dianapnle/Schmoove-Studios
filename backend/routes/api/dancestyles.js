//holds route paths to /api/dancestyles
const express = require('express');
const { Op } = require('sequelize');
const { DanceStyle } = require('../../db/models');
const { requireAuth, validateStudioUser } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//find all dance styles

router.get('/', async (req, res) => {
    const dancestyles = await DanceStyle.findAll({
       attributes: ['id', 'name']
    })
    res.status(200);
    return res.json({
        DanceStyles: dancestyles
    })
})


module.exports = router;
