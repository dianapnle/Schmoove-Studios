const { S3Client } = require ("@aws-sdk/client-s3");
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const studiosRouter = require('./studios.js');
const classesRouter = require('./classes.js')
const instructorsRouter = require('./instructors.js')
const dancestylesRouter = require('./dancestyles.js')
const classeventsRouter = require('./classevents.js')
const reviewsRouter = require('./reviews.js')


const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
  // If current user session is valid, set req.user to the user in the database
  // If current user session is not valid, set req.user to null

router.post('/test', (req, res) => {
    res.json({ requestBody: req.body });
});

router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/studios', studiosRouter);

router.use('/classes', classesRouter);

router.use('/dancestyles', dancestylesRouter);

router.use('/instructors', instructorsRouter);

router.use('/events', classeventsRouter);

router.use('/reviews', reviewsRouter);



router.post('/s3_test', async (req, res) => {
  const s3Client = new S3Client({ region: "us-east-2" });

  const data = await s3Client.send(
      new PutObjectCommand({
        Bucket: "urbanstepsproject",
        Key: "my-first-object.txt",
        Body: "Hello JavaScript SDK!",
      })
    );

  console.log(data);
});

module.exports = router;
