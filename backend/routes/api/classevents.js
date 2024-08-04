//holds route paths to /api/events
const express = require('express');
const { Op } = require('sequelize');
const { Class, ClassDanceStyle, ClassEvent } = require('../../db/models');
const { requireAuth, validateClassUser} = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



