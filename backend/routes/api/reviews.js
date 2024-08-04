//holds route paths to /api/reviews
const express = require('express');
const { Op } = require('sequelize');
const { Studio, Class, ClassDanceStyle, Review } = require('../../db/models');
const { requireAuth, validateUser } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');






module.exports = router;
