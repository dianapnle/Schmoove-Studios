const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const studiosRouter = require('./studios.js');
const classesRouter = require('./classes.js')
const instructorsRouter = require('./instructors.js')
const dancestylesRouter = require('./dancestyles.js')


const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/studios', studiosRouter);

router.use('/classes', classesRouter);

router.use('/dancestyles', dancestylesRouter)

router.use('/instructors', instructorsRouter)
module.exports = router;
