//holds route paths to /api/instructors
const express = require('express')
const { Op } = require('sequelize')
const { User, Instructor, Class } = require('../../db/models')
const { requireAuth, validateInstructorUser } = require('../../utils/auth')
const router = express.Router()
const { check } = require('express-validator')
const { handleValidationErrors } = require('../../utils/validation')
const { v4: uuidv4 } = require('uuid')
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require('@aws-sdk/client-s3')

const validateInstructor = [
  check('userId')
    .exists({ checkFalsy: true })
    .withMessage('userId is required'),
  handleValidationErrors,
]

//Get all instructors
router.get('/', async (req, res) => {
  const instructors = await User.findAll({
    where: { isInstructor: true },
    attributes: [
      'id',
      'firstName',
      'lastName',
      'email',
      'username',
      'isInstructor',
    ],
  })

  res.status(200)
  return res.json({
    Instructors: instructors,
  })
})

const S3upload = async (entry) => {
  const s3Client = new S3Client({ region: 'us-east-2' })

  //the toDataURL reader returns:
  //data:image/png;base64,some_really_really_long_string_here==//

  const file_type = entry.split(';')[0].split(':')[1]

  //generate uuid for  a unique name
  const file_ext = file_type.includes('png') ? '.png' : '.jpg'
  const filename = uuidv4() + file_ext

  //take the long string and put that into buffer
  const file_buffer = new Buffer.from(entry.split(',')[1], 'base64')

  await s3Client.send(
    new PutObjectCommand({
      Bucket: 'urbanstepsproject',
      Key: filename,
      Body: file_buffer,
      ContentEncoding: 'base64',
      ContentType: file_type,
    }),
  )

  return `https://urbanstepsproject.s3.amazonaws.com/${filename}`
}

//edit an instructor
router.put(
  '/:instructorId',
  requireAuth,
  validateInstructor,
  validateInstructorUser,
  async (req, res) => {
    const { userId, profilePic } = req.body
    const { instructorId } = req.params

    const s3Client = new S3Client({ region: 'us-east-2' })

    let result = await Instructor.findByPk(Number(instructorId), {
      include: { model: User, attributes: ['firstName', 'lastName'] },
    })

    // by default - preserve old profile pic url
    let profile_url = result.profilePic

    //if user specified new profile pic, create new pic url replacing the old url
    if (profilePic) {
      profile_url = await S3upload(profilePic)

      const profilekey = result.profliePic.split('/').pop()

      // delete the old aws pic from logo
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: 'urbanstepsproject',
          Key: profilekey,
        }),
      )
    }

    await result.update({
      id: instructorId,
      studioId: result.studioId,
      userId: userId,
      profilePic: profile_url,
    })

    res.status(201)
    return res.json({
      id: result.id,
      userId: result.userId,
      studioId: result.studioId,
      profilePic: result.profilePic,
      firstName: result.User.firstName,
      lastName: result.User.lastName,
    })
  },
)

async function checkNoClass(req, res, next) {
  const instructorId = Number(req.params.instructorId)

  // ensure the instructor doesn't own any classes before deleting - otherwise error
  const classes = await Class.findAll({
    where: { instructorId: instructorId },
  })
  if (classes.length !== 0) {
    const err = new Error()
    err.message = `Instructor owns ${classes.length} classes that need to be reassigned before removal.`
    err.status = 400
    return next(err)
  }

  return next()
}

//delete instructor
router.delete(
  '/:instructorId',
  requireAuth,
  validateInstructorUser,
  checkNoClass,
  async (req, res) => {
    //use param
    const instructorId = req.params.instructorId

    let instructor = await Instructor.findByPk(Number(instructorId))
    await instructor.destroy()

    return res.json({
      message: 'Successfully deleted',
    })
  },
)

module.exports = router
