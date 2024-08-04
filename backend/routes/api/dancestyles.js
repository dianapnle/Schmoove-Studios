//holds route paths to /api/dancestyles
const express = require('express');
const { Op } = require('sequelize');
const { DanceStyle } = require('../../db/models');
const { requireAuth, validateStudioUser } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//find a dance style using classdancestyleid

router.get('/:danceStyleId', async (req, res) => {
    const { danceStyleId } = req.params

    const dancestyle = await DanceStyle.findOne({
        where: {id: danceStyleId},
        attributes: ['name']
    })
    res.status(200);
    return res.json({
        DanceStyle: dancestyle
    })
})


module.exports = router;
