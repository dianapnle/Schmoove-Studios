//holds route paths to /api/reviews
const express = require('express');
const { Op } = require('sequelize');
const { Review } = require('../../db/models');
const { requireAuth, validateUser } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

// The validateReviewmiddleware is composed of the check and handleValidationErrors middleware
//   If at least one of the req.body values fail the check, an error will be returned as the response.
const validateReview = [
    //It checks to see if there is an address, etc
    check('review')
    .exists({ checkFalsy: true })
    .withMessage('Review text is required'),
    check('rating')
    .exists({ checkFalsy: true })
    .withMessage('Stars must be an integer from 1 to 5')
    .isInt( {min: 1, max: 5})
    .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ];



  async function authorize (req, res, next) {
    const reviewId = req.params.reviewId;
    const search = await Review.findByPk(Number(reviewId));
    //if there is no review that matches the given reviewid from parameter -> throw an error
    if (search === null) {
        const err = new Error();
        err.message = "Review couldn't be found";
        err.status = 404;
        return next(err);
    }

    //pull the review id to check if it matches with req.user
    //if it does match -> continue on to next function
    if (req.user.id === search.userId) {
      return next()
    };

    //else throw an authorization error
    const err = new Error('Forbidden');
    err.title = 'Authorization required';
    err.status = 403;
    return next(err);
  }





  //edit review
  router.put("/:reviewId", requireAuth, authorize, validateReview, async (req, res) => {
    const { review, rating } = req.body;
    //use param review id to look for the review
    const reviewId = req.params.reviewId;
    let result = await Review.findByPk(Number(reviewId));

     await result.update({
      id: reviewId,
      userId: req.user.id,
      studioId: result.studioId,
      review: review,
      rating: rating
    })
    return res.json({
      id: result.id,
      userId: result.userId,
      studioId: result.studioId,
      review: review,
      rating: rating,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    })

  })



  //delete review
  router.delete('/:reviewId', requireAuth, authorize, async (req, res) => {
        //use param review id to look for the review
        const reviewId = req.params.reviewId;
         await Review.destroy({
           where: {id: reviewId}
            })
        return res.json({
             message:"Successfully deleted"
          });

  });




module.exports = router;
