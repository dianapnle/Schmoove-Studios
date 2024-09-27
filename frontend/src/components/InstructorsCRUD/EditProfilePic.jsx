import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { useModal } from '../../context/Modal'
import { thunkUpdateInstructor } from '../../store/instructors'
import './EditInstructorModal.css'

const EditProfilePic = ({ instructorId }) => {
  const { closeModal } = useModal()
  const dispatch = useDispatch()
  const [profilePic, setProfilePic] = useState('')

  const sessionUser = useSelector((state) => state.session.user)
  const instructor = useSelector((state) => state.instructors[instructorId])

  if (sessionUser) {
    const handleSubmit = async (e) => {
      e.preventDefault()

      const updatedInstructor = {
        userId: instructor.userId,
        studioId: instructor.studioId,
        profilePic,
      }

      dispatch(
        thunkUpdateInstructor(updatedInstructor, profilePic, instructorId),
      ).then(() => {
        closeModal()
      })
    }

    const handleClose = async () => {
      closeModal()
    }

    return (
      <div className='modal-edit-instructor'>
        <form>
          <div className='child'>
            <label>
              <div className='labels-row'>
                <h1>Upload New Profile Picture</h1>
                <br></br>
                <div className='instructor-name'>
                  {instructor.firstName}:
                </div>{' '}
              </div>
              <input
                type='file'
                className='input-pic-url'
                placeholder='Profile Picture'
                accept='image/png, image/jpeg'
                onChange={(e) => setProfilePic(e.target.files[0])}
              />
            </label>
            <div className='buttons-container-edit-instructor'>
              <div>
                <button
                  type='submit'
                  className='save-instructor-btn'
                  onClick={handleSubmit}
                >
                  Save
                </button>
              </div>
              <button onClick={handleClose} type='submit' className='close-btn'>
                Close
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default EditProfilePic
