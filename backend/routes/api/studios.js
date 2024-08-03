//holds route paths to /api/spots
const express = require('express');
const { Op } = require('sequelize');
const { Studio, Class, ClassDanceStyle } = require('../../db/models');
const { requireAuth, validateUser } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
var Sequelize = require('sequelize');


//get all studios with query params
router.get('/', async (req, res) => {
    //if there are query parameters
    if (Object.keys(req.query).length !== 0) {
        validateQueryParams()
    }

    let page = 1;
    let size = 20;

    const pagination = {};
    //if there are size and page queries in req -> add to pagination object
    pagination.limit=size;
    pagination.offset=size * (page - 1);


    if (req.params) {

        let {page, size, dancestyleId} = req.query

        page = Number(page)
        size = Number(size)

        //if the given value is not a number OR less than 1, set default to 1
        if (isNaN(page) || page < 1) page = 1;

        if (isNaN(size) || size < 1) size = 20;
        // If the size parameter is greater than 20, then the size should be set and limited to 20
        if (size > 20) size = 20;


        const studios = await Studio.findAll({
            include: [{
                model: Class,
                include: [{
                      model: ClassDanceStyle,
                      where: {danceStyleId: dancestyleId},
                      required: true
                }],
                required: true
            }],
             ...pagination });

        res.status(200);
        return res.json({
            Studios: studios,
            page: page,
            size: size
        });
    }
    // if no req.params/search filters
    const studios = await Studio.findAll({
            ...pagination
          });
    res.status(200);
    return res.json({
        Studios: studios,
        page: page,
        size: size
    });
})



async function validateQueryParams (req, res, next) {
    //this middle ware validates each query parameter if they exist
    let {page, size, style } = req.query;
    const err = new Error();
    err.message ="Bad Request";
    err.errors = {};

    if (page) {
      if (page < 1 ) {
        err.errors.page = "Page must be greater than or equal to 1";
      }};

    if (size) {
      if (size < 1 ) {
        err.errors.size = "Size must be greater than or equal to 1";
      }};


    if (Object.values(err.errors).length !== 0 ){
    res.status(400);
    return res.json({
          message: err.message,
          errors: err.errors
    })} else {
      return next();
    };
  };


  //Get details of a studio based on id
