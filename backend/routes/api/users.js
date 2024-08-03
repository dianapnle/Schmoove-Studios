//holds route paths beginning with /api/users
const express = require('express')
const bcrypt = require('bcryptjs');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();


const validateSignup = [
    //It checks to see if req.body.email exists and is an email
    check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('The provided email is invalid.')
    .custom(async value => {
      const user = await User.findAll( {where: {email: value}})
      if (user.length !== 0) {
        throw new Error('Email must be unique');
      }
  }),
    //checks if req.body.username is a minimum length of 4 and is not an email
    check('username')
    .custom(async value => {
        const user = await User.findAll( {where: {username: value}} )
        if (user.length !== 0) {
          throw new Error('Username must be unique');
        }
    })
    .exists({ checkFalsy: true })
    .withMessage('Username required')
    .isLength({ min: 4 })
    .withMessage('Username needs to be at least 4 characters'),
    check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
    //checks if req.body.password is not empty and has a minimum length of 6
    check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
    check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First Name is required'),
    check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last Name is required'),
    check('isInstructor')
    .exists({ checkFalsy: true })
    .withMessage('Please indicate whether you are an instructor or not.'),
    handleValidationErrors
]




// Sign up
router.post('/', validateSignup, async (req, res) => {
    const { email, password, firstName, lastName, username, isInstructor } = req.body;
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ email, username, hashedPassword, firstName, lastName, isInstructor });

      const safeUser = {
        id: user.id,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        isInstructor: user.isInstructor
      };

      await setTokenCookie(res, safeUser);

      return res.json({
        user: safeUser
      });
    }
  );



module.exports = router;
